import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  date: string; // ISO string
  summary?: string;
  tags?: string[];
  cover?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = {
  meta: PostMeta;
  content: string; // raw MDX content without frontmatter
};

export async function getAllSlugs(): Promise<string[]> {
  await ensureDir();
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const full = path.join(BLOG_DIR, `${slug}.mdx`);
    const file = await fs.readFile(full, "utf8");
    const { data, content } = matter(file);
    const fm = normalizeFrontmatter(data, slug);
    return { meta: fm, content };
  } catch (e) {
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const p = await getPostBySlug(slug);
      return p?.meta ?? null;
    })
  );
  return posts
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllTags(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const map: Record<string, number> = {};
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      map[t] = (map[t] ?? 0) + 1;
    }
  }
  return map;
}

function normalizeFrontmatter(data: any, slug: string): PostMeta {
  const title = String(data.title ?? slug);
  const date = new Date(data.date ?? Date.now()).toISOString();
  const summary = data.summary ? String(data.summary) : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;
  const cover = data.cover ? String(data.cover) : undefined;
  return { title, date, summary, tags, cover, slug };
}

async function ensureDir() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true });
  } catch {}
}
