import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;
const EXCEL_PATH = "C:/Users/Admin/Downloads/VOLARIS_2026_Spec_Sheet_updated.xlsx";
const SHEET_NAME = "Spec Sheet"; // "Motor Mapping Notes" and "ECO Grouping Ref" are QA reference sheets, not product data
const COLLECTION = "volaris";

// Same reasoning as import-artizan.ts / import-klewe.ts: kept separate from
// scripts/import-all-products.ts, which TRUNCATEs and rebuilds the whole
// table from Excel alone with no notion of Cloudflare-hosted images. This
// script only touches volaris rows, via upsert on the unique `model` key,
// and preserves any images already linked if run again later.
//
// Two rows in the source sheet are explicitly flagged "(as printed)" by
// whoever prepared it — a real, acknowledged data-quality issue, not
// something to silently guess a fix for:
//   - "VFR008 (as printed)" for Chronos collides with the clean "VFR008"
//     already used for Spade a few rows up.
//   - "VFR009-10 (as printed)" for Scorpio Hugger appears twice (identical
//     duplicate rows) and "009-10" isn't a valid single SKU code — Hugger
//     models otherwise use the VFH prefix (VFH004-VFH010), not VFR.
// Neither Chronos nor Scorpio Hugger has any local photo yet either, so
// there's no urgency — this script skips both and reports them clearly
// rather than importing a bad model code.
const SKIP_UNCONFIRMED = new Set(["VFR008 (AS PRINTED)", "VFR009-10 (AS PRINTED)"]);

function findCol(cols: string[], names: string[]): string | undefined {
  return cols.find((c) => names.includes(c.toLowerCase().trim()));
}

const MAPPED_COLS = new Set([
  "s.no", "category", "model no.", "size", "wattage", "body colour",
]);

function buildExtraSpecs(row: Record<string, any>, cols: string[]): Record<string, string> {
  const extra: Record<string, string> = {};
  for (const col of cols) {
    const lc = col.toLowerCase().trim();
    if (MAPPED_COLS.has(lc)) continue;
    if (lc.startsWith("__empty")) continue;
    const val = row[col];
    if (val == null) continue;
    const trimmed = String(val).trim();
    if (trimmed === "") continue;
    extra[col.trim()] = trimmed;
  }
  return extra;
}

interface ParsedRow {
  model: string;
  row: any;
}

function parseVolaris(): { rows: any[]; skipped: ParsedRow[] } {
  const workbook = XLSX.readFile(EXCEL_PATH);
  // Real header is on row index 3 (0-indexed) — rows 0-1 are a merged title
  // banner and a source note, row 2 is blank.
  const sheetRows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[SHEET_NAME], { range: 3, defval: null });
  const cols = Object.keys(sheetRows[0]);
  const modelCol = findCol(cols, ["model no.", "model no", "item number"]);
  if (!modelCol) throw new Error("No model column found in Volaris sheet");

  const rows: any[] = [];
  const skipped: ParsedRow[] = [];

  for (const row of sheetRows) {
    const modelVal = row[modelCol];
    if (!modelVal || String(modelVal).trim() === "") continue;
    const model = String(modelVal).trim();

    if (SKIP_UNCONFIRMED.has(model.toUpperCase())) {
      skipped.push({ model, row });
      continue;
    }

    const category = row["Category"] ? String(row["Category"]).trim() : null;
    const bodyColourRaw = row["Body Colour"];
    const bodyColors = bodyColourRaw
      ? String(bodyColourRaw).split(",").map((v: string) => v.trim()).filter(Boolean)
      : [];

    // Unlike Artizan/Klewe, this sheet has no explicit "Family" column, so
    // (per user instruction) we don't synthesize grouping from "Product" —
    // every model stands alone here.
    rows.push({
      model,
      family: null,
      category,
      group_name: category,
      collection: COLLECTION,
      hero_description: null,
      watts: row["Wattage"]?.toString() || null,
      dimensions: row["Size"]?.toString() || null,
      cutout_size: null,
      body_colors: bodyColors,
      cct: [],
      beam_angle: null,
      ip_rating: null,
      led_chip: null,
      luminous: null,
      cri: null,
      // No Website column in this sheet at all — defaulting every Volaris
      // fan to visible, consistent with how Outdoor and Artizan were
      // handled when they had no (or only partial) per-row visibility flag.
      website: "W",
      product_type: null,
      extra_specs: buildExtraSpecs(row, cols),
    });
  }

  return { rows, skipped };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("=== Volaris Importer ===\n");
  console.log("Parsing VOLARIS_2026_Spec_Sheet_updated.xlsx...");
  const { rows: parsed, skipped } = parseVolaris();

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} row(s) flagged "(as printed)" in the source — needs your confirmation:`);
    skipped.forEach((s) => console.log(`  model="${s.model}" product="${s.row["Product"]}"`));
  }

  const modelMap = new Map<string, any>();
  for (const row of parsed) {
    if (modelMap.has(row.model)) {
      console.log(`  WARNING: duplicate model "${row.model}" within the sheet — keeping latest.`);
    }
    modelMap.set(row.model, row);
  }
  const rows = Array.from(modelMap.values());
  console.log(`\nParsed ${rows.length} unique, unambiguous Volaris products.\n`);

  console.log("Checking for existing rows (by model) to preserve images and detect updates vs inserts...");
  const existingByModel = new Map<string, { id: number; hero_image: string | null; gallery_images: string[] }>();
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200).map((r) => r.model);
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("id, model, hero_image, gallery_images")
      .in("model", chunk);
    if (error) throw error;
    (data || []).forEach((r: any) => existingByModel.set(r.model, r));
  }

  for (const row of rows) {
    const existing = existingByModel.get(row.model);
    row.hero_image = existing?.hero_image ?? null;
    row.gallery_images = existing?.gallery_images ?? [];
  }
  console.log(`  ${existingByModel.size} models already existed. Images preserved where present.\n`);

  const newRows = rows.filter((r) => !existingByModel.has(r.model));
  const existingRows = rows.filter((r) => existingByModel.has(r.model));
  console.log(`New models to insert: ${newRows.length}`);
  console.log(`Existing models to update: ${existingRows.length}\n`);

  if (newRows.length > 0) {
    const { data: maxRow, error: maxErr } = await supabase
      .from("ledlum_products")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();
    if (maxErr) throw maxErr;
    let nextId = (maxRow?.id || 0) + 1;
    newRows.forEach((r) => { r.id = nextId++; });
  }
  existingRows.forEach((r) => { delete r.id; });

  console.log("Upserting to Supabase (insert new / update existing, by model)...");
  let done = 0;
  for (const [label, group] of [["new", newRows], ["existing", existingRows]] as const) {
    for (let i = 0; i < group.length; i += BATCH_SIZE) {
      const batch = group.slice(i, i + BATCH_SIZE);
      if (batch.length === 0) continue;
      const { error } = await supabase.from("ledlum_products").upsert(batch, { onConflict: "model" });
      if (error) {
        console.log(`  FAILED ${label} batch ${i / BATCH_SIZE + 1}: ${error.message}`);
      } else {
        done += batch.length;
      }
      await sleep(150);
    }
  }

  console.log(`\nDone. ${done}/${rows.length} Volaris products upserted.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
