import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { CMS_DEFAULTS, type CmsKey } from "@/lib/cms/defaults";
import { revalidateCms } from "@/lib/cms/content";

type Params = { params: Promise<{ key: string }> };

function isCmsKey(key: string): key is CmsKey {
  return Object.prototype.hasOwnProperty.call(CMS_DEFAULTS, key);
}

export async function GET(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { key } = await params;
  if (!isCmsKey(key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const { data, error } = await supabaseAdmin
    .from("cms_content")
    .select("data, updated_by, updated_at")
    .eq("key", key)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: { ...CMS_DEFAULTS[key], ...(data?.data || {}) },
    isDefault: !data,
    updatedBy: data?.updated_by ?? null,
    updatedAt: data?.updated_at ?? null,
  });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { key } = await params;
  if (!isCmsKey(key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.data !== "object" || body.data === null || Array.isArray(body.data)) {
    return NextResponse.json({ error: "Body must be { data: {...} }" }, { status: 400 });
  }

  // Only keep fields the section actually has, so a stale or tampered
  // client can't stuff arbitrary keys into the row.
  const allowed = Object.keys(CMS_DEFAULTS[key]);
  const clean = Object.fromEntries(
    Object.entries(body.data as Record<string, unknown>).filter(([k]) => allowed.includes(k))
  );

  const updatedAt = new Date().toISOString();
  const { error } = await supabaseAdmin
    .from("cms_content")
    .upsert({ key, data: clean, updated_by: auth.name, updated_at: updatedAt });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCms("content");
  return NextResponse.json({ ok: true, updatedBy: auth.name, updatedAt });
}

// Reset to the built-in default content.
export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { key } = await params;
  if (!isCmsKey(key)) return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  const { error } = await supabaseAdmin.from("cms_content").delete().eq("key", key);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCms("content");
  return NextResponse.json({ ok: true, data: CMS_DEFAULTS[key] });
}
