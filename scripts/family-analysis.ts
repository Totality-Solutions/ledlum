import * as XLSX from "xlsx";
import * as fs from "fs";

const wb = XLSX.readFile("./Indoor_Products.xlsx");
const out: string[] = [];

// Look at sheets where Family column exists and see the pattern
const checkSheets = [
  "LED SMD CONCEALED DOWN LIGHT FI",
  "LED COB CONCEALED DOWN LIGHT FI", 
  "PREMIUM SERIES",
  "LED STRIP LIGHT DRIVERS NEW",
  "LED INDOOR WALL LIGHTS",
  "LED COB TRACK LIGHTS",
];

for (const sheetName of checkSheets) {
  const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
  if (rows.length === 0) continue;

  const cols = Object.keys(rows[0]);
  const familyCol = cols.find((c) => c.toLowerCase() === "family");

  out.push(`\n=== ${sheetName} ===`);

  // Track family blocks
  let familyBlockNum = 0;
  const items: { item: string; familyMarker: string; category: string; blockNum: number }[] = [];

  for (let i = 0; i < Math.min(rows.length, 40); i++) {
    const row = rows[i];
    const familyMarker = familyCol ? String(row[familyCol] || "").trim() : "";
    if (familyMarker) {
      familyBlockNum++;
    }
    items.push({
      item: String(row["Item Number"] || "").trim(),
      familyMarker,
      category: String(row["Category"] || "").trim(),
      blockNum: familyBlockNum,
    });
  }

  out.push(`Total rows: ${rows.length}, Family blocks: ${familyBlockNum}`);
  for (const item of items) {
    out.push(`  [Block ${item.blockNum}] ${item.item} | Fam=${item.familyMarker || "(empty)"} | Cat=${item.category.substring(0, 60)}`);
  }
}

fs.writeFileSync("excel-family-blocks.txt", out.join("\n"), "utf8");
console.log("Done");
