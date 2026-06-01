import dotenv from "dotenv";
import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: ".env.local",
});


console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const workbook = XLSX.readFile(
  "./Ledlum_Indoor_Website_W.xlsx"
);

async function importProducts() {
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const rows: any[] =
      XLSX.utils.sheet_to_json(sheet);

    let currentFamily = "";

    const websiteRows = [];

    for (const row of rows) {
      if (
        !row.Website ||
        String(row.Website).trim() === ""
      ) {
        continue;
      }

      if (row.Family) {
        currentFamily = row.Family;
      }

      websiteRows.push({
        ...row,
        familyCode: currentFamily,
      });
    }

    // Build family map
    const familyMap = new Map();

    for (const row of websiteRows) {
      const key = row.familyCode;

      if (!familyMap.has(key)) {
        familyMap.set(key, []);
      }

      familyMap
        .get(key)
        .push(row["Item Number"]);
    }

    // Insert products
    for (const row of websiteRows) {
      const model =
        String(row["Item Number"]).trim();

      await supabase
        .from("products")
        .upsert({
          model,

          family: row.familyCode,

          family_models:
            familyMap.get(row.familyCode),

          category: row.Category,

          series: model,

          group_name: sheetName,

          collection: "indoor",

          watts: row.Watts,

          dimensions: row.Dimension,

          cutout_size: row["Cutout Size"],

          body_colors: row["Body Color"]
            ? String(
                row["Body Color"]
              ).split("/")
            : [],

          cct: row["CCT (K)"]
            ? String(
                row["CCT (K)"]
              ).split("/")
            : [],

          beam_angle: row["Beam Angle"],

          ip_rating: row["IP Rating"],

          led_chip: row["Powered by"],

          luminous: row["Luminous"],

          cri: row["CRI"],

          website: row.Website,
        });
    }
  }

  console.log("Import Complete");
}

importProducts();