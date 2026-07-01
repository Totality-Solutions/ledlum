import * as XLSX from "xlsx";
import * as fs from "fs";

const wb = XLSX.readFile("./Indoor_Products.xlsx");
const out: string[] = [];

for (const name of wb.SheetNames) {
  const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[name]);
  if (rows.length === 0) continue;
  const cols = Object.keys(rows[0]);
  const hasWebsite = cols.some((c) => c.toLowerCase().includes("website"));
  out.push(`${name} | rows:${rows.length} | hasWebsite:${hasWebsite} | cols:${cols.join(";")}`);
}

fs.writeFileSync("excel-check2.txt", out.join("\n"), "utf8");
console.log("Done");
