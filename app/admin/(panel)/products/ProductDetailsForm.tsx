"use client";

import { useEffect, useState } from "react";
import {
  PRODUCT_ARRAY_FIELDS,
  PRODUCT_TEXT_FIELDS,
  type ProductEditable,
} from "@/lib/productFields";
import { Button, Label, MoveButtons, Notice, StringListInput, inputClass } from "@/components/admin/ui";

export const EMPTY_PRODUCT: ProductEditable = {
  ...(Object.fromEntries(PRODUCT_TEXT_FIELDS.map((f) => [f.name, ""])) as Record<(typeof PRODUCT_TEXT_FIELDS)[number]["name"], string>),
  body_colors: [],
  cct: [],
  hero_description: "",
  website: true,
  is_track: false,
  extra_specs: {},
  collection: "indoor",
};

export function rowToEditable(row: any): ProductEditable {
  const product = { ...EMPTY_PRODUCT };
  for (const { name } of PRODUCT_TEXT_FIELDS) product[name] = row?.[name] ?? "";
  for (const { name } of PRODUCT_ARRAY_FIELDS) product[name] = Array.isArray(row?.[name]) ? row[name] : [];
  product.hero_description = row?.hero_description ?? "";
  product.website = row?.website === "W";
  product.is_track = Boolean(row?.is_track);
  product.extra_specs = Object.fromEntries(
    Object.entries(row?.extra_specs || {}).map(([k, v]) => [k, String(v ?? "")])
  );
  return product;
}

// Edits the text/spec columns of one product. `productId` null = create.
export default function ProductDetailsForm({
  productId,
  initial,
  dealerPrices = {},
  onSaved,
  onDeleted,
  canDelete,
}: {
  productId: number | null;
  initial: ProductEditable;
  // From the private ledlum_product_prices table; shown read-only, never saved from here.
  dealerPrices?: Record<string, string>;
  onSaved: (row: any) => void;
  onDeleted?: () => void;
  canDelete: boolean;
}) {
  const [product, setProduct] = useState(initial);
  // Extra specs are edited as an ordered list of pairs so renaming a key
  // doesn't reorder rows mid-typing.
  const [specs, setSpecs] = useState<[string, string][]>(Object.entries(initial.extra_specs));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    setProduct(initial);
    setSpecs(Object.entries(initial.extra_specs));
    setMessage(null);
  }, [initial]);

  const set = (name: string, value: unknown) => setProduct((p) => ({ ...p, [name]: value }));

  const save = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(productId ? `/api/admin/products/${productId}` : "/api/admin/products", {
        method: productId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, extra_specs: Object.fromEntries(specs) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setMessage({ tone: "success", text: "Saved. The website updates within a few minutes." });
      onSaved(data.product);
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!productId || !confirm(`Delete ${product.model} permanently? Its images stay in storage.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) onDeleted?.();
    else setMessage({ tone: "error", text: (await res.json().catch(() => ({}))).error || "Delete failed" });
  };

  return (
    <div className="flex flex-col gap-5">
      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer select-none">
        <input type="checkbox" checked={product.website} onChange={(e) => set("website", e.target.checked)} className="w-4 h-4 accent-white" />
        Show on website
      </label>
      <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer select-none">
        <input type="checkbox" checked={product.is_track} onChange={(e) => set("is_track", e.target.checked)} className="w-4 h-4 accent-white" />
        Show in the &ldquo;Tracks&rdquo; tab
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        {PRODUCT_TEXT_FIELDS.map((f) => (
          <div key={f.name}>
            <Label>{f.label}</Label>
            <input value={product[f.name]} onChange={(e) => set(f.name, e.target.value)} className={inputClass} />
          </div>
        ))}
      </div>

      <div>
        <Label>Description</Label>
        <textarea rows={4} value={product.hero_description} onChange={(e) => set("hero_description", e.target.value)} className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {PRODUCT_ARRAY_FIELDS.map((f) => (
          <div key={f.name}>
            <Label>{f.label}</Label>
            <StringListInput value={product[f.name]} onChange={(v) => set(f.name, v)} itemLabel="Value" />
          </div>
        ))}
      </div>

      <div>
        <Label help="Any other specs, e.g. Charging Time → 6 hrs">Extra specs</Label>
        <div className="flex flex-col gap-2">
          {specs.map(([k, v], i) => (
            <div key={i} className="flex gap-2">
              <input placeholder="Name" value={k} onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? [e.target.value, s[1]] : s)))} className={inputClass} />
              <input placeholder="Value" value={v} onChange={(e) => setSpecs(specs.map((s, j) => (j === i ? [s[0], e.target.value] : s)))} className={inputClass} />
              <MoveButtons
                onUp={i > 0 ? () => setSpecs(specs.map((s, j) => (j === i ? specs[i - 1] : j === i - 1 ? specs[i] : s))) : undefined}
                onDown={i < specs.length - 1 ? () => setSpecs(specs.map((s, j) => (j === i ? specs[i + 1] : j === i + 1 ? specs[i] : s))) : undefined}
                onRemove={() => setSpecs(specs.filter((_, j) => j !== i))}
              />
            </div>
          ))}
          <Button type="button" variant="secondary" className="self-start" onClick={() => setSpecs([...specs, ["", ""]])}>
            + Add spec
          </Button>
        </div>
      </div>

      {Object.keys(dealerPrices).length > 0 && (
        <div>
          <Label help="From the Excel D.P. column. Admin only — never shown on the website.">Dealer price</Label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(dealerPrices).map(([k, v]) => (
              <span key={k} className="px-3 py-2 rounded border border-neutral-700 bg-neutral-900 text-sm text-neutral-200">
                {k !== "D.P." && <span className="text-neutral-400 mr-2">{k}</span>}
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-2">
        <Button onClick={save} disabled={busy}>{busy ? "Saving…" : productId ? "Save details" : "Create product"}</Button>
        {productId && canDelete && (
          <Button variant="danger" onClick={remove} disabled={busy}>Delete product</Button>
        )}
      </div>
    </div>
  );
}
