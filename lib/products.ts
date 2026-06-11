import { supabase } from "@/lib/supabase";
import { getCached, setCached } from "@/lib/queryCache";

const ALL_PRODUCTS_KEY = "all_products";

function normalizeModel(s: string): string {
  return s.replace(/\s+/g, "+").trim().toUpperCase();
}

export async function getAllProducts(): Promise<any[]> {
  const cached = getCached<any[]>(ALL_PRODUCTS_KEY);
  if (cached !== null) return cached;

  const { data, error } = await supabase
    .from("product")
    .select("*")
    .order("model");

  if (error) {
    console.error("getAllProducts error:", error);
    return [];
  }

  const result = data || [];
  if (result.length > 0) setCached(ALL_PRODUCTS_KEY, result);
  return result;
}

export async function getProduct(model?: string): Promise<any> {
  if (!model) return null;

  const all = await getAllProducts();
  const normalized = normalizeModel(model);
  return all.find((p: any) => normalizeModel(p.model || "") === normalized) || null;
}

export async function getFamilyProducts(family?: string): Promise<any[]> {
  if (!family) return [];

  const all = await getAllProducts();
  return all.filter((p: any) => p.family === family).sort((a: any, b: any) => (a.model || "").localeCompare(b.model || ""));
}

export async function getCategoryFamilies(category?: string): Promise<any[]> {
  if (!category) return [];

  const all = await getAllProducts();
  return all.filter((p: any) => p.category === category);
}

export async function getAllProductsForCatalog(): Promise<any[]> {
  return getAllProducts();
}
