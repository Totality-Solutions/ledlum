import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/content/posts";
import { mdxOptions } from "@/lib/content/mdx";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const { content } = await compileMDX<{ [key: string]: unknown }>({
    source: post.content,
    options: mdxOptions,
  });

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{post.meta.title}</h1>
        <p className="text-sm text-zinc-500">
          {new Date(post.meta.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
        {post.meta.tags && post.meta.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {post.meta.tags.map((t: string) => (
              <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      {content}
    </article>
  );
}
