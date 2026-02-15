
"use client";

import React, { useMemo, Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import GridOverlay from "@/components/blog/GridOverlay";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from '@/components/blog/Pagination';
import { blogPosts } from "@/lib/blogData";

const CATEGORY_EXTENDED_CONTENT: Record<string, string> = {
  "Architectural lighting": "Our architectural solutions focus on the intersection of form and function. By utilizing advanced ray-tracing simulations and high-CRI fixtures, we ensure that every structural detail is accentuated while maintaining strict energy compliance and visual comfort.",
  "Commercial projects": "Efficiency meets branding in our commercial lighting strategies. We integrate smart-sensor networks and tunable white technology to create workspaces that boost productivity and adapt to the natural circadian rhythms of employees.",
  "Residential systems": "Smart home integration is at the heart of our residential systems. From automated scene setting to discreet fixture placement, we create atmospheres that transition seamlessly from functional task lighting to warm, ambient relaxation modes.",
  "Energy efficiency": "Beyond simple LED retrofitting, we optimize power density and implement daylight harvesting techniques. Our data-driven approach typically reduces operational energy costs by 30-40% without compromising light quality.",
  "Product insights": "A deep dive into the engineering of our latest luminaires. We explore thermal management, precision optics, and the sustainable materials that define our next generation of lighting hardware.",
  "All": "Discover our comprehensive range of lighting insights, technical guides, and project deep-dives designed for architects and developers."
};

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  
  const activeCategory = searchParams.get('category') || "All";
  const currentPage = Number(searchParams.get('page')) || 1;
  const stayPage = Number(searchParams.get('stayPage')) || 1;

  const postsPerPage = 6; 
  const stayPostsPerPage = 5;

  const categories = ["All", "Architectural lighting", "Commercial projects", "Residential systems", "Energy efficiency", "Product insights"];
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

  const handleCategoryChange = (category: string) => {
    setIsHeroExpanded(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    params.set('page', '1');
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const heroPost = useMemo(() => {
    const target = normalize(activeCategory);
    if (target === "all") return blogPosts.find(p => p.isFeatured) || blogPosts[0];
    return blogPosts.find(post => normalize(post.category) === target) || blogPosts[0];
  }, [activeCategory]);

  const currentGridPosts = blogPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  const stayUpdatedPosts = blogPosts.slice((stayPage - 1) * stayPostsPerPage, stayPage * stayPostsPerPage);

  const totalPagesLatest = Math.ceil(blogPosts.length / postsPerPage);
  const totalPagesStay = Math.ceil(blogPosts.length / stayPostsPerPage);

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-16 lg:px-24 py-20 overflow-x-hidden ">


       {/* 1. GLOBAL BACKGROUND LAYER */}
 {/* 1. BACKGROUND LAYER: This stretches to the screen edges without affecting the grid below */}
  <div 
    className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2"
    style={{
      backgroundImage: "url('/images/about/ledlumline.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity:'0.3'
    }}
  ></div>
      <GridOverlay />

      {/* --- HERO SECTION --- */}
      <header className="mb-24 relative z-10   ">
        <h1 className="desk-h1 text-white ">Insights.</h1>
        <p className=" text-zinc-500 mt-1 ">That illuminate.</p>
    {/* --- RESPONSIVE CATEGORY GRID (2 per row on mobile) --- */}
        <div className="flex flex-wrap gap-2 md:gap-2.5 mt-8 md:mt-12">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => handleCategoryChange(cat)}
              className={`
                w-[calc(50%-4px)] md:w-auto
                px-3 md:px-6 py-2.5 md:py-2 
                rounded-full border button-xs transition-all 
                cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis
                ${normalize(activeCategory) === normalize(cat) 
                  ? 'bg-[#c5a36e]/10 border-[#c5a36e]/40 text-[#c5a36e]' 
                  : 'border-white/5 text-zinc-500 hover:text-white'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 md:mt-16 bg-[#0a0a0a] border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start transition-all duration-500 overflow-hidden">
  
  {/* IMAGE SECTION */}
  <div className="w-full lg:w-[58%] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl shrink-0">
    <img 
      src={heroPost?.image} 
      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-1000" 
      alt="Hero" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
  </div>
  
  {/* CONTENT SECTION */}
  <div className="w-full lg:w-[42%] flex flex-col justify-center lg:pt-4">
    <div className="space-y-6 md:space-y-8">
      
      {/* Title - Using your desk-h3 global class */}
      <h2 className="desk-h3 text-white leading-tight capitalize">
        {heroPost?.category}
      </h2>
      
      <div className="space-y-4">
        {/* Description - Using your body-sm global class */}
        <p className={`body-sm text-zinc-400 font-light leading-relaxed transition-all duration-500 ${!isHeroExpanded ? 'line-clamp-3 md:line-clamp-4' : ''}`}>
          {heroPost?.description}
        </p>
        
        {isHeroExpanded && (
          <p className="body-sm text-zinc-500 font-light leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500 border-l border-[#c5a36e]/30 pl-4">
            {CATEGORY_EXTENDED_CONTENT[heroPost?.category] || CATEGORY_EXTENDED_CONTENT["All"]}
          </p>
        )}
      </div>

      {/* ACTION BUTTON */}
      <div className="pt-2">
        <button 
          onClick={() => setIsHeroExpanded(!isHeroExpanded)}
          className="group flex items-center justify-between w-full sm:w-auto sm:min-w-[195px] bg-[#ece3d4] hover:bg-white transition-all rounded-full p-1.5 pr-1.5 pl-8 md:pl-10 active:scale-[0.96] cursor-pointer shadow-lg"
        >
          {/* Using your font-pop global class */}
          <span className="font-pop text-[#1a1a1a] text-[15px] font-bold tracking-tight">
            {isHeroExpanded ? "Show less" : "Read more"}
          </span>
          
          <div className="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full bg-[#9a8c66] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 shadow-sm">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white w-3.5 h-3.5 md:w-4 md:h-4"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
      </header>

      {/* --- LATEST INSIGHTS --- */}
      {/* <section className="mb-32 relative z-10  bg-[url('/images/about/ledlumbox.png')] bg-cover bg-center py-16">
        <div className="mb-12  pb-6">
          <h2 className="desk-h3 text-white ">Latest insights & innovations.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {currentGridPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BlogCard category={post.category} description={post.description} image={post.image} />
            </Link>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPagesLatest} />
      </section> */}

      {/* --- LATEST INSIGHTS --- */}
<section className="mb-32 relative z-10 py-16">
  
  {/* 1. BACKGROUND LAYER: This stretches to the screen edges without affecting the grid below */}
  <div 
    className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2"
    style={{
      backgroundImage: "url('/images/about/ledlumbox.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Subtle dark overlay to ensure readability */}
    <div className="absolute inset-0 bg-black/40" />
    {/* Gradient to blend with the black page above and below */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
  </div>

  {/* 2. YOUR ORIGINAL CONTENT: Untouched and safe from layout shifts */}
  <div className="relative z-10">
    <div className="mb-12 pb-6">
      <h2 className="desk-h3 text-white">Latest insights & innovations.</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
      {currentGridPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <BlogCard category={post.category} description={post.description} image={post.image} />
        </Link>
      ))}
    </div>
    
    <Pagination currentPage={currentPage} totalPages={totalPagesLatest} />
  </div>
</section>

      {/* --- STAY UPDATED --- */}
      <section className="pb-20 relative z-10">
        <header className="mb-14">
          <h2 className="desk-h2 text-white ">Stay Updated.</h2>
          <p className="body text-zinc-500 mt-1">With industry insights.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
          {stayUpdatedPosts.map((post, i) => {
            let spanClass = i === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <div key={`${post.slug}-stay`} className={spanClass}>
                <Link href={`/blog/${post.slug}`}>
                  <BlogCard 
                    isFeatured={i === 0}
                    category={post.category} 
                    description={post.description} 
                    image={post.image} 
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <Pagination 
            currentPage={stayPage} 
            totalPages={totalPagesStay} 
            paramName="stayPage" 
          />
        </div>
      </section>
    </main>
  );
}

export default function BlogMainPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogContent />
    </Suspense>
  );
}