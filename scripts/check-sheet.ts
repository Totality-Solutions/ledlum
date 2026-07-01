import * as XLSX from "xlsx";

const wb = XLSX.readFile("./Indoor_Products.xlsx");
const sheet = wb.Sheets["24V NEON STRIP LIGHTS IP67"];
const rows: any[] = XLSX.utils.sheet_to_json(sheet);

console.log("All columns:", Object.keys(rows[0] || {}));
console.log("\nAll rows with Website values:");
rows.forEach((r) => {
  console.log(`  ${r["Item Number"]} | Website: ${r["Website"] === undefined ? "UNDEFINED" : JSON.stringify(r["Website"])} | FAMILY: ${r["FAMILY"]}`);
});
