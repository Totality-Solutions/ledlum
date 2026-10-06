"use client";

import { useEffect, useState } from "react";
import type { SectionDef } from "@/lib/cms/schema";
import { FieldsEditor } from "./FieldEditor";
import { Button, Card, Notice, formatDateTime } from "./ui";

// Loads, edits and saves one CMS section (one cms_content row).
export default function SectionEditor({ section }: { section: SectionDef }) {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [meta, setMeta] = useState<{ isDefault: boolean; updatedBy: string | null; updatedAt: string | null }>({
    isDefault: true,
    updatedBy: null,
    updatedAt: null,
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/content/${encodeURIComponent(section.key)}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to load");
        if (cancelled) return;
        setData(json.data);
        setSaved(JSON.stringify(json.data));
        setMeta({ isDefault: json.isDefault, updatedBy: json.updatedBy, updatedAt: json.updatedAt });
      })
      .catch((err) => !cancelled && setMessage({ tone: "error", text: err.message }));
    return () => {
      cancelled = true;
    };
  }, [section.key]);

  const dirty = data !== null && JSON.stringify(data) !== saved;

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const save = async () => {
    if (!data) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/content/${encodeURIComponent(section.key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      setSaved(JSON.stringify(data));
      setMeta({ isDefault: false, updatedBy: json.updatedBy, updatedAt: json.updatedAt });
      setMessage({ tone: "success", text: "Saved — the live site is updated." });
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!confirm(`Reset "${section.label}" to the original built-in content? Your changes will be lost.`)) return;
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/content/${encodeURIComponent(section.key)}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Reset failed");
      setData(json.data);
      setSaved(JSON.stringify(json.data));
      setMeta({ isDefault: true, updatedBy: null, updatedAt: null });
      setMessage({ tone: "success", text: "Reset to default." });
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">{section.label}</h2>
          {section.description && <p className="text-sm text-neutral-400 mt-1">{section.description}</p>}
          <p className="text-xs text-neutral-500 mt-1">
            {meta.isDefault
              ? "Showing the original content (never edited)."
              : `Last saved ${formatDateTime(meta.updatedAt)}${meta.updatedBy ? ` by ${meta.updatedBy}` : ""}.`}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {!meta.isDefault && (
            <Button variant="ghost" onClick={reset} disabled={busy}>
              Reset
            </Button>
          )}
          <Button onClick={save} disabled={busy || !dirty}>
            {busy ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </Button>
        </div>
      </div>

      {message && (
        <div className="mb-4">
          <Notice tone={message.tone}>{message.text}</Notice>
        </div>
      )}

      {data ? (
        <FieldsEditor fields={section.fields} value={data} onChange={setData} />
      ) : (
        !message && <p className="text-sm text-neutral-500">Loading…</p>
      )}
    </Card>
  );
}
