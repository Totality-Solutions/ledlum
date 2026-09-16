import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;
const EXCEL_PATH = "./Artizan.xlsx";
const COLLECTION = "artizan";

// This importer is intentionally separate from scripts/import-all-products.ts,
// which TRUNCATEs and rebuilds the whole ledlum_products table from Excel
// alone (it has no notion of the Cloudflare-hosted images that get linked
// afterward). Re-running that script would wipe every hero_image/gallery_images
// value across indoor/outdoor. This script only ever inserts/updates artizan
// rows via upsert on the unique `model` key, and preserves any images already
// linked to a model if it's run again later.

function findCol(cols: string[], names: string[]): string | undefined {
  return cols.find((c) => names.includes(c.toLowerCase().trim()));
}

const MAPPED_COLS = new Set([
  "category", "item number", "model no", "item code", "family",
  "website", "websiite", "product type", "watts", "wattage/mtr", "watt",
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

function parseArtizan(): any[] {
  const workbook = XLSX.readFile(EXCEL_PATH);
  const rows: any[] = [];

  for (const sheetName of workbook.SheetNames) {
    if (sheetName.toUpperCase() === "INDEX") continue;

    const sheet = workbook.Sheets[sheetName];
    // Row 0 is a merged title banner, row 1 a subtitle note, row 2 the real header.
    const sheetRows: any[] = XLSX.utils.sheet_to_json(sheet, { range: 2, defval: null });
    if (sheetRows.length === 0) continue;

    const cols = Object.keys(sheetRows[0]);
    const modelCol = findCol(cols, ["item number", "model no", "item code"]);
    const familyCol = findCol(cols, ["family"]);
    const categoryCol = findCol(cols, ["category"]);
    const productTypeCol = findCol(cols, ["product type"]);

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
      const rawProductType = productTypeCol && row[productTypeCol]
        ? String(row[productTypeCol]).trim() : null;

      const cctRaw = row["CCT (K)"] || row["CCT"];
      const cct = cctRaw
        ? String(cctRaw).split("/").map((v: string) => v.trim()).filter(Boolean)
        : [];

      const bodyRaw = row["Body Color"];
      const bodyColors = bodyRaw
        ? String(bodyRaw).split("/").map((v: string) => v.trim()).filter(Boolean)
        : [];

      rows.push({
        model,
        family: currentFamily || null,
        category,
        group_name: sheetName,
        collection: COLLECTION,
        hero_description: row["Product Overview"] || null,
        watts: row["Watts"]?.toString() || null,
        dimensions: row["Dimension"]?.toString() || row["Size"]?.toString() || null,
        cutout_size: row["Cutout Size"]?.toString() || null,
        body_colors: bodyColors,
        cct,
        beam_angle: row["Beam Angle"]?.toString() || null,
        ip_rating: row["IP Rating"]?.toString() || null,
        led_chip: row["Powered by"]?.toString() || row["Powered By"]?.toString() || null,
        luminous: row["Luminous"]?.toString() || null,
        cri: row["CRI"]?.toString() || null,
        // Every Artizan product shown regardless of the sheet's own Website column —
        // confirmed with the user since only 10/31 sheets had that column filled in.
        website: "W",
        product_type: rawProductType?.toLowerCase() === "new" ? "new" : null,
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
  console.log("=== Artizan Importer ===\n");
  console.log("Parsing Artizan.xlsx...");
  const parsed = parseArtizan();

  const modelMap = new Map<string, any>();
  for (const row of parsed) {
    if (modelMap.has(row.model)) {
      console.log(`  WARNING: duplicate model "${row.model}" within Artizan.xlsx — keeping latest.`);
    }
    modelMap.set(row.model, row);
  }
  const rows = Array.from(modelMap.values());
  console.log(`\nParsed ${rows.length} unique Artizan products.\n`);

  // Preserve any images already linked to these models (safe to re-run later).
  console.log("Checking for existing image links to preserve...");
  const existingByModel = new Map<string, { hero_image: string | null; gallery_images: string[] }>();
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200).map((r) => r.model);
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("model, hero_image, gallery_images")
      .in("model", chunk);
    if (error) throw error;
    (data || []).forEach((r: any) => existingByModel.set(r.model, r));
  }

  for (const row of rows) {
    const existing = existingByModel.get(row.model);
    row.hero_image = existing?.hero_image ?? null;
    row.gallery_images = existing?.gallery_images ?? [];
  }
  console.log(`  ${existingByModel.size} models already had image data — preserved.\n`);

  // The main importer (scripts/import-all-products.ts) assigns explicit
  // sequential `id` values on every run rather than letting the IDENTITY
  // column auto-generate them, which leaves the underlying sequence
  // desynced from the real max id. Letting Postgres auto-assign here would
  // collide with an existing row's id (confirmed happens as of this run).
  // Work around it by assigning ids ourselves for genuinely new rows only.
  const { data: maxRow, error: maxErr } = await supabase
    .from("ledlum_products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  if (maxErr) throw maxErr;
  let nextId = (maxRow?.id || 0) + 1;

  const newRows = rows.filter((r) => !existingByModel.has(r.model));
  const existingRows = rows.filter((r) => existingByModel.has(r.model));
  newRows.forEach((r) => { r.id = nextId++; });
  // Existing rows keep whatever id they already have — omit it from the
  // payload so the upsert's ON CONFLICT UPDATE never touches it.
  existingRows.forEach((r) => { delete r.id; });

  console.log(`New models to insert: ${newRows.length}`);
  console.log(`Existing models to update: ${existingRows.length}\n`);

  console.log("Upserting to Supabase (insert new / update existing, by model)...");
  let done = 0;
  // Kept as two separate passes (not concatenated-then-sliced) so no batch
  // ever mixes rows that carry an explicit `id` with rows that don't.
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

  console.log(`\nDone. ${done}/${rows.length} Artizan products upserted.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
