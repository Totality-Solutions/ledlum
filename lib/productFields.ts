// Editable columns of ledlum_products, shared by the admin product editor and
// its API route.

export const PRODUCT_TEXT_FIELDS = [
  { name: "model", label: "Model code" },
  { name: "family", label: "Family (groups models into one card)" },
  { name: "collection", label: "Collection slug (e.g. indoor)" },
  { name: "category", label: "Category" },
  { name: "group_name", label: "Group" },
  { name: "product_type", label: "Product type (\"New\" shows a New Launch badge)" },
  { name: "watts", label: "Watts" },
  { name: "dimensions", label: "Dimensions" },
  { name: "cutout_size", label: "Cut-out size" },
  { name: "beam_angle", label: "Beam angle" },
  { name: "ip_rating", label: "IP rating" },
  { name: "led_chip", label: "LED chip" },
  { name: "luminous", label: "Luminous" },
  { name: "cri", label: "CRI" },
] as const;

export const PRODUCT_ARRAY_FIELDS = [
  { name: "body_colors", label: "Body colours" },
  { name: "cct", label: "CCT" },
] as const;

export type ProductTextField = (typeof PRODUCT_TEXT_FIELDS)[number]["name"];
export type ProductArrayField = (typeof PRODUCT_ARRAY_FIELDS)[number]["name"];

export type ProductEditable = Record<ProductTextField, string> &
  Record<ProductArrayField, string[]> & {
    hero_description: string;
    website: boolean; // stored as 'W' / null
    extra_specs: Record<string, string>;
  };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Normalises an admin request body into a ledlum_products update.
export function parseProductInput(body: any): { row?: Record<string, unknown>; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };

  const row: Record<string, unknown> = {};
  for (const { name } of PRODUCT_TEXT_FIELDS) row[name] = str(body[name]) || null;
  for (const { name } of PRODUCT_ARRAY_FIELDS) {
    row[name] = Array.isArray(body[name]) ? body[name].map(str).filter(Boolean) : [];
  }
  row.hero_description = str(body.hero_description) || null;
  row.website = body.website ? "W" : null;

  const specs: Record<string, string> = {};
  if (body.extra_specs && typeof body.extra_specs === "object") {
    for (const [k, v] of Object.entries(body.extra_specs)) {
      if (str(k) && str(v)) specs[str(k)] = str(v);
    }
  }
  row.extra_specs = specs;

  if (!row.model) return { error: "Model code is required" };
  row.collection = String(row.collection || "indoor").toLowerCase();
  return { row };
}
