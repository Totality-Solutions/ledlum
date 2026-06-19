import { supabase } from "@/lib/supabase";
import { getCached, setCached } from "@/lib/queryCache";

const ALL_PRODUCTS_KEY = "all_products";

export async function getAllProducts(): Promise<any[]> {
  const cached = getCached<any[]>(ALL_PRODUCTS_KEY);
  if (cached !== null) return cached;

  let allData: any[] = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from("ledlum_products")
      .select("*")
      .not("website", "is", null)
      .neq("website", "")
      .ilike("website", "W")
      .order("model")
      .range(from, to);

    if (error) {
      console.error("getAllProducts error:", error);
      return allData.length > 0 ? allData : [];
    }

    if (!data || data.length === 0) {
      hasMore = false;
    } else {
      allData = allData.concat(data);
      page++;
      if (data.length < pageSize) hasMore = false;
    }
  }

  if (allData.length > 0) setCached(ALL_PRODUCTS_KEY, allData);
  return allData;
}

export async function getProduct(model?: string): Promise<any> {
  if (!model) return null;

  const all = await getAllProducts();
  const normalized = model.toUpperCase().replace(/\s+/g, "+");
  return all.find((p: any) => (p.model || "").toUpperCase() === normalized) || null;
}

export async function getFamilyProducts(family?: string): Promise<any[]> {
  if (!family) return [];

  const all = await getAllProducts();
  return all
    .filter((p: any) => p.family === family)
    .sort((a: any, b: any) => (a.model || "").localeCompare(b.model || ""));
}

export async function getCategoryProducts(category?: string): Promise<any[]> {
  if (!category) return [];

  const all = await getAllProducts();
  return all.filter((p: any) => p.category === category);
}

export async function getAllProductsForCatalog(): Promise<any[]> {
  return getAllProducts();
}
