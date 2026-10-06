"use client";

import { useEffect, useState } from "react";
import type { SectionDef } from "@/lib/cms/schema";
import { FieldsEditor } from "./FieldEditor";
import { Button, Card, Notice, formatDateTime } from "./ui";

// Loads, edits and saves one CMS section (one cms_content row), shown as a
// collapsible accordion panel.
export default function SectionEditor({ section, defaultOpen = false }: { section: SectionDef; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
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

  // The section links at the top of the page (#section.key) open this panel.
  useEffect(() => {
    const openIfTargeted = () => {
      if (decodeURIComponent(window.location.hash.slice(1)) === section.key) setOpen(true);
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [section.key]);

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
    <Card className="overflow-hidden" data-dirty={dirty ? "true" : undefined}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer select-none hover:bg-neutral-900/60"
      >
        <div className="flex items-start gap-3 min-w-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mt-1.5 shrink-0 text-neutral-500 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold text-logo flex items-center gap-2">
              {section.label}
              {dirty && <span className="w-2 h-2 rounded-full bg-amber-400" title="Unsaved changes" />}
            </h2>
            {section.description && <p className="text-sm text-neutral-400 mt-1">{section.description}</p>}
            <p className="text-xs text-neutral-500 mt-1">
              {meta.isDefault
                ? "Showing the original content (never edited)."
                : `Last saved ${formatDateTime(meta.updatedAt)}${meta.updatedBy ? ` by ${meta.updatedBy}` : ""}.`}
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
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
        <div className="px-5 pb-4">
          <Notice tone={message.tone}>{message.text}</Notice>
        </div>
      )}

      {open && (
        <div className="px-5 pb-5 pt-5 border-t border-neutral-800">
          {data ? (
            <FieldsEditor fields={section.fields} value={data} onChange={setData} />
          ) : (
            !message && <p className="text-sm text-neutral-500">Loading…</p>
          )}
        </div>
      )}
    </Card>
  );
}
