const BODY_COLOR_MAP: Record<string, string> = {
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
  "anthracite":       "#383838",

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
  "brushed nickel":   "#B0B0B0",
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
  "wood":             "#8B6914",
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

  // RAL
  "ral 9005":         "#1A1A1A",
  "ral 9003":         "#F4F4F4",
  "ral 9010":         "#FAFAFA",
  "ral 9016":         "#F6F6F6",
  "ral 7016":         "#3E4846",
  "ral 7035":         "#B5B5B0",
  "ral 1013":         "#E6D2B5",
  "ral 1021":         "#E7D9A0",
  "ral 3005":         "#5E2028",
  "ral 5015":         "#2E6B9E",
  "ral 6005":         "#0F4337",
  "ral 9006":         "#A5A8A6",
  "ral 9007":         "#87817B",
  "ral 7022":         "#464543",
  "ral 7021":         "#323336",
  "ral 9001":         "#F4F0E8",
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

export function bodyColorToHex(colorName: string): string {
  const lower = colorName.toLowerCase().trim();
  if (BODY_COLOR_MAP[lower]) return BODY_COLOR_MAP[lower];

  if (lower.startsWith("ral ")) {
    const ralMatch = BODY_COLOR_MAP[lower];
    if (ralMatch) return ralMatch;
  }

  // Handle composite colors: "White/Black", "Matt White / Dark Grey", etc.
  const parts = lower.split(/\/|\+| & | with /).map(p => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    for (const part of parts) {
      if (BODY_COLOR_MAP[part]) return BODY_COLOR_MAP[part];
    }
    // Try matching partial names (e.g. "black with black reflector" → "black")
    for (const part of parts) {
      for (const [key, hex] of Object.entries(BODY_COLOR_MAP)) {
        if (part.includes(key)) return hex;
      }
    }
  }

  if (/^#[0-9a-f]{3,8}$/.test(lower)) return lower;

  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = lower.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 35%, 45%)`;
}
