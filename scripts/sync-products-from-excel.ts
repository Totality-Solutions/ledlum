import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

dotenv.config({ path: ".env" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Brings existing products in line with the Excel sheets, in place.
//
//   npx tsx scripts/sync-products-from-excel.ts           → dry run (prints what would change)
//   npx tsx scripts/sync-products-from-excel.ts --apply   → writes the changes
//
// Unlike import-all-products.ts (which wipes and rebuilds the table), this
// only UPDATEs rows that already exist, matched by model, so images, gallery,
// visibility (website), group/category links and is_track are never touched.
//
// Rules:
// - The Excel value wins over the database for every field the sheet fills in.
//   An empty Excel cell never clears a value already in the database.
// - extra_specs: Excel columns are merged in (overwriting the same key);
//   keys that only exist in the database are kept.
// - product_type keeps the sheet's value as-is (e.g. "S.P.O"); "New" is
//   stored as "new", which is what the New Launch badge checks for.
// - "D.P." columns (dealer prices) go to the private ledlum_product_prices
//   table (migration 009), never onto ledlum_products / the public site.
// - A row only updates the product if the product is in the same collection
//   as the sheet (e.g. the Indoor file's KLEWE SISTEMASOLARE sheet doesn't
//   override the klewe collection — Klewe.xlsx does).

const APPLY = process.argv.includes("--apply");

interface Source {
  collection: string;
  file: string;
  range?: number;          // header row index, for sheets with a title banner above
  skipSheets?: string[];   // upper-case sheet names to ignore
  onlySheets?: string[];
  fields: (row: Record<string, any>) => Record<string, any>;
  mapped: string[];        // lower-case headers consumed by `fields` (kept out of extra_specs)
}

const str = (v: any) => (v == null || String(v).trim() === "" ? null : String(v).trim());
const list = (v: any, sep: RegExp) => (str(v) ? String(v).split(sep).map((s) => s.trim()).filter(Boolean) : []);
// First non-empty of several possible header spellings, matched case-insensitively.
const pick = (row: Record<string, any>, ...names: string[]) => {
  const lower = names.map((n) => n.toLowerCase());
  for (const key of Object.keys(row)) if (lower.includes(key.toLowerCase().trim()) && str(row[key])) return str(row[key]);
  return null;
};

const STANDARD_MAPPED = [
  "category", "item number", "model no", "model no.", "item code", "family",
  "website", "websiite", "product type", "watts", "wattage/mtr", "watt",
  "dimension", "size", "cutout size", "body color", "cct (k)", "cct",
  "powered by", "beam angle", "ip rating", "luminous", "cri",
  "product overview", "item number_1",
];

function standardFields(row: Record<string, any>) {
  // "-" and "N/A" are the sheets' "nothing here" placeholders, not a type.
  const rawType = pick(row, "Product Type");
  const productType = rawType && !["-", "n/a", "na"].includes(rawType.toLowerCase()) ? rawType : null;
  return {
    category: pick(row, "Category"),
    hero_description: pick(row, "Product Overview"),
    watts: pick(row, "Watts", "Wattage/Mtr", "Watt"),
    dimensions: pick(row, "Dimension", "Size"),
    cutout_size: pick(row, "Cutout Size"),
    body_colors: list(pick(row, "Body Color"), /\//),
    cct: list(pick(row, "CCT (K)", "CCT"), /\//),
    beam_angle: pick(row, "Beam Angle"),
    ip_rating: pick(row, "IP Rating"),
    led_chip: pick(row, "Powered by"),
    luminous: pick(row, "Luminous"),
    cri: pick(row, "CRI"),
    product_type: productType && productType.toLowerCase() === "new" ? "new" : productType,
  };
}

const SOURCES: Source[] = [
  { collection: "indoor", file: "./Ledlum_Indoor_Website_W (2) (1).xlsx", fields: standardFields, mapped: STANDARD_MAPPED },
  { collection: "outdoor", file: "./Ledlum_Outdoor (1) (2).xlsx", fields: standardFields, mapped: STANDARD_MAPPED },
  { collection: "klewe", file: "./Klewe.xlsx", fields: standardFields, mapped: STANDARD_MAPPED },
  {
    collection: "artizan", file: "./Artizan.xlsx", range: 2, skipSheets: ["INDEX"],
    fields: standardFields,
    mapped: [...STANDARD_MAPPED, "track", "tracks"], // Track → is_track, set by import-artizan.ts
  },
  {
    collection: "volaris", file: "C:/Users/Admin/Downloads/VOLARIS_2026_Spec_Sheet_updated.xlsx", range: 3, onlySheets: ["Spec Sheet"],
    fields: (row) => ({
      category: pick(row, "Category"),
      watts: pick(row, "Wattage"),
      dimensions: pick(row, "Size"),
      body_colors: list(pick(row, "Body Colour"), /,/),
    }),
    // S.No is just the sheet's row number, not product data.
    mapped: ["s.no", "category", "model no.", "model no", "size", "wattage", "body colour"],
  },
];

const MODEL_COLS = ["item number", "model no", "model no.", "item code"];
const isPriceCol = (lc: string) => lc.startsWith("d.p.");

interface Parsed { model: string; fields: Record<string, any>; extra: Record<string, string>; prices: Record<string, string> }

function parseSource(src: Source): Map<string, Parsed> {
  const wb = XLSX.readFile(src.file);
  const out = new Map<string, Parsed>(); // later rows win, same as the importers
  const mapped = new Set(src.mapped);

  for (const sheetName of wb.SheetNames) {
    if (src.skipSheets?.includes(sheetName.toUpperCase())) continue;
    if (src.onlySheets && !src.onlySheets.includes(sheetName)) continue;
    const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { range: src.range ?? 0, defval: null });
    if (!rows.length) continue;
    const cols = Object.keys(rows[0]);
    const modelCol = cols.find((c) => MODEL_COLS.includes(c.toLowerCase().trim()));
    if (!modelCol) continue;

    for (const row of rows) {
      const model = str(row[modelCol]);
      if (!model || model.toUpperCase().includes("(AS PRINTED)")) continue;

      const extra: Record<string, string> = {};
      const prices: Record<string, string> = {};
      for (const col of cols) {
        const lc = col.toLowerCase().trim();
        const val = str(row[col]);
        if (!val || lc.startsWith("__empty")) continue;
        if (isPriceCol(lc)) prices[col.trim()] = val;
        else if (!mapped.has(lc)) extra[col.trim()] = val;
      }
      out.set(model, { model, fields: src.fields(row), extra, prices });
    }
  }
  return out;
}

const same = (a: any, b: any) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

async function loadProducts() {
  const all = new Map<string, any>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from("ledlum_products").select("*").range(from, from + 999);
    if (error) throw error;
    if (!data.length) break;
    for (const p of data) all.set(p.model, p);
  }
  return all;
}

async function main() {
  console.log(APPLY ? "=== Sync products from Excel (APPLYING) ===\n" : "=== Sync products from Excel (dry run — add --apply to write) ===\n");

  const products = await loadProducts();
  // Paged: Supabase returns at most 1000 rows per request.
  const existingPrices = new Map<string, any>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from("ledlum_product_prices").select("model, prices").range(from, from + 999);
    if (error) {
      console.log(`Can't read ledlum_product_prices (${error.message}).\nRun supabase/migrations/009_create_product_prices.sql in the Supabase SQL editor first.\n`);
      if (APPLY) return;
      break;
    }
    if (!data.length) break;
    for (const r of data) existingPrices.set(r.model, r.prices);
  }

  const updates: { id: number; model: string; patch: Record<string, any> }[] = [];
  const priceUpserts: { model: string; prices: Record<string, string> }[] = [];
  const fieldCounts: Record<string, number> = {};

  for (const src of SOURCES) {
    const parsed = parseSource(src);
    let notInDb = 0, otherCollection = 0, changed = 0;

    for (const p of parsed.values()) {
      const db = products.get(p.model);
      if (!db) { notInDb++; continue; }
      if (db.collection !== src.collection) { otherCollection++; continue; }

      const patch: Record<string, any> = {};
      for (const [field, value] of Object.entries(p.fields)) {
        const empty = value == null || (Array.isArray(value) && value.length === 0);
        if (!empty && !same(db[field], value)) patch[field] = value;
      }
      const mergedExtra = { ...(db.extra_specs || {}), ...p.extra };
      if (!same(db.extra_specs || {}, mergedExtra)) patch.extra_specs = mergedExtra;

      if (Object.keys(patch).length) {
        updates.push({ id: db.id, model: p.model, patch });
        changed++;
        for (const f of Object.keys(patch)) fieldCounts[f] = (fieldCounts[f] || 0) + 1;
      }
      if (Object.keys(p.prices).length && !same(existingPrices.get(p.model), p.prices)) {
        priceUpserts.push({ model: p.model, prices: p.prices });
      }
    }
    console.log(`${src.collection.padEnd(8)} ${String(parsed.size).padStart(4)} models in Excel → ${changed} to update` +
      (notInDb ? `, ${notInDb} not in database (skipped)` : "") +
      (otherCollection ? `, ${otherCollection} belong to another collection (skipped)` : ""));
  }

  console.log(`\nProducts to update: ${updates.length}`);
  for (const [f, n] of Object.entries(fieldCounts).sort((a, b) => b[1] - a[1])) console.log(`  ${f.padEnd(18)} ${n}`);
  console.log(`Dealer prices to save: ${priceUpserts.length}`);

  if (!APPLY) {
    for (const u of updates.slice(0, 5)) console.log(`\n  e.g. ${u.model}:`, JSON.stringify(u.patch).slice(0, 300));
    console.log("\nDry run only — nothing was written. Re-run with --apply.");
    return;
  }

  let ok = 0, failed = 0;
  for (const u of updates) {
    const { error } = await supabase.from("ledlum_products").update(u.patch).eq("id", u.id);
    if (error) { failed++; console.log(`  FAILED ${u.model}: ${error.message}`); } else ok++;
  }
  for (let i = 0; i < priceUpserts.length; i += 200) {
    const batch = priceUpserts.slice(i, i + 200).map((r) => ({ ...r, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("ledlum_product_prices").upsert(batch, { onConflict: "model" });
    if (error) { failed += batch.length; console.log(`  FAILED price batch: ${error.message}`); }
  }
  console.log(`\n✓ Updated ${ok} products, saved ${priceUpserts.length} dealer prices${failed ? `, ${failed} failures` : ""}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
