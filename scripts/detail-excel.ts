import * as XLSX from "xlsx";
import * as fs from "fs";

const wb = XLSX.readFile("./Indoor_Products.xlsx");
const out: string[] = [];

// Check a few sheets in detail
const checkSheets = [
  "LED SMD CONCEALED DOWN LIGHT FI",
  "LED COB CONCEALED DOWN LIGHT FI",
  "LED STRIP LIGHT DRIVERS NEW",
  "LED INDOOR WALL LIGHTS",
  "PREMIUM SERIES",
];

for (const s of checkSheets) {
  const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[s]);
  out.push(`\n=== ${s} (${rows.length} rows) ===`);

  const cats: Record<string, number> = {};
  const familyCol = Object.keys(rows[0] || {}).find((c) => c.toLowerCase() === "family");

  for (const r of rows) {
    const cat = String(r["Category"] || "").trim();
    cats[cat] = (cats[cat] || 0) + 1;
  }
  out.push("Categories: " + JSON.stringify(cats, null, 2));

  // Show first 5 rows with Family
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const row = rows[i];
    const familyVal = familyCol ? row[familyCol] : "N/A";
    out.push(`  Row ${i}: Item=${row["Item Number"]} | Family=${familyVal} | Cat=${row["Category"]} | Website=${row["Website"] || "N/A"}`);
  }
}

fs.writeFileSync("excel-detail.txt", out.join("\n"), "utf8");
console.log("Done");
