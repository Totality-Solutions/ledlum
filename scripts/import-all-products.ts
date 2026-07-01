import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;

// ============ CONFIGURATION ============
// Add new collections here by extending this array.
// Each entry defines a source type, path, collection name, and field mappings.

interface CollectionSource {
  name: string;          // collection value stored in DB (e.g. "indoor", "outdoor")
  sourceType: "excel" | "json-dir";
  path: string;
}

const COLLECTIONS: CollectionSource[] = [
  {
    name: "indoor",
    sourceType: "excel",
    path: "./Indoor_Products.xlsx",
  },
  {
    name: "outdoor",
    sourceType: "json-dir",
    path: "./content/data/outdoor",
  },
  // To add a new collection:
  //   { name: "artizan", sourceType: "json-dir", path: "./content/data/artizan" },
  //   { name: "astara",  sourceType: "excel",    path: "./Astara_Products.xlsx" },
];
// ========================================

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function upsertBatch(batch: any[], attempt = 1): Promise<number> {
  const { error } = await supabase
    .from("ledlum_products")
    .upsert(batch, { onConflict: "model" });

  if (error) {
    if (attempt < 3) {
      await sleep(1000 * attempt);
      return upsertBatch(batch, attempt + 1);
    }
    console.log(`  FAILED batch (${batch.length} rows): ${error.message}`);
    return 0;
  }
  return batch.length;
}

function splitValues(value: string | undefined | null): string[] {
  if (!value) return [];
  return value.split(/\/|,|\n/).map((v) => v.trim()).filter(Boolean);
}

// --------------- Excel Source ---------------

function parseExcelSource(source: CollectionSource): any[] {
  const workbook = XLSX.readFile(source.path);
  const rows: any[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const sheetRows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });
    if (sheetRows.length === 0) continue;

    const cols = Object.keys(sheetRows[0]);
    const modelCol = findCol(cols, ["item number", "model no", "item code", "item number"]);
    const familyCol = findCol(cols, ["family"]);
    const websiteCol = findCol(cols, ["website", "websiite"]);
    const categoryCol = findCol(cols, ["category"]);
    const productTypeCol = findCol(cols, ["product type"]);

    if (!modelCol) {
      console.log(`  [${source.name}] Skipping "${sheetName}" — no model column`);
      continue;
    }

    let currentFamily = "";

    for (const row of sheetRows) {
      const modelVal = row[modelCol];
      if (!modelVal || String(modelVal).trim() === "") continue;
      const model = String(modelVal).trim();

      // Family block detection: "F" marks start of new family
      if (familyCol) {
        const famMarker = String(row[familyCol] || "").trim().toLowerCase();
        if (famMarker === "f") {
          currentFamily = model;
        }
      }

      let websiteValue: string | null = null;
      if (websiteCol && row[websiteCol] != null) {
        const trimmed = String(row[websiteCol]).trim();
        if (trimmed !== "") websiteValue = trimmed.toUpperCase();
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
        collection: source.name,
        hero_image: null,
        hero_description: row["Product Overview"] || null,
        gallery_images: [],
        watts: row["Watts"]?.toString() || row["Wattage/Mtr"]?.toString() || row["Watt"]?.toString() || null,
        dimensions: row["Dimension"]?.toString() || row["Size"]?.toString() || null,
        cutout_size: row["Cutout Size"]?.toString() || null,
        body_colors: bodyColors,
        cct,
        beam_angle: row["Beam Angle"]?.toString() || null,
        ip_rating: row["IP Rating"]?.toString() || null,
        led_chip: row["Powered by"]?.toString() || null,
        luminous: row["Luminous"]?.toString() || null,
        cri: row["CRI"]?.toString() || null,
        website: websiteValue,
        product_type: rawProductType?.toLowerCase() === "new" ? "new" : null,
      });
    }

    console.log(`  [${source.name}] Sheet "${sheetName}": ${sheetRows.length} rows`);
  }

  return rows;
}

function findCol(cols: string[], names: string[]): string | undefined {
  return cols.find((c) => names.includes(c.toLowerCase()));
}

// --------------- JSON Directory Source ---------------

function parseJsonDirSource(source: CollectionSource): any[] {
  const dir = source.path;
  if (!fs.existsSync(dir)) {
    console.log(`  [${source.name}] Directory not found: ${dir}`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  console.log(`  [${source.name}] Found ${files.length} category files`);

  const rows: any[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const category = raw.category || file.replace(".json", "");
    const products = raw.products || [];

    for (const product of products) {
      const model = product.item_number;
      if (!model || String(model).trim() === "") continue;

      rows.push({
        model: String(model).trim(),
        family: null,
        category: null,
        group_name: category,
        collection: source.name,
        hero_image: null,
        hero_description: product.feature || product.product_type || null,
        gallery_images: [],
        watts: product.watts?.toString() || null,
        dimensions: product.dimension?.toString() || null,
        cutout_size: product.cutout_size?.toString() || null,
        body_colors: product.body_color ? splitValues(product.body_color) : [],
        cct: product.cct_k ? splitValues(product.cct_k) : [],
        beam_angle: product.beam_angle?.toString() || null,
        ip_rating: product.ip_rating?.toString() || null,
        led_chip: product.powered_by?.toString() || null,
        luminous: product.luminous?.toString() || null,
        cri: product.cri?.toString() || null,
        website: "W",
        product_type: product.product_type?.toLowerCase() === "new" ? "new" : null,
      });
    }

    console.log(`    ${category}: ${products.length} products`);
  }

  return rows;
}

// ============ MAIN ============

async function importAllProducts() {
  console.log("=== Ledlum Product Importer ===\n");

  // Clear existing data
  console.log("Clearing existing data...");
  const { error: resetError } = await supabase.rpc("reset_products_table");
  if (resetError) {
    const { error: deleteError } = await supabase
      .from("ledlum_products")
      .delete()
      .neq("id", 0);
    if (deleteError) {
      console.log("Delete error:", deleteError.message);
      return;
    }
  }
  console.log("Table cleared.\n");

  // Parse all collections
  const allRows: any[] = [];
  const collectionStats: Record<string, { total: number; withWebsite: number }> = {};

  for (const source of COLLECTIONS) {
    console.log(`Processing collection: ${source.name} (${source.sourceType})`);

    let rows: any[];
    if (source.sourceType === "excel") {
      rows = parseExcelSource(source);
    } else if (source.sourceType === "json-dir") {
      rows = parseJsonDirSource(source);
    } else {
      console.log(`  Unknown source type: ${source.sourceType}`);
      continue;
    }

    const withWebsite = rows.filter((r) => r.website).length;
    collectionStats[source.name] = { total: rows.length, withWebsite };
    allRows.push(...rows);
    console.log(`  → ${rows.length} rows parsed (${withWebsite} with website)\n`);
  }

  // Deduplicate by model — keep last occurrence
  const modelMap = new Map<string, any>();
  for (const row of allRows) {
    // If model already exists from another collection, keep both? No — use collection as part of uniqueness
    // Actually the DB enforces model uniqueness. If duplicate models exist across collections,
    // we should warn and keep the last one.
    if (modelMap.has(row.model)) {
      console.log(`  WARNING: Duplicate model "${row.model}" in collection "${row.collection}" (also in another collection). Keeping latest.`);
    }
    modelMap.set(row.model, row);
  }
  const deduplicated = Array.from(modelMap.values());
  const dupes = allRows.length - deduplicated.length;

  // Assign sequential IDs
  deduplicated.forEach((row, i) => { row.id = i + 1; });

  // Print summary
  console.log("=".repeat(60));
  console.log("IMPORT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total unique products: ${deduplicated.length}`);
  if (dupes > 0) console.log(`Duplicate models removed: ${dupes}`);
  console.log("");

  for (const [name, stats] of Object.entries(collectionStats)) {
    console.log(`  ${name.padEnd(15)} ${String(stats.total).padStart(5)} rows  (${stats.withWebsite} with website)`);
  }

  const websiteCount = deduplicated.filter((r) => r.website).length;
  const noWebsiteCount = deduplicated.filter((r) => !r.website).length;
  console.log(`\n  Visible (website=W): ${websiteCount}`);
  console.log(`  Hidden  (no website): ${noWebsiteCount}`);

  // Import
  console.log(`\nImporting to Supabase...`);
  let imported = 0;
  for (let i = 0; i < deduplicated.length; i += BATCH_SIZE) {
    const batch = deduplicated.slice(i, i + BATCH_SIZE);
    const result = await upsertBatch(batch);
    imported += result;
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(deduplicated.length / BATCH_SIZE)}: ${result} rows`);
    await sleep(200);
  }

  console.log(`\n✓ Done: ${imported} products imported (IDs 1-${imported})`);
}

importAllProducts();
