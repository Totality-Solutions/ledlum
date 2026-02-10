import Link from "next/link";
import { getAllPosts, type PostMeta } from "@/lib/content/posts";

export const metadata = {
  title: "Blog",
};

export default async function BlogIndexPage() {
  const posts: PostMeta[] = await getAllPosts();
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Thoughts, tutorials, and updates.</p>
      </header>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="">
            <article className="space-y-2">
              <h2 className="text-xl font-medium">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-zinc-500">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
              {post.summary ? (
                <p className="text-zinc-700 dark:text-zinc-300">{post.summary}</p>
              ) : null}
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((t: string) => (
                    <span key={t} className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
