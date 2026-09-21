import { NextResponse } from "next/server";
import { fetchAllBodyColorsFromDb } from "@/lib/bodyColorsServer";

export async function GET() {
  const colors = await fetchAllBodyColorsFromDb();

  return NextResponse.json(
    { colors },
    { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } }
  );
}
