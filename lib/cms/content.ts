import "server-only";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { blogPosts as legacyBlogPosts, type Post } from "@/lib/blogData";
import { CMS_DEFAULTS, type CmsKey, type CmsContent } from "./defaults";

// Public-site reads of CMS content. Everything goes through unstable_cache,
// so visitors are served cached data and Supabase is only hit again after an
// admin saves (revalidateCms below) — editing content never makes page views
// slower or adds database load per visitor.

const CONTENT_TAG = "cms";
const POSTS_TAG = "cms:posts";
const SAFETY_REVALIDATE_SECONDS = 3600;

// Throws on a DB error so unstable_cache doesn't cache the failure; callers
// catch and fall back to defaults.
const readContentRow = unstable_cache(
  async (key: string): Promise<Record<string, unknown> | null> => {
    const { data, error } = await supabaseAdmin
      .from("cms_content")
      .select("data")
      .eq("key", key)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data?.data as Record<string, unknown>) ?? null;
  },
  ["cms-content"],
  { tags: [CONTENT_TAG], revalidate: SAFETY_REVALIDATE_SECONDS }
);

export async function getContent<K extends CmsKey>(key: K): Promise<CmsContent<K>> {
  const defaults = CMS_DEFAULTS[key];
  try {
    const stored = await readContentRow(key);
    if (!stored) return defaults;
    // Shallow merge: a field added to the defaults later still gets a value
    // on rows saved before it existed.
    return { ...defaults, ...stored } as CmsContent<K>;
  } catch (err) {
    console.error(`getContent(${key}) failed, using defaults:`, err);
    return defaults;
  }
}

export async function getContents<K extends CmsKey>(
  keys: readonly K[]
): Promise<{ [P in K]: CmsContent<P> }> {
  const values = await Promise.all(keys.map((k) => getContent(k)));
  return Object.fromEntries(keys.map((k, i) => [k, values[i]])) as unknown as { [P in K]: CmsContent<P> };
}

// ---------------- Blog posts ----------------

export type CmsPostRow = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  description: string | null;
  image: string | null;
  mid_section_title: string | null;
  paragraphs: string[] | null;
  mid_section_image: string | null;
  outcome_sections: { heading?: string; text: string }[] | null;
  date: string;
  is_featured: boolean;
  status: "draft" | "published";
  seo_title: string | null;
  seo_description: string | null;
  updated_by?: string | null;
  updated_at?: string | null;
};

export type PublicPost = Post & { seoTitle?: string; seoDescription?: string };

export function rowToPost(row: CmsPostRow): PublicPost {
  return {
    slug: row.slug,
    category: row.category || "",
    title: row.title,
    description: row.description || "",
    image: row.image || "",
    midSectionTitle: row.mid_section_title || "",
    paragraph: row.paragraphs || [],
    midSectionImage: row.mid_section_image || "",
    outcomeSections: row.outcome_sections || [],
    date: row.date,
    isFeatured: row.is_featured,
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
  };
}

const readPublishedPosts = unstable_cache(
  async (): Promise<PublicPost[]> => {
    const { data, error } = await supabaseAdmin
      .from("cms_posts")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false })
      .order("id", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as CmsPostRow[]).map(rowToPost);
  },
  ["cms-posts"],
  { tags: [POSTS_TAG], revalidate: SAFETY_REVALIDATE_SECONDS }
);

// Falls back to the old hardcoded posts only if the cms_posts table isn't
// there yet (migration not run), so deploying this before the migration
// doesn't empty the blog.
export async function getPublishedPosts(): Promise<PublicPost[]> {
  try {
    return await readPublishedPosts();
  } catch (err) {
    console.error("getPublishedPosts failed, using legacy blogData:", err);
    return legacyBlogPosts;
  }
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

// ---------------- Invalidation (admin saves) ----------------

// Called from admin route handlers after a write. expire: 0 makes the next
// visit fetch fresh data (rather than serving one more stale copy), so the
// editor sees their change straight away; revalidatePath drops the
// prerendered HTML of every page so static pages pick it up too.
export function revalidateCms(scope: "content" | "posts") {
  revalidateTag(scope === "posts" ? POSTS_TAG : CONTENT_TAG, { expire: 0 });
  revalidatePath("/", "layout");
}
