import { NextRequest, NextResponse } from "next/server";
import { fetchAllProductsFromDb } from "@/lib/productsServer";

// Filtering happens here, after the (cached) full catalog is already in
// memory — so a scoped request (one collection, one family, one category)
// costs zero extra Supabase load, it just trims what gets sent to the
// browser instead of shipping the whole ~1.7MB catalog for every page view.
export async function GET(request: NextRequest) {
  const products = await fetchAllProductsFromDb();
  const { searchParams } = request.nextUrl;

  const model = searchParams.get("model");
  const family = searchParams.get("family");
  const category = searchParams.get("category");
  const groupName = searchParams.get("groupName");
  const collection = searchParams.get("collection");

  let result = products;

  if (model) {
    const normalized = model.toUpperCase().replace(/\s+/g, "+");
    result = result.filter((p) => (p.model || "").toUpperCase() === normalized);
  }
  if (family) result = result.filter((p) => p.family === family);
  if (category) result = result.filter((p) => p.category === category);
  if (groupName) result = result.filter((p) => p.group_name === groupName);
  if (collection) result = result.filter((p) => p.collection === collection);

  return NextResponse.json(
    { products: result },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}
