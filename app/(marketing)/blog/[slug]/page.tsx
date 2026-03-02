


import React from 'react';
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blogData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get 6 suggestions, excluding the current post
  const latestInsights = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  return (
    <div className="relative min-h-screen text-white bg-black selection:bg-[#AD9463] selection:text-black font-bai overflow-x-hidden">

      {/* 1. GLOBAL BACKGROUND LAYER - Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2 opacity-10 md:opacity-30">
        <Image
          src="/images/about/ledlumline.png"
          alt="background texture"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* --- BACK BUTTON --- */}
      {/* Reduced z-index to z-30 so it sits under the Header (usually z-50) and Hamburger menu */}
      <div className="absolute top-[20px] md:top-[130px] left-1 md:left-12 lg:left-16 z-30 pointer-events-none font-pop">
        <Link
          href="/blog"
          className="pointer-events-auto group flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
        >
          <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest pr-1">Back</span>
        </Link>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="w-full pt-[80px] md:pt-[90px] relative">
        <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden">
          <Image
            src={post.image}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            alt={post.title}
          />
        </div>
      </section>

      <main className="w-full mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <article className="pt-16 md:pt-32">

          <header className="max-w-4xl mb-16 md:mb-24">
            <h1 className="desk-h1 !text-[2.5rem] md:!text-[var(--text-desk-h1)] leading-[1.1] mb-8 md:mb-12 capitalize">
              {post.title}
            </h1>
            <p className="body !text-[1rem] md:!text-[var(--text-body)] text-zinc-400 max-w-2xl leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* --- METADATA GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-16 md:pb-24 mb-16 border-b border-white/5">
            <div>
              <h5 className="button-xs text-[#ffffff] font-bold mb-3 md:mb-4 capitalize opacity-50">Category</h5>
              <p className="body-xs !text-[0.85rem] md:!text-[var(--text-body-xs)] text-zinc-300">{post.category}</p>
            </div>
            <div>
              <h5 className="button-xs text-[#ffffff] font-bold mb-3 md:mb-4 capitalize opacity-50">Date Published</h5>
              <p className="body-xs !text-[0.85rem] md:!text-[var(--text-body-xs)] text-zinc-300">{post.date}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="button-xs text-[#ffffff] font-bold mb-3 md:mb-4 capitalize opacity-50">Expertise</h5>
              <p className="body-xs !text-[0.85rem] md:!text-[var(--text-body-xs)] text-zinc-300">Technical & Aesthetic Design</p>
            </div>
          </div>

          {/* --- DYNAMIC MIDDLE SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center mb-24 md:mb-40">
            <div className="space-y-8 md:space-y-10">
              <h3 className="desk-h3 !text-[1.75rem] md:!text-[var(--text-desk-h3)] tracking-tight leading-tight capitalize">
                {post.midSectionTitle}
              </h3>
              <ul className="space-y-4 md:space-y-5">
                {post.midSectionList.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 body-xs !text-[0.9rem] md:!text-[var(--text-body-xs)] text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD9463] mt-2 shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl rounded-sm">
              <Image
                src={post.midSectionImage}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                alt="Detail View"
              />
            </div>
          </div>

          {/* --- DYNAMIC OUTCOME SECTION --- */}
          <div className="space-y-12 md:space-y-16 pb-24 md:pb-32">
            <div className="max-w-4xl space-y-6">
              <h5 className="button-xs text-zinc-500 capitalize tracking-widest font-bold">The Outcome</h5>
              <p className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] font-light leading-snug text-zinc-300">
                {post.outcomeDescription}
              </p>
            </div>
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 border border-white/5 rounded-sm">
              <Image
                src={post.outcomeImage}
                fill
                sizes="100vw"
                className="object-cover"
                alt="Project Result"
              />
            </div>
          </div>
        </article>

        {/* --- LATEST INSIGHTS SECTION --- */}
        <section className="pt-20 md:pt-24 pb-32 md:pb-48 border-t border-white/10">
          <h2 className="desk-h3 !text-[1.75rem] md:!text-[var(--text-desk-h3)] capitalize mb-12 md:mb-16">
            Latest insights & innovations.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
            {latestInsights.map((insight) => (
              <Link key={insight.slug} href={`/blog/${insight.slug}`}>
                <BlogCard
                  category={insight.category}
                  description={insight.description}
                  image={insight.image}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}