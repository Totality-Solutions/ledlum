export const BODY_COLOR_MAP: Record<string, string> = {
  // Black & White
  "black":            "#1A1A1A",
  "white":            "#F5F5F5",
  "matt black":       "#282828",
  "matt white":       "#F0F0F0",
  "matte black":      "#282828",
  "mat black":        "#282828",
  "soft touch black": "#1E1E1E",
  "mattblack":        "#282828",
  "black body":       "#1A1A1A",
  "sand black":       "#3C3733",
  "sand white":       "#E8DEC9",
  "graphite black":   "#2D2D2D",
  "anthracite":       "#383E42",

  // Grey
  "grey":             "#808080",
  "gray":             "#808080",
  "dark grey":        "#4A4A4A",
  "dark gray":        "#4A4A4A",
  "drak grey":        "#4A4A4A",
  "light grey":       "#B0B0B0",
  "light gray":       "#B0B0B0",
  "silver grey":      "#A8A9AD",
  "premium grey":     "#808080",
  "sand grey":        "#C4BBAF",
  "silver":           "#C0C0C0",
  "satin":            "#C8C8C8",
  "satin black":      "#2A2A2A",

  // Warm tones
  "gold":             "#D4AF37",
  "brushed gold":     "#C5A55A",
  "matt gold":        "#C5A55A",
  "rose gold":        "#B76E79",
  "bronze":           "#CD7F32",
  "copper":           "#B87333",
  "brass":            "#B5A642",
  "antique brass":    "#C88A65",
  "red bronze":       "#A0522D",
  "orange":           "#FF7D33",
  "light coffee":     "#C4A882",

  // Chrome & metallic
  "chrome":           "#DBE4EB",
  "black chrome":     "#1E1E1E",
  "brushed nickel":   "#B7B4AC",
  "brushed chrome":   "#C8C8C8",
  "gun black":        "#2D2D2D",
  "s.s":              "#C8C8C8",
  "stainless steel":  "#C8C8C8",
  "stainless steel 304": "#C0C0C0",
  "stainless steel 316": "#B8B8B8",

  // Natural / Organic
  "natural aluminium":"#A8A9AD",
  "natural aluminum": "#A8A9AD",
  "anodised aluminium":"#8C8C8C",
  "anodized aluminum": "#8C8C8C",
  "wood":             "#8B5A2B",
  "oak":              "#C4A35A",
  "walnut":           "#5C4033",
  "beige":            "#F5F5DC",
  "ivory":            "#FFFFF0",
  "cream":            "#FFFDD0",
  "brown":            "#6B3A2A",
  "dark brown":       "#3E2723",
  "red":              "#CC2936",

  // Specialty
  "all black":        "#1A1A1A",
  "all gold":         "#D4AF37",
  "gold marble":      "#D4AF37",
  "print ball":       "#CFB095",
  "white warm":       "#FAF0E1",

  // RAL — hex values checked against RAL Classic reference charts, not guessed
  "ral 9005":         "#0A0A0A",
  "ral 9003":         "#ECECE7",
  "ral 9010":         "#F1ECE1",
  "ral 9016":         "#F1F1EA",
  "ral 7016":         "#383E42",
  "ral 7035":         "#C8CBC8",
  "ral 1013":         "#E3D9C7",
  "ral 1021":         "#F6B600",
  "ral 3005":         "#59191F",
  "ral 5015":         "#0B7BB0",
  "ral 6005":         "#114232",
  "ral 9006":         "#A1A1A0",
  "ral 9007":         "#868581",
  "ral 7022":         "#4C4A44",
  "ral 7021":         "#2F3234",
  "ral 9001":         "#E9E0D2",
};

function parseKelvin(value: string): number | null {
  const match = value.replace(/\s/g, "").match(/(\d+)\s*[kK]?/);
  return match ? parseInt(match[1], 10) : null;
}

function kelvinToHex(kelvin: number): string {
  const temp = kelvin / 100;
  let r: number, g: number, b: number;

  if (temp <= 66) {
    r = 255;
    g = Math.min(255, Math.max(0, 99.4708025861 * Math.log(temp) - 161.1195681661));
  } else {
    r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
    g = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
  }

  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = Math.min(255, Math.max(0, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
  }

  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function cctToColor(cctLabel: string): string {
  const kelvin = parseKelvin(cctLabel);
  if (kelvin !== null) return kelvinToHex(kelvin);

  const lower = cctLabel.toLowerCase().trim();
  if (lower.includes("warm"))   return "#FFB46B";
  if (lower.includes("neutral")) return "#FFF4E5";
  if (lower.includes("cool"))   return "#D6E4F0";
  if (lower.includes("day"))    return "#F5F5F5";

  return "#E8E0D0";
}

// Shared by the local hardcoded map and the Supabase-backed one below, so a
// composite name like "White/Black" or "Antique Brass/Satin Nickel" resolves
// against either source the same way.
function lookupHex(colorName: string, map: Record<string, string>): string | null {
  const lower = colorName.toLowerCase().trim();
  if (map[lower]) return map[lower];

  // Handle composite colors: "White/Black", "Matt White / Dark Grey", etc.
  const parts = lower.split(/\/|\+| & | with /).map(p => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    for (const part of parts) {
      if (map[part]) return map[part];
    }
    // Try matching partial names (e.g. "black with black reflector" → "black")
    for (const part of parts) {
      for (const [key, hex] of Object.entries(map)) {
        if (part.includes(key)) return hex;
      }
    }
  }

  if (/^#[0-9a-f]{3,8}$/.test(lower)) return lower;

  return null;
}

function hashToColor(colorName: string): string {
  const lower = colorName.toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = lower.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 35%, 45%)`;
}

// Local, synchronous fallback — used when the Supabase body_colors table
// hasn't loaded yet (or is unreachable) and as the last resort inside
// resolveBodyColorHex below.
export function bodyColorToHex(colorName: string): string {
  return lookupHex(colorName, BODY_COLOR_MAP) ?? hashToColor(colorName);
}

let bodyColorDbMapPromise: Promise<Record<string, string>> | null = null;

async function fetchBodyColorDbMap(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/body-colors");
    if (!res.ok) throw new Error(`/api/body-colors returned ${res.status}`);
    const { colors } = await res.json();
    const map: Record<string, string> = {};
    (colors || []).forEach((c: { slug: string; hex_code: string }) => {
      map[c.slug] = c.hex_code;
    });
    return map;
  } catch (err) {
    console.error("fetchBodyColorDbMap error:", err);
    return {};
  }
}

// Memoized for the lifetime of the tab — the color table changes rarely, so
// one fetch (itself served from the server-side cache in
// lib/bodyColorsServer.ts) is enough for the whole session.
function getBodyColorDbMap(): Promise<Record<string, string>> {
  if (!bodyColorDbMapPromise) bodyColorDbMapPromise = fetchBodyColorDbMap();
  return bodyColorDbMapPromise;
}

// DB-first color lookup: Supabase body_colors table (seeded from the excel
// body colour names via scripts/seed-body-colors.ts), then the local map,
// then a deterministic hash color as a last resort for a name nobody's seen.
export async function resolveBodyColorHex(colorName: string): Promise<string> {
  const dbMap = await getBodyColorDbMap();
  return lookupHex(colorName, dbMap) ?? bodyColorToHex(colorName);
}
