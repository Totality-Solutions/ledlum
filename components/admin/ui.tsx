"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { uploadMedia } from "@/lib/cms/upload";

// Small shared building blocks for the admin panel (dark theme, matching the
// original product image manager).

export const inputClass =
  "w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400";

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  return (
    <button
      {...props}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-white text-black hover:bg-neutral-200",
        variant === "secondary" && "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700",
        variant === "danger" && "bg-red-900/80 text-white hover:bg-red-800",
        variant === "ghost" && "text-neutral-400 hover:text-white hover:bg-neutral-800",
        className
      )}
    />
  );
}

export function Label({ children, help }: { children: React.ReactNode; help?: string }) {
  return (
    <div className="mb-1.5">
      <span className="block text-sm text-neutral-300">{children}</span>
      {help && <span className="block text-xs text-neutral-500 mt-0.5">{help}</span>}
    </div>
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("bg-neutral-900/60 border border-neutral-800 rounded-xl", className)} />;
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && <p className="text-sm text-neutral-400 mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "success"; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-sm rounded-md px-3 py-2 border",
        tone === "info" && "text-neutral-300 border-neutral-700 bg-neutral-900",
        tone === "error" && "text-red-300 border-red-900 bg-red-950/40",
        tone === "success" && "text-emerald-300 border-emerald-900 bg-emerald-950/40"
      )}
    >
      {children}
    </p>
  );
}

// URL field with an upload button and a preview. `kind` decides the accepted
// file types and how the preview renders.
export function MediaInput({
  value,
  onChange,
  kind,
}: {
  value: string;
  onChange: (url: string) => void;
  kind: "image" | "video" | "file";
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = kind === "image" ? "image/*" : kind === "video" ? "video/mp4,video/webm" : ".pdf,application/pdf,*/*";

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      onChange(await uploadMedia(file));
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste a URL or upload"
          className={inputClass}
        />
        <Button type="button" variant="secondary" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? "Uploading…" : "Upload"}
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {value && kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-28 w-auto max-w-full rounded-md border border-neutral-800 object-contain bg-neutral-950 self-start" />
      )}
      {value && kind === "video" && (
        <video src={value} muted controls preload="metadata" className="h-36 w-auto max-w-full rounded-md border border-neutral-800 self-start" />
      )}
      {value && kind === "file" && (
        <a href={value} target="_blank" rel="noreferrer" className="text-xs text-sky-400 hover:underline self-start break-all">
          Open current file
        </a>
      )}
    </div>
  );
}

// Editable list of plain strings.
export function StringListInput({
  value,
  onChange,
  itemLabel = "Item",
  multiline = false,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  itemLabel?: string;
  multiline?: boolean;
}) {
  const items = Array.isArray(value) ? value : [];
  const update = (i: number, v: string) => onChange(items.map((x, j) => (j === i ? v : x)));
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          {multiline ? (
            <textarea value={item} rows={4} onChange={(e) => update(i, e.target.value)} className={inputClass} />
          ) : (
            <input value={item} onChange={(e) => update(i, e.target.value)} className={inputClass} />
          )}
          <MoveButtons
            onUp={i > 0 ? () => onChange(swap(items, i, i - 1)) : undefined}
            onDown={i < items.length - 1 ? () => onChange(swap(items, i, i + 1)) : undefined}
            onRemove={() => onChange(items.filter((_, j) => j !== i))}
          />
        </div>
      ))}
      <Button type="button" variant="secondary" className="self-start" onClick={() => onChange([...items, ""])}>
        + Add {itemLabel.toLowerCase()}
      </Button>
    </div>
  );
}

export function swap<T>(arr: T[], a: number, b: number): T[] {
  const copy = [...arr];
  [copy[a], copy[b]] = [copy[b], copy[a]];
  return copy;
}

export function MoveButtons({ onUp, onDown, onRemove }: { onUp?: () => void; onDown?: () => void; onRemove: () => void }) {
  const btn = "w-8 h-9 rounded-md text-sm bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800";
  return (
    <div className="flex gap-1 shrink-0">
      <button type="button" title="Move up" disabled={!onUp} onClick={onUp} className={btn}>↑</button>
      <button type="button" title="Move down" disabled={!onDown} onClick={onDown} className={btn}>↓</button>
      <button type="button" title="Remove" onClick={onRemove} className={cn(btn, "hover:bg-red-900")}>✕</button>
    </div>
  );
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
