import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

dotenv.config({ path: ".env" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;
const EXCEL_PATH = "./Klewe.xlsx";
const COLLECTION = "klewe";

// Separate from scripts/import-all-products.ts for the same reason as
// scripts/import-artizan.ts: that script TRUNCATEs and rebuilds the whole
// table from Excel alone, with no notion of the Cloudflare-hosted images
// linked afterward — re-running it would wipe every hero_image/gallery_images
// value across every collection. This script only touches Klewe rows, via
// upsert on the unique `model` key, and preserves any images already linked.
//
// These 25 models already exist in the DB, but were imported earlier as part
// of the old Indoor workbook's "KLEWE SISTEMASOLARE" sheet with collection
// set to "indoor" and no Website value — this run corrects both.

function findCol(cols: string[], names: string[]): string | undefined {
  return cols.find((c) => names.includes(c.toLowerCase().trim()));
}

const MAPPED_COLS = new Set([
  "category", "item number", "model no", "item code", "family",
  "website", "websiite", "product type", "watts", "watt", "wattage/mtr",
  "dimension", "size", "cutout size", "body color", "cct (k)", "cct",
  "powered by", "beam angle", "ip rating", "luminous", "cri",
  "product overview",
]);

function buildExtraSpecs(row: Record<string, any>, cols: string[]): Record<string, string> {
  const extra: Record<string, string> = {};
  for (const col of cols) {
    const lc = col.toLowerCase().trim();
    if (MAPPED_COLS.has(lc)) continue;
    if (lc.startsWith("d.p.")) continue; // dealer/distributor price — not for the public site
    if (lc.startsWith("__empty")) continue;
    const val = row[col];
    if (val == null) continue;
    const trimmed = String(val).trim();
    if (trimmed === "") continue;
    extra[col.trim()] = trimmed;
  }
  return extra;
}

function parseKlewe(): any[] {
  const workbook = XLSX.readFile(EXCEL_PATH);
  const rows: any[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheetRows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
    if (sheetRows.length === 0) continue;

    const cols = Object.keys(sheetRows[0]);
    const modelCol = findCol(cols, ["item number", "model no", "item code"]);
    const familyCol = findCol(cols, ["family"]);
    const categoryCol = findCol(cols, ["category"]);
    const websiteCol = findCol(cols, ["website", "websiite"]);

    if (!modelCol) {
      console.log(`  Skipping "${sheetName}" — no model column`);
      continue;
    }

    let currentFamily = "";

    for (const row of sheetRows) {
      const modelVal = row[modelCol];
      if (!modelVal || String(modelVal).trim() === "") continue;
      const model = String(modelVal).trim();

      if (familyCol) {
        const famMarker = String(row[familyCol] || "").trim().toLowerCase();
        if (famMarker === "f") currentFamily = model;
      }

      const category = categoryCol ? String(row[categoryCol] || "").trim() || null : null;

      const cctRaw = row["CCT (K)"] || row["CCT"];
      const cct = cctRaw
        ? String(cctRaw).split("/").map((v: string) => v.trim()).filter(Boolean)
        : [];

      let websiteValue: string | null = null;
      if (websiteCol && row[websiteCol] != null) {
        const trimmed = String(row[websiteCol]).trim();
        if (trimmed !== "") websiteValue = "W";
      }

      rows.push({
        model,
        family: currentFamily || null,
        category,
        group_name: sheetName === "Sheet1" ? (category || "KLEWE SISTEMASOLARE") : sheetName,
        collection: COLLECTION,
        hero_description: row["Product Overview"] || null,
        watts: row["Watt"]?.toString() || row["Watts"]?.toString() || null,
        dimensions: row["Size"]?.toString() || row["Dimension"]?.toString() || null,
        cutout_size: row["Cutout Size"]?.toString() || null,
        body_colors: [],
        cct,
        beam_angle: row["Beam Angle"]?.toString() || null,
        ip_rating: row["IP Rating"]?.toString() || null,
        led_chip: row["Powered by"]?.toString() || row["Powered By"]?.toString() || null,
        luminous: row["Luminous"]?.toString() || null,
        cri: row["CRI"]?.toString() || null,
        website: websiteValue,
        product_type: null,
        extra_specs: buildExtraSpecs(row, cols),
      });
    }

    console.log(`  Sheet "${sheetName}": ${sheetRows.length} rows`);
  }

  return rows;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("=== Klewe Importer ===\n");
  console.log("Parsing Klewe.xlsx...");
  const parsed = parseKlewe();

  const modelMap = new Map<string, any>();
  for (const row of parsed) {
    if (modelMap.has(row.model)) {
      console.log(`  WARNING: duplicate model "${row.model}" within Klewe.xlsx — keeping latest.`);
    }
    modelMap.set(row.model, row);
  }
  const rows = Array.from(modelMap.values());
  console.log(`\nParsed ${rows.length} unique Klewe products.\n`);

  console.log("Checking for existing rows (by model) to preserve images and detect updates vs inserts...");
  const existingByModel = new Map<string, { id: number; hero_image: string | null; gallery_images: string[]; collection: string }>();
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200).map((r) => r.model);
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("id, model, hero_image, gallery_images, collection")
      .in("model", chunk);
    if (error) throw error;
    (data || []).forEach((r: any) => existingByModel.set(r.model, r));
  }

  let alreadyKlewe = 0;
  let fixedFromOtherCollection = 0;
  for (const row of rows) {
    const existing = existingByModel.get(row.model);
    row.hero_image = existing?.hero_image ?? null;
    row.gallery_images = existing?.gallery_images ?? [];
    if (existing) {
      if (existing.collection === COLLECTION) alreadyKlewe++;
      else fixedFromOtherCollection++;
    }
  }
  console.log(`  ${existingByModel.size} models already existed (${fixedFromOtherCollection} being moved from another collection, ${alreadyKlewe} already correct).`);
  console.log(`  Images preserved where already present.\n`);

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

  console.log(`\nDone. ${done}/${rows.length} Klewe products upserted.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
