import { blogPosts } from "@/lib/blogData";
import BlogContent from '@/components/sections/blog/BlogContent';
import { Suspense } from 'react';

export default async function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogContent initialPosts={blogPosts} />
    </Suspense>
  );
}
