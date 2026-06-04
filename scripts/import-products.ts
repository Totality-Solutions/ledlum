import dotenv from "dotenv";
import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: ".env.local",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const workbook = XLSX.readFile("./Ledlum_Indoor_Website_W.xlsx");

async function importProducts() {
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    let currentFamily = "";
    let familyCounter = 0;
    const websiteRows = [];

    for (const row of rows) {
      if (!row.Website || String(row.Website).trim() === "") {
        continue;
      }

      if (row.Family) {
        familyCounter++;
        currentFamily = `${sheetName}-F${familyCounter}`;
      }

      websiteRows.push({
        ...row,
        familyCode: currentFamily,
      });
    }

    for (const row of websiteRows) {
      // ✅ SAFETY GUARD: Skip completely if the Item Number column data is blank
      if (!row["Item Number"] || String(row["Item Number"]).trim() === "") {
        continue;
      }

      const model = String(row["Item Number"]).trim();
      const galleryImages = [];

      if (row["Gallery 1"]) galleryImages.push(row["Gallery 1"]);
      if (row["Gallery 2"]) galleryImages.push(row["Gallery 2"]);
      if (row["Gallery 3"]) galleryImages.push(row["Gallery 3"]);

      // Extract and normalize Product Type (handles 'new', 'NEW', 'New', etc.)
      const rawProductType = row["Product Type"] ? String(row["Product Type"]).trim() : null;
      const normalizedProductType = rawProductType?.toLowerCase() === "new" ? "new" : rawProductType;

      // ✅ UPDATED: Target table target point switched from 'products' to 'product'
      const { error } = await supabase
        .from("product")
        .upsert({
          model,
          family: row.familyCode,
          category: row.Category,
          group_name: sheetName,
          collection: "indoor",
          hero_image: row["Hero Image"] || null,
          hero_description: row["Description"] || null,
          gallery_images: galleryImages,
          watts: row["Watts"]?.toString() || null,
          dimensions: row["Dimension"]?.toString() || null,
          cutout_size: row["Cutout Size"]?.toString() || null,
          body_colors: row["Body Color"]
            ? String(row["Body Color"]).split("/").map((v) => v.trim())
            : [],
          cct: row["CCT (K)"]
            ? String(row["CCT (K)"]).split("/").map((v) => v.trim())
            : [],
          beam_angle: row["Beam Angle"]?.toString() || null,
          ip_rating: row["IP Rating"]?.toString() || null,
          led_chip: row["Powered by"]?.toString() || null,
          luminous: row["Luminous"]?.toString() || null,
          cri: row["CRI"]?.toString() || null,
          website: row["Website"]?.toString() || null,
          product_type: normalizedProductType,
        });

      if (error) {
        console.log(model, error);
      }
    }
  }

  console.log("Import Complete");
}

importProducts();