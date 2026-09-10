import { NextResponse } from "next/server";
import { fetchAllProductsFromDb } from "@/lib/productsServer";

export async function GET() {
  const products = await fetchAllProductsFromDb();
  return NextResponse.json(
    { products },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}
