import * as XLSX from "xlsx";

const wb = XLSX.readFile("./Indoor_Products.xlsx");
const out: string[] = [];

for (const name of wb.SheetNames) {
  const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[name]);
  if (rows.length === 0) continue;
  const cols = Object.keys(rows[0]);
  const familyCol = cols.find((c) => c.toLowerCase() === "family");
  const websiteCol = cols.find((c) => c.toLowerCase().includes("website"));
  const modelCol = cols.find((c) => c === "Item Number" || c === "Model No" || c === "Item Code");

  const families: Record<string, number> = {};
  const websites: Record<string, number> = {};

  for (const row of rows) {
    const fam = familyCol ? String(row[familyCol] || "").trim() : "";
    const web = websiteCol ? String(row[websiteCol] || "").trim() : "";
    if (fam) families[fam] = (families[fam] || 0) + 1;
    if (web) websites[web] = (websites[web] || 0) + 1;
  }

  out.push(`${name} | modelCol:${modelCol} | familyCol:${familyCol} | websiteCol:${websiteCol}`);
  out.push(`  Families: ${JSON.stringify(families)}`);
  out.push(`  Websites: ${JSON.stringify(websites)}`);
}

console.log(out.join("\n"));
