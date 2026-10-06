"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, Notice, PageHeader, formatDateTime } from "@/components/admin/ui";

type PostSummary = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  image: string | null;
  date: string;
  status: "draft" | "published";
  is_featured: boolean;
  updated_by: string | null;
  updated_at: string | null;
};

export default function AdminBlogList() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const importLegacy = async () => {
    setImporting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts/import", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  const visible = (posts || []).filter((p) => filter === "all" || p.status === filter);

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <PageHeader
        title="Blog posts"
        description="Drafts are only visible here. Published posts appear on /blog and the home page carousel."
        actions={
          <Link href="/admin/blog/new">
            <Button>+ New post</Button>
          </Link>
        }
      />

      {error && <div className="mb-4"><Notice tone="error">{error}</Notice></div>}

      {posts && posts.length === 0 && (
        <Card className="p-5 mb-6">
          <p className="text-sm text-neutral-300">
            No posts in the CMS yet. The website is currently showing the posts that were built into the code.
          </p>
          <Button className="mt-3" onClick={importLegacy} disabled={importing}>
            {importing ? "Importing…" : "Import existing posts"}
          </Button>
        </Card>
      )}

      {posts && posts.length > 0 && (
        <>
          <div className="flex gap-2 mb-4">
            {(["all", "published", "draft"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1 rounded-full border capitalize ${
                  filter === f ? "bg-white text-black border-white" : "border-neutral-700 text-neutral-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Card className="divide-y divide-neutral-800">
            {visible.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="flex items-center gap-4 p-3 hover:bg-neutral-900"
              >
                <div className="w-16 h-12 rounded bg-neutral-800 overflow-hidden shrink-0">
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-neutral-500 truncate">
                    {post.date} · {post.category || "Uncategorised"}
                    {post.updated_by ? ` · edited ${formatDateTime(post.updated_at)} by ${post.updated_by}` : ""}
                  </p>
                </div>
                {post.is_featured && <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Featured</span>}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wide ${
                    post.status === "published" ? "bg-emerald-900/60 text-emerald-300" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {post.status}
                </span>
              </Link>
            ))}
            {visible.length === 0 && <p className="p-4 text-sm text-neutral-500">No posts.</p>}
          </Card>
        </>
      )}

      {!posts && !error && <p className="text-sm text-neutral-500">Loading…</p>}
    </div>
  );
}
