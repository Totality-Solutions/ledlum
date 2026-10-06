// Shared (client + server) shape of a blog post as the admin editor sends it.

// Blocks of the article body (stored in cms_posts.outcome_sections). Rows
// saved before block types existed have no `type` — those are text blocks.
export type ArticleBlock =
  | { type: "text"; heading: string; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; image: string; caption: string }
  | { type: "link"; label: string; url: string };

export type ArticleBlockType = ArticleBlock["type"];

export function emptyBlock(type: ArticleBlockType): ArticleBlock {
  switch (type) {
    case "heading":
      return { type, text: "" };
    case "image":
      return { type, image: "", caption: "" };
    case "link":
      return { type, label: "", url: "" };
    default:
      return { type: "text", heading: "", text: "" };
  }
}

// Coerces a stored/submitted block into a clean ArticleBlock, or null if it's
// empty (so blank blocks never end up on the site).
export function normalizeBlock(raw: any): ArticleBlock | null {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  switch (raw?.type) {
    case "heading":
      return s(raw.text) ? { type: "heading", text: s(raw.text) } : null;
    case "image":
      return s(raw.image) ? { type: "image", image: s(raw.image), caption: s(raw.caption) } : null;
    case "link":
      return s(raw.url) ? { type: "link", url: s(raw.url), label: s(raw.label) || s(raw.url) } : null;
    default: {
      const heading = s(raw?.heading);
      const text = s(raw?.text);
      return heading || text ? { type: "text", heading, text } : null;
    }
  }
}

export function normalizeBlocks(raw: unknown): ArticleBlock[] {
  return Array.isArray(raw) ? raw.map(normalizeBlock).filter((b): b is ArticleBlock => b !== null) : [];
}

export type PostInput = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  mid_section_title: string;
  paragraphs: string[];
  mid_section_image: string;
  outcome_sections: ArticleBlock[];
  date: string; // YYYY-MM-DD
  is_featured: boolean;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
};

export const EMPTY_POST: PostInput = {
  slug: "",
  title: "",
  category: "",
  description: "",
  image: "",
  mid_section_title: "",
  paragraphs: [""],
  mid_section_image: "",
  outcome_sections: [],
  date: new Date().toISOString().slice(0, 10),
  is_featured: false,
  status: "draft",
  seo_title: "",
  seo_description: "",
};

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Validates and normalises a post body from the admin editor.
export function parsePostInput(body: any): { post?: PostInput; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid body" };

  const title = str(body.title);
  const slug = slugify(str(body.slug) || title);
  if (!title) return { error: "Title is required" };
  if (!slug) return { error: "Slug is required" };

  const date = str(body.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Date must be YYYY-MM-DD" };

  const status = body.status === "published" ? "published" : "draft";

  const paragraphs = Array.isArray(body.paragraphs)
    ? body.paragraphs.map(str).filter(Boolean)
    : [];

  const outcome_sections = normalizeBlocks(body.outcome_sections);

  return {
    post: {
      slug,
      title,
      category: str(body.category),
      description: str(body.description),
      image: str(body.image),
      mid_section_title: str(body.mid_section_title),
      paragraphs,
      mid_section_image: str(body.mid_section_image),
      outcome_sections,
      date,
      is_featured: Boolean(body.is_featured),
      status,
      seo_title: str(body.seo_title),
      seo_description: str(body.seo_description),
    },
  };
}
