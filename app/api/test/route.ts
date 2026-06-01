import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } =
    await supabase
      .from("products")
      .select("*");

  return NextResponse.json({
    success: !error,
    count: data?.length ?? 0,
    error,
  });
}