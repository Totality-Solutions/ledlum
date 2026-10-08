import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Copies the posts that used to be hardcoded in lib/blogData.ts into the CMS
// (cms_posts table) as published posts. Same logic as Admin → Blog posts →
// "Import existing posts" (app/api/admin/posts/import/route.ts). Existing
// slugs are skipped, so it's safe to run more than once.
//
//   npx tsx scripts/import-blog-posts.ts

dotenv.config({ path: ".env", quiet: true });

async function main() {
  // Imported after dotenv so cdnImg() inside blogData sees NEXT_PUBLIC_CDN_URL.
  const { blogPosts } = await import("../lib/blogData");
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: existing, error: readError } = await supabase.from("cms_posts").select("slug");
  if (readError) throw readError;
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
      updated_by: "Import",
    }));

  if (rows.length > 0) {
    const { error } = await supabase.from("cms_posts").insert(rows);
    if (error) throw error;
  }

  console.log(`Imported ${rows.length}, skipped ${blogPosts.length - rows.length} (already in the CMS).`);
  for (const r of rows) console.log(`  ${r.date}  ${r.slug}`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
