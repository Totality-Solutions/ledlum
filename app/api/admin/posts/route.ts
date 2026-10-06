import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { revalidateCms } from "@/lib/cms/content";
import { parsePostInput } from "@/lib/cms/posts";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from("cms_posts")
    .select("id, slug, title, category, image, date, status, is_featured, updated_by, updated_at")
    .order("date", { ascending: false })
    .order("id", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { post, error: inputError } = parsePostInput(await request.json().catch(() => null));
  if (!post) return NextResponse.json({ error: inputError }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("cms_posts")
    .insert({ ...post, updated_by: auth.name, updated_at: new Date().toISOString() })
    .select("*")
    .single();
  if (error) {
    const message = error.code === "23505" ? "Another post already uses this slug" : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  revalidateCms("posts");
  return NextResponse.json({ post: data });
}
