import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } =
    await supabase
      .from("ledlum_products")
      .select("*");

  return NextResponse.json({
    success: !error,
    count: data?.length ?? 0,
    collections: data ? [...new Set(data.map(p => p.collection))] : [],
    sample: data?.[0] || null,
    error,
  });
}