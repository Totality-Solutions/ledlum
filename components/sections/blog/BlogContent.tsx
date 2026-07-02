
"use client";

import React, { useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from "@/components/sections/blog/BlogCard";
import Pagination from '@/components/sections/blog/Pagination';
import CTABtn from '@/components/layout/common/CTABtn';
import { GetInTouch } from '@/components/layout/footer/GetInTouch';
import Section from '@/components/layout/Section';

export default function BlogContent({ initialPosts = [] }: { initialPosts?: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || "All";
  const currentPage = Number(searchParams.get('page')) || 1;
  const stayPage = Number(searchParams.get('stayPage')) || 1;

  const categories = useMemo(() => [
    "All", "Architectural lighting", "Commercial projects",
    "Residential systems", "Energy efficiency", "Product insights"
  ], []);

  const normalize = useCallback((str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, '').trim(), []);

  const handleCategoryChange = useCallback((category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    params.set('page', '1');
    params.set('stayPage', '1');
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // --- LOGIC NOW USES initialPosts ---
  const { heroPost, recentBucket, archiveBucket } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const target = normalize(activeCategory);

    // Filter by category first
    const categoryPool = target === "all"
      ? initialPosts
      : initialPosts.filter(p => p.category && normalize(p.category) === target);

    const freshFromThisMonth = categoryPool.filter(post => {
      const d = new Date(post.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const hero = freshFromThisMonth.length > 0 ? freshFromThisMonth[0] : categoryPool[0];
    const poolExcludingHero = categoryPool.filter(p => p.slug !== hero?.slug);

    const displayLatest = freshFromThisMonth.length > 1
      ? freshFromThisMonth.filter(p => p.slug !== hero?.slug)
      : poolExcludingHero.slice(0, 6);

    const displayArchive = poolExcludingHero.filter(
      poolItem => !displayLatest.find(latestItem => latestItem.slug === poolItem.slug)
    );

    return { heroPost: hero, recentBucket: displayLatest, archiveBucket: displayArchive };
  }, [activeCategory, normalize, initialPosts]);

  const currentGridPosts = useMemo(() =>
    recentBucket.slice((currentPage - 1) * 6, currentPage * 6),
    [currentPage, recentBucket]);

  const stayUpdatedPosts = useMemo(() =>
    archiveBucket.slice((stayPage - 1) * 5, stayPage * 5),
    [stayPage, archiveBucket]);

  const totalPagesLatest = useMemo(() => Math.ceil(recentBucket.length / 6), [recentBucket]);
  const totalPagesStay = useMemo(() => Math.ceil(archiveBucket.length / 5), [archiveBucket]);

  return (
    <Section>
      <div className="mb-14 relative">
        <h5 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">Insights.</h5>
        <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">That illuminate.</p>

        {/* Hero Card */}
        {heroPost && (
          <div className="mt-8 md:mt-16 bg-[#000] border border-white/5 rounded-[32px] md:rounded-[48px] p-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start shadow-2xl">
            <div className="w-full lg:w-[58%] relative rounded-[24px] md:rounded-[32px] overflow-hidden group" style={{ aspectRatio: '16/9' }}>
              <Image
                src={heroPost.image || "/images/placeholder.jpg"}
                alt={heroPost.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
            <div className="w-full lg:w-[42%] flex flex-col justify-center lg:pt-4">
              <div className="space-y-6 md:space-y-8">
                <h2 className="desk-h3 text-[1.75rem] text-gray-300 font-bai font-medium">{heroPost.title}</h2>
                <p className="body-sm text-zinc-400 font-light leading-relaxed font-pop line-clamp-4">{heroPost.description}</p>
                <div className="pt-2">
                  <Link href={`/blog/${heroPost.slug}`}><CTABtn label="Read More" /></Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Latest Insights Grid */}
      {recentBucket.length > 0 && (
        <section className="mb-32 relative pt-16">
          <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2">
            <Image src="/images/about/ledlumbox.webp" alt="Background" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="relative pb-12">
            <h2 className="text-desk-h3 text-white font-semibold font-pop mb-12">
              {activeCategory === "All" ? "Current insights & innovations." : `Latest in ${activeCategory}.`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {currentGridPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <BlogCard
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    image={post.image || "/images/placeholder.jpg"}
                    date={post.date}
                  />
                </Link>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPagesLatest} />
          </div>
        </section>
      )}

      {/* Stay Updated Section */}
      {archiveBucket.length > 0 && (
        <section className="pb-20 relative">
          <header className="mb-14">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              {activeCategory === "All" ? "Stay Updated." : "From the Archive."}
            </h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-zinc-400">
              {activeCategory === "All" ? "Timeless insights from our journey." : `Older projects in ${activeCategory}.`}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
            {stayUpdatedPosts.map((post, i) => (
              <div key={`${post.slug}-stay`} className={i === 0 ? 'md:col-span-4' : 'md:col-span-2'}>
                <Link href={`/blog/${post.slug}`}>
                  <BlogCard
                    isFeatured={i === 0}
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    image={post.image || "/images/placeholder.jpg"}
                    date={post.date}
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Pagination currentPage={stayPage} totalPages={totalPagesStay} paramName="stayPage" />
          </div>
        </section>
      )}
      <GetInTouch />
    </Section>
  );
}
