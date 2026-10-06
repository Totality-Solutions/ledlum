import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { revalidateCms } from "@/lib/cms/content";
import { parsePostInput } from "@/lib/cms/posts";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { data, error } = await supabaseAdmin.from("cms_posts").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { post, error: inputError } = parsePostInput(await request.json().catch(() => null));
  if (!post) return NextResponse.json({ error: inputError }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("cms_posts")
    .update({ ...post, updated_by: auth.name, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) {
    const message = error.code === "23505" ? "Another post already uses this slug" : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (!data) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  revalidateCms("posts");
  return NextResponse.json({ post: data });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { error } = await supabaseAdmin.from("cms_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateCms("posts");
  return NextResponse.json({ ok: true });
}
