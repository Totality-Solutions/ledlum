import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCached, setCached } from "@/lib/queryCache";

const ALL_PRODUCTS_KEY = "all_products";

// Server-only: the actual Supabase query, behind the shared in-process cache.
// Only ever called from app/api/products/route.ts — never import this into a
// "use client" component, or you're back to one full-catalog query per
// browser tab instead of one per 5-minute window for the whole site.
export async function fetchAllProductsFromDb(): Promise<any[]> {
  const cached = getCached<any[]>(ALL_PRODUCTS_KEY);
  if (cached !== null) return cached;

  let allData: any[] = [];
  let page = 0;
  const pageSize = 1000;
  let hasMore = true;

  while (hasMore) {
    const from = page * pageSize;
    const to = from + pageSize - 1;

    // Plain equality, not ilike — every row's website column is either
    // exactly 'W' or null (verified against live data), never a case
    // variant, so this doesn't need pattern matching. Matters beyond style:
    // it's what lets the partial index in migration 004 satisfy this
    // query's filter AND its ORDER BY in a single index scan.
    const { data, error } = await supabaseAdmin
      .from("ledlum_products")
      .select("*")
      .eq("website", "W")
      .order("model")
      .range(from, to);

    if (error) {
      console.error("fetchAllProductsFromDb error:", error);
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
