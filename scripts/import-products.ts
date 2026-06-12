import dotenv from "dotenv";
import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BATCH_SIZE = 50;
const workbook = XLSX.readFile("./Indoor_Products.xlsx");

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function findCol(cols: string[], names: string[]): string | undefined {
  return cols.find((c) => names.includes(c.toLowerCase()));
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
    console.log(`  Failed batch (${batch.length} rows): ${error.message}`);
    return 0;
  }
  return batch.length;
}

async function importProducts() {
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

  const allRows: any[] = [];
  const stats: Record<string, { total: number; families: number; website: number }> = {};

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);
    if (rows.length === 0) continue;

    const cols = Object.keys(rows[0]);
    const modelCol = findCol(cols, ["item number", "model no", "item code"]);
    const familyCol = findCol(cols, ["family"]);
    const websiteCol = findCol(cols, ["website", "websiite"]);
    const categoryCol = findCol(cols, ["category"]);
    const productTypeCol = findCol(cols, ["product type"]);

    if (!modelCol) {
      console.log(`  Skipping "${sheetName}" — no model column found`);
      continue;
    }

    const sheetStats = { total: 0, families: 0, website: 0 };
    let currentFamily = "";
    let familyCounter = 0;

    for (const row of rows) {
      const modelVal = row[modelCol];
      if (!modelVal || String(modelVal).trim() === "") continue;

      const model = String(modelVal).trim();

      // Family block detection: "F" (case-insensitive) marks start of new family
      if (familyCol) {
        const famMarker = String(row[familyCol] || "").trim().toLowerCase();
        if (famMarker === "f") {
          familyCounter++;
          currentFamily = model; // Family name = first model in the block
        }
      }

      // Website: only set if column exists AND has non-empty value
      let websiteValue: string | null = null;
      if (websiteCol && row[websiteCol] != null) {
        const trimmed = String(row[websiteCol]).trim();
        if (trimmed !== "") {
          websiteValue = trimmed.toUpperCase();
        }
      }

      // Category
      const category = categoryCol ? String(row[categoryCol] || "").trim() || null : null;

      // Product type
      const rawProductType = productTypeCol && row[productTypeCol]
        ? String(row[productTypeCol]).trim()
        : null;
      const normalizedProductType = rawProductType?.toLowerCase() === "new" ? "new" : null;

      // CCT
      const cctRaw = row["CCT (K)"] || row["CCT"];
      const cct = cctRaw
        ? String(cctRaw).split("/").map((v: string) => v.trim()).filter(Boolean)
        : [];

      // Body colors
      const bodyRaw = row["Body Color"];
      const bodyColors = bodyRaw
        ? String(bodyRaw).split("/").map((v: string) => v.trim()).filter(Boolean)
        : [];

      allRows.push({
        model,
        family: currentFamily || null,
        category,
        group_name: sheetName,
        collection: "indoor",
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
        product_type: normalizedProductType,
      });

      sheetStats.total++;
      if (currentFamily) sheetStats.families = familyCounter;
      if (websiteValue) sheetStats.website++;
    }

    stats[sheetName] = sheetStats;
  }

  // Deduplicate by model — keep last occurrence
  const modelMap = new Map<string, any>();
  for (const row of allRows) {
    modelMap.set(row.model, row);
  }
  const deduplicated = Array.from(modelMap.values());

  const dupes = allRows.length - deduplicated.length;
  if (dupes > 0) console.log(`Removed ${dupes} duplicate models\n`);

  // Assign sequential IDs
  deduplicated.forEach((row, i) => {
    row.id = i + 1;
  });

  const websiteCount = deduplicated.filter((r) => r.website).length;
  const noWebsiteCount = deduplicated.filter((r) => !r.website).length;

  console.log("=== Import Summary ===");
  console.log(`Total unique products: ${deduplicated.length}`);
  console.log(`With website (visible): ${websiteCount}`);
  console.log(`Without website (hidden): ${noWebsiteCount}`);
  console.log(`\nSheet breakdown:`);

  for (const [name, s] of Object.entries(stats)) {
    console.log(`  ${name}: ${s.total} rows, ${s.families} families, ${s.website} with website`);
  }

  console.log(`\nImporting...`);
  let imported = 0;
  for (let i = 0; i < deduplicated.length; i += BATCH_SIZE) {
    const batch = deduplicated.slice(i, i + BATCH_SIZE);
    const result = await upsertBatch(batch);
    imported += result;
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(deduplicated.length / BATCH_SIZE)}: ${result} rows`);
    await sleep(200);
  }

  console.log(`\nDone: ${imported} products imported (IDs 1-${imported})`);
}

importProducts();
