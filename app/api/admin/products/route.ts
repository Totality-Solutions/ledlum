import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { invalidateProductCache } from "@/lib/productsServer";
import { parseProductInput } from "@/lib/productFields";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const search = request.nextUrl.searchParams.get("search")?.trim() || "";

  let query = supabaseAdmin
    .from("ledlum_products")
    .select("id, model, collection, category, group_name, hero_image, gallery_images, website")
    .order("model", { ascending: true })
    .limit(30);

  if (search) {
    query = query.ilike("model", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: data });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { row, error: inputError } = parseProductInput(await request.json().catch(() => null));
  if (!row) return NextResponse.json({ error: inputError }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("ledlum_products").insert(row).select("*").single();
  if (error) {
    const message = error.code === "23505" ? "Another product already uses this model code" : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  invalidateProductCache();
  return NextResponse.json({ product: data });
}
