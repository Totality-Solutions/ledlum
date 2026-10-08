import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { invalidateProductCache } from "@/lib/productsServer";
import { parseProductInput } from "@/lib/productFields";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { data, error } = await supabaseAdmin.from("ledlum_products").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  // Dealer prices live in their own private table (migration 009) so they
  // never reach the public site; admins see them read-only here. A missing
  // table/row just means no prices, not an error.
  const { data: priceRow } = await supabaseAdmin
    .from("ledlum_product_prices")
    .select("prices")
    .eq("model", data.model)
    .maybeSingle();

  return NextResponse.json({ product: data, dealerPrices: priceRow?.prices ?? {} });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { row, error: inputError } = parseProductInput(await request.json().catch(() => null));
  if (!row) return NextResponse.json({ error: inputError }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("ledlum_products")
    .update(row)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) {
    const message = error.code === "23505" ? "Another product already uses this model code" : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (!data) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  invalidateProductCache();
  return NextResponse.json({ product: data });
}

// Deleting removes the row only; its images stay in R2.
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { error } = await supabaseAdmin.from("ledlum_products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  invalidateProductCache();
  return NextResponse.json({ ok: true });
}
