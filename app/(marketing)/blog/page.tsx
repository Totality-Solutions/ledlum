import BlogContent from '@/components/sections/blog/BlogContent';
import { Suspense } from 'react';
import { getContents, getPublishedPosts } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata() {
  return buildCmsMetadata("blog", { title: "Blog", canonical: "/blog" });
}

export default async function BlogPage() {
  const [posts, content] = await Promise.all([
    getPublishedPosts(),
    getContents(["blog.page", "getInTouch"] as const),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogContent initialPosts={posts} page={content["blog.page"]} getInTouch={content.getInTouch} />
    </Suspense>
  );
}
