"use client";

import { useState } from "react";
import type { Field } from "@/lib/cms/schema";
import { inputClass, Label, MediaInput, MoveButtons, StringListInput, swap, Button } from "./ui";

// Renders one schema field (recursively for lists).

export function emptyValueFor(field: Field): unknown {
  switch (field.type) {
    case "boolean":
      return false;
    case "stringList":
      return [];
    case "list":
      return [];
    case "select":
      return field.options[0]?.value ?? "";
    default:
      return "";
  }
}

function emptyItem(fields: Field[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((f) => [f.name, emptyValueFor(f)]));
}

export function FieldsEditor({
  fields,
  value,
  onChange,
}: {
  fields: Field[];
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {fields.map((field) => (
        <FieldEditor
          key={field.name}
          field={field}
          value={value?.[field.name]}
          onChange={(v) => onChange({ ...value, [field.name]: v })}
        />
      ))}
    </div>
  );
}

export function FieldEditor({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case "text":
    case "url":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <input
            type={field.type === "url" ? "url" : "text"}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        </div>
      );
    case "textarea":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <textarea value={value ?? ""} rows={4} onChange={(e) => onChange(e.target.value)} className={inputClass} />
        </div>
      );
    case "image":
    case "video":
    case "file":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <MediaInput kind={field.type} value={value ?? ""} onChange={onChange} />
        </div>
      );
    case "boolean":
      return (
        <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer select-none">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-white" />
          {field.label}
        </label>
      );
    case "select":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "stringList":
      return (
        <div>
          <Label help={field.help}>{field.label}</Label>
          <StringListInput value={value ?? []} onChange={onChange} itemLabel={field.itemLabel} />
        </div>
      );
    case "list":
      return <ListEditor field={field} value={value} onChange={onChange} />;
  }
}

function ListEditor({
  field,
  value,
  onChange,
}: {
  field: Extract<Field, { type: "list" }>;
  value: any;
  onChange: (v: any) => void;
}) {
  const items: Record<string, any>[] = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState<number | null>(null);

  const isSingleImage = field.fields.length === 1 && field.fields[0].type === "image";

  return (
    <div>
      <Label help={field.help}>
        {field.label} <span className="text-neutral-500">({items.length})</span>
      </Label>

      <div className="flex flex-col gap-2">
        {items.map((item, i) => {
          const title =
            (field.titleField && String(item?.[field.titleField] ?? "").trim()) || `${field.itemLabel} ${i + 1}`;
          const isOpen = open === i || isSingleImage;
          const thumb = field.fields.find((f) => f.type === "image");
          const thumbUrl = thumb ? item?.[thumb.name] : null;

          return (
            <div key={i} className="border border-neutral-800 rounded-lg bg-neutral-950/60">
              <div className="flex items-center gap-2 p-2">
                {!isSingleImage && (
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex-1 min-w-0 flex items-center gap-3 text-left text-sm text-neutral-200 px-1"
                  >
                    <span className="text-neutral-500 w-4">{isOpen ? "▾" : "▸"}</span>
                    {thumbUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumbUrl} alt="" className="w-8 h-8 rounded object-cover bg-neutral-800 shrink-0" />
                    )}
                    <span className="truncate">{title}</span>
                  </button>
                )}
                {isSingleImage && <span className="flex-1 text-sm text-neutral-400 px-1">{title}</span>}
                <MoveButtons
                  onUp={i > 0 ? () => { onChange(swap(items, i, i - 1)); setOpen(null); } : undefined}
                  onDown={i < items.length - 1 ? () => { onChange(swap(items, i, i + 1)); setOpen(null); } : undefined}
                  onRemove={() => {
                    if (!confirm(`Remove ${title}?`)) return;
                    onChange(items.filter((_, j) => j !== i));
                    setOpen(null);
                  }}
                />
              </div>
              {isOpen && (
                <div className="px-3 pb-4 pt-1 border-t border-neutral-800">
                  <FieldsEditor
                    fields={field.fields}
                    value={item}
                    onChange={(v) => onChange(items.map((x, j) => (j === i ? v : x)))}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        variant="secondary"
        className="mt-2"
        onClick={() => {
          onChange([...items, emptyItem(field.fields)]);
          setOpen(items.length);
        }}
      >
        + Add {field.itemLabel.toLowerCase()}
      </Button>
    </div>
  );
}
