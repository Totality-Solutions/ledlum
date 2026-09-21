import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getCached, setCached } from "@/lib/queryCache";

const BODY_COLORS_KEY = "all_body_colors";
const BODY_COLORS_TTL = 30 * 60 * 1000; // colors change far less often than products

// Server-only: the actual Supabase query, behind the shared in-process cache.
// Only ever called from app/api/body-colors/route.ts — never import this into
// a "use client" component, same reasoning as lib/productsServer.ts.
export async function fetchAllBodyColorsFromDb(): Promise<
  { name: string; slug: string; hex_code: string }[]
> {
  const cached = getCached<{ name: string; slug: string; hex_code: string }[]>(BODY_COLORS_KEY);
  if (cached !== null) return cached;

  const { data, error } = await supabaseAdmin
    .from("body_colors")
    .select("name, slug, hex_code")
    .order("name");

  if (error) {
    console.error("fetchAllBodyColorsFromDb error:", error);
    return [];
  }

  const colors = data || [];
  if (colors.length > 0) setCached(BODY_COLORS_KEY, colors, BODY_COLORS_TTL);
  return colors;
}
