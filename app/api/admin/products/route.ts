import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim() || "";

  let query = supabaseAdmin
    .from("ledlum_products")
    .select("id, model, collection, category, group_name, hero_image, gallery_images")
    .order("model", { ascending: true })
    .limit(30);

  if (search) {
    query = query.ilike("model", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: data });
}
