import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { BODY_COLOR_MAP } from "../lib/productColors";

dotenv.config({ path: ".env" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EXCEL_PATH = "C:/Users/Admin/Downloads/VOLARIS_2026_Spec_Sheet_updated.xlsx";
const SHEET_NAME = "Spec Sheet";

// Body colour names from the Volaris spec sheet that aren't covered by any
// existing entry in lib/productColors.ts's BODY_COLOR_MAP (including its
// composite-name splitting on "/"). Hand-picked to look like the metal/wood
// finish they name, rather than the deterministic hash-color fallback the
// frontend would otherwise show for an unrecognized name.
const NEW_VOLARIS_COLORS: Record<string, string> = {
  "black copper":  "#3B2A22",
  "coffee silver": "#ABA199",
  "darkwood":      "#4A3222",
  "greywood":      "#8B8175",
  "gunmetal":      "#2A3439",
  "sand gold":     "#C9A96E",
  "satin nickel":  "#CBC9C3",
  "smokey grey":   "#6E6862",
};

function slugify(name: string): string {
  return name.toLowerCase().trim();
}

function toDisplayName(slug: string): string {
  return slug.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Same composite-splitting rule used by lookupHex() in lib/productColors.ts,
// so we can tell whether a raw excel value like "Antique Brass/Satin Nickel"
// is already resolvable from atomic entries, or needs one of its own.
function isResolvable(name: string, known: Set<string>): boolean {
  const lower = slugify(name);
  if (known.has(lower)) return true;
  const parts = lower.split(/\/|\+| & | with /).map((p) => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    if (parts.some((p) => known.has(p))) return true;
    if (parts.some((p) => [...known].some((k) => p.includes(k)))) return true;
  }
  return false;
}

function readVolarisBodyColors(): string[] {
  const workbook = XLSX.readFile(EXCEL_PATH);
  // Same layout as scripts/import-volaris.ts: header row is index 3.
  const sheetRows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[SHEET_NAME], { range: 3, defval: null });
  const set = new Set<string>();
  for (const row of sheetRows) {
    const raw = row["Body Colour"];
    if (!raw) continue;
    String(raw).split(",").map((v: string) => v.trim()).filter(Boolean).forEach((v: string) => set.add(v));
  }
  return [...set];
}

async function main() {
  console.log("=== Body Colors Seeder ===\n");

  const entries = new Map<string, string>(); // slug -> hex
  for (const [name, hex] of Object.entries(BODY_COLOR_MAP)) {
    entries.set(slugify(name), hex);
  }
  for (const [name, hex] of Object.entries(NEW_VOLARIS_COLORS)) {
    entries.set(slugify(name), hex);
  }

  console.log(`Known colors before excel pass: ${entries.size}`);

  console.log("\nReading Volaris body colours from excel...");
  const volarisColors = readVolarisBodyColors();
  console.log(`Found ${volarisColors.length} distinct raw values in "Body Colour" column.`);

  const known = new Set(entries.keys());
  const unresolved: string[] = [];
  for (const raw of volarisColors) {
    if (!isResolvable(raw, known)) unresolved.push(raw);
  }

  if (unresolved.length > 0) {
    console.log(`\nWARNING: ${unresolved.length} excel color(s) still unresolved after NEW_VOLARIS_COLORS — add them and re-run:`);
    unresolved.forEach((u) => console.log(`  - "${u}"`));
    process.exitCode = 1;
  } else {
    console.log("\nEvery Volaris body colour resolves to a known atomic color entry.");
  }

  const rows = [...entries.entries()].map(([slug, hex_code]) => ({
    name: toDisplayName(slug),
    slug,
    hex_code,
  }));

  console.log(`\nUpserting ${rows.length} colors to Supabase "body_colors" table...`);
  const { error } = await supabase.from("body_colors").upsert(rows, { onConflict: "slug" });
  if (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }

  console.log(`Done. ${rows.length} colors upserted.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
