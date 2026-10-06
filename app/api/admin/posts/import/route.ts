import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { revalidateCms } from "@/lib/cms/content";
import { blogPosts } from "@/lib/blogData";

// One-time import of the posts that used to be hardcoded in lib/blogData.ts.
// Existing slugs are skipped, so running it twice is harmless.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { data: existing, error: readError } = await supabaseAdmin.from("cms_posts").select("slug");
  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });
  const taken = new Set((existing || []).map((r) => r.slug));

  const rows = blogPosts
    .filter((p) => !taken.has(p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      mid_section_title: p.midSectionTitle,
      paragraphs: p.paragraph,
      mid_section_image: p.midSectionImage,
      outcome_sections: p.outcomeSections,
      date: p.date,
      is_featured: Boolean(p.isFeatured),
      status: "published",
      updated_by: auth.name,
    }));

  if (rows.length > 0) {
    const { error } = await supabaseAdmin.from("cms_posts").insert(rows);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidateCms("posts");
  }

  return NextResponse.json({ imported: rows.length, skipped: blogPosts.length - rows.length });
}
