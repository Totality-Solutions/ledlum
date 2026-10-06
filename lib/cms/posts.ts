// Shared (client + server) shape of a blog post as the admin editor sends it.

export type PostInput = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  mid_section_title: string;
  paragraphs: string[];
  mid_section_image: string;
  outcome_sections: { heading: string; text: string }[];
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

  const outcome_sections = Array.isArray(body.outcome_sections)
    ? body.outcome_sections
        .map((s: any) => ({ heading: str(s?.heading), text: str(s?.text) }))
        .filter((s: { heading: string; text: string }) => s.heading || s.text)
    : [];

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
