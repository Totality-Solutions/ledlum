"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Card, Notice, PageHeader, formatDateTime } from "@/components/admin/ui";

type Submission = {
  id: number;
  type: "contact" | "quote" | "lead";
  name: string | null;
  email: string | null;
  phone: string | null;
  product: string | null;
  message: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

const TYPE_LABELS: Record<Submission["type"], string> = {
  contact: "Contact form",
  quote: "Quote request",
  lead: "Catalog download",
};

export default function AdminSubmissions() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ submissions: Submission[]; total: number; pageSize: number } | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const qs = new URLSearchParams({ page: String(page) });
    if (type) qs.set("type", type);
    if (status) qs.set("status", status);
    try {
      const res = await fetch(`/api/admin/submissions?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setData(json);
    } catch (err: any) {
      setError(err.message);
    }
  }, [type, status, page]);

  useEffect(() => {
    load();
  }, [load]);

  const setSubmissionStatus = async (id: number, next: Submission["status"]) => {
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) load();
  };

  const toggle = (s: Submission) => {
    setOpen(open === s.id ? null : s.id);
    if (s.status === "new") setSubmissionStatus(s.id, "read");
  };

  const exportCsv = () => {
    if (!data) return;
    const header = ["Date", "Type", "Name", "Email", "Phone", "Product", "Message", "Status"];
    const rows = data.submissions.map((s) =>
      [s.created_at, s.type, s.name, s.email, s.phone, s.product, s.message, s.status].map(
        (v) => `"${String(v ?? "").replace(/"/g, '""')}"`
      )
    );
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `ledlum-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectClass = "px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-sm";
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <PageHeader
        title="Submissions"
        description="Everything sent through the website's contact and quote forms. Emails are still sent as before."
        actions={<Button variant="secondary" onClick={exportCsv} disabled={!data?.submissions.length}>Export CSV</Button>}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className={selectClass}>
          <option value="">All forms</option>
          <option value="contact">Contact form</option>
          <option value="quote">Quote requests</option>
          <option value="lead">Catalog downloads</option>
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={selectClass}>
          <option value="">Inbox (new + read)</option>
          <option value="new">New only</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error && <Notice tone="error">{error}</Notice>}

      {data && (
        <Card className="divide-y divide-neutral-800">
          {data.submissions.map((s) => (
            <div key={s.id}>
              <button onClick={() => toggle(s)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-neutral-900">
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.status === "new" ? "bg-sky-400" : "bg-transparent"}`} />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm truncate ${s.status === "new" ? "font-semibold" : ""}`}>
                    {s.name || "—"} <span className="text-neutral-500 font-normal">· {s.email}</span>
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {TYPE_LABELS[s.type]}
                    {s.product ? ` · ${s.product}` : ""}
                    {s.message ? ` · ${s.message}` : ""}
                  </p>
                </div>
                <span className="text-xs text-neutral-500 shrink-0">{formatDateTime(s.created_at)}</span>
              </button>
              {open === s.id && (
                <div className="px-8 pb-4 text-sm flex flex-col gap-2">
                  <dl className="grid grid-cols-[100px_1fr] gap-y-1">
                    <dt className="text-neutral-500">Email</dt>
                    <dd><a className="text-sky-400 hover:underline" href={`mailto:${s.email}`}>{s.email}</a></dd>
                    <dt className="text-neutral-500">Phone</dt>
                    <dd>{s.phone ? <a className="text-sky-400 hover:underline" href={`tel:${s.phone}`}>{s.phone}</a> : "—"}</dd>
                    {s.product && (<><dt className="text-neutral-500">Product</dt><dd>{s.product}</dd></>)}
                  </dl>
                  {s.message && <p className="whitespace-pre-wrap text-neutral-300 bg-neutral-950 rounded-md p-3 border border-neutral-800">{s.message}</p>}
                  <div className="flex gap-2 mt-1">
                    {s.status !== "archived" ? (
                      <Button variant="secondary" onClick={() => setSubmissionStatus(s.id, "archived")}>Archive</Button>
                    ) : (
                      <Button variant="secondary" onClick={() => setSubmissionStatus(s.id, "read")}>Move to inbox</Button>
                    )}
                    {s.status === "read" && (
                      <Button variant="ghost" onClick={() => setSubmissionStatus(s.id, "new")}>Mark unread</Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {data.submissions.length === 0 && <p className="p-4 text-sm text-neutral-500">Nothing here yet.</p>}
        </Card>
      )}

      {data && totalPages > 1 && (
        <div className="flex items-center gap-3 mt-4 text-sm">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Newer</Button>
          <span className="text-neutral-500">Page {page} of {totalPages}</span>
          <Button variant="secondary" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Older →</Button>
        </div>
      )}
    </div>
  );
}
