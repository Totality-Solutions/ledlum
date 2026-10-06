import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminSession";
import { revalidateCms } from "@/lib/cms/content";
import { invalidateProductCache } from "@/lib/productsServer";

// "Refresh" button in the admin header: drops every cached copy of CMS
// content, blog posts and the product catalog, so the public site rebuilds
// from the database on the next visit.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  revalidateCms("content");
  revalidateCms("posts");
  invalidateProductCache();

  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString() });
}
