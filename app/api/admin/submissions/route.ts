import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";

const PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const sp = request.nextUrl.searchParams;
  const type = sp.get("type");
  const status = sp.get("status");
  const page = Math.max(1, Number(sp.get("page")) || 1);

  let query = supabaseAdmin
    .from("form_submissions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (type && ["contact", "quote", "lead"].includes(type)) query = query.eq("type", type);
  if (status && ["new", "read", "archived"].includes(status)) {
    query = query.eq("status", status);
  } else {
    query = query.neq("status", "archived");
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions: data, total: count ?? 0, pageSize: PAGE_SIZE });
}
