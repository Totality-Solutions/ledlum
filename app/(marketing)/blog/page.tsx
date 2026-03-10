"use client";

import React, { useMemo, useState, useEffect, Suspense, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import BlogCard from "@/components/sections/blog/BlogCard";
import Pagination from '@/components/sections/blog/Pagination';
import { blogPosts } from "@/lib/blogData";
import CTABtn from '@/components/layout/common/CTABtn';
import { GetInTouch } from '@/components/layout/footer/GetInTouch';
import Section from '@/components/layout/Section';

// Import the data and the new Interface
import { CATEGORY_EXTENDED_CONTENT, BlogSection } from '@/lib/blog-content-data';
import BlogModal from '@/components/sections/blog/BlogModal';

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (isModalOpen) document.body.style.overflow = 'hidden';
  //   else document.body.style.overflow = 'auto';
  //   return () => { document.body.style.overflow = 'auto'; };
  // }, [isModalOpen]);


  useEffect(() => {
    if (isModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen])

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
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const heroPost = useMemo(() => {
    const target = normalize(activeCategory);
    if (target === "all") return blogPosts.find(p => p.isFeatured) || blogPosts[0];
    return blogPosts.find(post => normalize(post.category) === target) || blogPosts[0];
  }, [activeCategory, normalize]);

  // Typed to match the BlogModal props
  const modalSections: BlogSection[] = useMemo(() =>
    CATEGORY_EXTENDED_CONTENT[heroPost?.category || "All"] || CATEGORY_EXTENDED_CONTENT["All"],
    [heroPost]);

  const currentGridPosts = useMemo(() =>
    blogPosts.slice((currentPage - 1) * 6, currentPage * 6), [currentPage]);

  const stayUpdatedPosts = useMemo(() =>
    blogPosts.slice((stayPage - 1) * 5, stayPage * 5), [stayPage]);

  const totalPagesLatest = useMemo(() => Math.ceil(blogPosts.length / 6), []);
  const totalPagesStay = useMemo(() => Math.ceil(blogPosts.length / 5), []);

  return (
    <Section>
      <div className="mb-14 relative">
        <h5 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
          Insights.
        </h5>
        <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">
          That illuminate.
        </p>

        {/* Category Navigation */}
        <div className="relative mt-10 md:mt-12 w-full" style={{ height: '54px' }}>
          <style dangerouslySetInnerHTML={{
            __html: `.nav-scroll-container::-webkit-scrollbar { display: none; }
                     .nav-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }`
          }} />
          <div
            className="nav-scroll-container flex flex-nowrap overflow-x-auto snap-x snap-mandatory touch-pan-x w-full absolute left-0 right-0 top-0 pb-4 -mb-4 gap-2.5 md:relative md:flex-wrap md:overflow-visible md:gap-2.5 md:pb-0 md:mb-0"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((cat) => {
              const isActive = normalize(activeCategory) === normalize(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex-shrink-0 px-5 md:px-6 py-3 md:py-2 rounded-2xl border transition-all cursor-pointer text-center font-pop text-sm md:text-base whitespace-nowrap
                    ${isActive
                      ? 'bg-[#CFC08E] text-black border-[#8D794E] border-[2px]'
                      : 'border-black text-zinc-500 hover:text-white bg-black/15'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div
            className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none md:hidden"
            style={{ background: 'linear-gradient(to left, black, transparent)', zIndex: 30 }}
          />
        </div>

        {/* Hero Card */}
        <div className="mt-8 md:mt-16 bg-[#000] border border-white/5 rounded-[32px] md:rounded-[48px] p-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start shadow-2xl">
          <div className="w-full lg:w-[58%] relative rounded-[24px] md:rounded-[32px] overflow-hidden group"
            style={{ aspectRatio: '16/9' }}>
            {heroPost?.image && (
              <Image
                src={heroPost.image}
                alt={heroPost.category ?? 'Hero'}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            )}
          </div>

          <div className="w-full lg:w-[42%] flex flex-col justify-center lg:pt-4">
            <div className="space-y-6 md:space-y-8">
              <h2 className="desk-h3 text-[1.75rem] text-gray-300 font-bai font-medium">
                {heroPost?.category}
              </h2>
              <p className="body-sm text-zinc-400 font-light leading-relaxed font-pop line-clamp-4">
                {heroPost?.description}
              </p>
              <div className="pt-2">
                <CTABtn onClick={() => setIsModalOpen(true)} label="Read More" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the Separated Modal */}
      <BlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        heroPost={heroPost} 
        modalSections={modalSections} 
      />

      {/* Latest Insights Grid */}
      <section className="mb-32 relative pt-16">
        <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2">
          <Image
            src="/images/about/ledlumbox.png"
            alt="Background overlay"
            fill
            className="object-cover"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative pb-12">
          <div className="pb-12">
            <h2 className="text-desk-h3 text-white font-semibold font-pop">
              Latest insights & innovations.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {currentGridPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <BlogCard
                  category={post.category}
                  description={post.description}
                  image={post.image}
                />
              </Link>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPagesLatest} />
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="pb-20 relative">
        <header className="mb-14">
          <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
            Stay Updated.
          </h2>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">
            With industry insights.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
          {stayUpdatedPosts.map((post, i) => (
            <div key={`${post.slug}-stay`} className={i === 0 ? 'md:col-span-4' : 'md:col-span-2'}>
              <Link href={`/blog/${post.slug}`}>
                <BlogCard
                  isFeatured={i === 0}
                  category={post.category}
                  description={post.description}
                  image={post.image}
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Pagination currentPage={stayPage} totalPages={totalPagesStay} paramName="stayPage" />
        </div>
      </section>

      <GetInTouch />
    </Section>
  );
}

export default function BlogMainPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogContent />
    </Suspense>
  );
}
