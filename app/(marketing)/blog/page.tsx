"use client";

import React, { useMemo, useState, useEffect, Suspense, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import BlogCard from "@/components/blog/BlogCard";
import Pagination from '@/components/blog/Pagination';
import { blogPosts } from "@/lib/blogData";
import CTABtn from '@/components/layout/common/CTABtn';
import { GetInTouch } from '@/components/layout/footer/GetInTouch';
import Section from '@/components/layout/Section';

const CATEGORY_EXTENDED_CONTENT: Record<string, any> = {
  "Architectural lighting": [
    {
      title: "Structural Accentuation",
      text: "Our architectural solutions focus on the intersection of form and function. By utilizing advanced ray-tracing simulations, we ensure every structural detail—from cantilevered beams to textured masonry—is accentuated with intent.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=75&w=1200"
    },
    {
      title: "Circadian Integration",
      text: "We integrate tunable white technology to create environments that adapt to natural circadian rhythms. This biological approach to lighting enhances human comfort and focus while maintaining strict energy compliance.",
      image: "https://images.unsplash.com/photo-1507652313519-d4511f7c46bc?q=75&w=1200"
    },
    {
      title: "Sustainable Performance",
      text: "Beyond simple LED retrofitting, we optimize power density and implement daylight harvesting, reducing operational costs significantly through intelligent automation and optical precision.",
      image: "https://images.unsplash.com/photo-1518005020251-58296d421c14?q=75&w=1200"
    }
  ],
  "Commercial projects": [
    {
      title: "The Modern Workspace",
      text: "Efficiency meets branding. We design glare-free environments that prioritize visual comfort for long-duration tasks, utilizing micro-prismatic optics to eliminate screen reflection.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=75&w=1200"
    },
    {
      title: "Adaptive Zoning",
      text: "Commercial spaces require flexibility. Our DALI-2 controlled systems allow for dynamic rezoning of office layouts without the need for physical rewiring, supporting agile business growth.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=75&w=1200"
    },
    {
      title: "Lobby & Experience",
      text: "First impressions are light-driven. We use high-output wall washing and hospitality-grade color rendering to create warm, inviting entryways that represent corporate identity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=75&w=1200"
    }
  ],
  "Residential systems": [
    {
      title: "Intimate Sanctuaries",
      text: "Transforming living spaces through discrete lighting layers. We focus on 'hidden' light sources that provide warmth and intimacy without the clutter of visible fixtures.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=75&w=1200"
    },
    {
      title: "Smart Living Control",
      text: "Seamless integration with home automation protocols. Control your entire environment through voice, sensors, or scheduled 'scenes' that mirror your lifestyle.",
      image: "https://images.unsplash.com/photo-1556912177-c54030639a6d?q=75&w=1200"
    },
    {
      title: "Artistic Illumination",
      text: "Specialized high-CRI spot lighting designed for private galleries. Protect and showcase your investments with UV-free LEDs that reveal the true depth of every pigment.",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=75&w=1200"
    }
  ],
  "Energy efficiency": [
    {
      title: "The Green Footprint",
      text: "Our systems prioritize lumens-per-watt without sacrificing light quality. By utilizing high-efficiency drivers, we reduce parasitic power consumption across large-scale installations.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=75&w=1200"
    },
    {
      title: "Occupancy Intelligence",
      text: "Sensors are the brain of efficiency. Our PIR and ultrasonic hybrid sensors ensure that light is only delivered when and where it is needed, cutting waste by up to 60%.",
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=75&w=1200"
    }
  ],
  "Product insights": [
    {
      title: "Optical Engineering",
      text: "A look into the science of beam angles. We develop custom TIR lenses that provide sharp cut-offs and uniform light distribution.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=75&w=1200"
    },
    {
      title: "Thermal Management",
      text: "Longevity is determined by heat. Our heat sinks ensure that LED junctions remain cool, extending the life-cycle to over 100,000 hours.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=75&w=1200"
    }
  ],
  "All": [
    {
      title: "The Future of Light",
      text: "Explore our holistic approach to illuminating the world's most ambitious projects where light defines the space.",
      image: "https://images.unsplash.com/photo-1505373633562-2289f636838a?q=75&w=1200"
    }
  ]
};

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isModalOpen]);

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

  const currentGridPosts = useMemo(() =>
    blogPosts.slice((currentPage - 1) * 6, currentPage * 6), [currentPage]);

  const stayUpdatedPosts = useMemo(() =>
    blogPosts.slice((stayPage - 1) * 5, stayPage * 5), [stayPage]);

  const totalPagesLatest = useMemo(() => Math.ceil(blogPosts.length / 6), []);
  const totalPagesStay = useMemo(() => Math.ceil(blogPosts.length / 5), []);

  const modalSections = useMemo(() =>
    CATEGORY_EXTENDED_CONTENT[heroPost?.category] || CATEGORY_EXTENDED_CONTENT["All"],
    [heroPost]);

  return (
    <Section>
      <div className="mb-14 relative">
        <h5 className="desk-h1 !text-[3.5rem] text-white leading-tight font-bai">
          Insights.
        </h5>
        <p className="desk-h3 !text-[1.5rem] text-white mt-2 font-pop font-bold">
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
                      ? 'bg-[#8D794E] text-txgray border-[#8D794E]'
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

        {/* Hero Card — fixed aspect ratio on image container prevents layout shift */}
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
              <h2 className="desk-h3 !text-[1.75rem] text-gray-300 font-bai font-medium">
                {heroPost?.category}
              </h2>
              <p className="body-sm text-zinc-400 desk-h3 font-light leading-relaxed line-clamp-4 font-pop">
                {heroPost?.description}
              </p>
              <div className="pt-2">
                <CTABtn onClick={() => setIsModalOpen(true)} label="Read More" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-[1200px] max-h-[90vh] bg-[#0a0a0a] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden rounded-2xl mt-8">
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 group transition-all"
                aria-label="Close modal"
              >
                <X className="text-2xl text-white group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            <div className="overflow-y-auto h-full hide-scrollbar">
              {/* Modal hero image — fixed aspect ratio */}
              <section className="relative w-full" style={{ aspectRatio: '21/9', minHeight: '240px' }}>
                {heroPost?.image && (
                  <Image
                    src={heroPost.image}
                    alt={heroPost.category ?? 'Hero'}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </section>

              <section className="py-12 md:py-16 px-6 md:px-12">
                <div className="max-w-4xl">
                  <span className="font-pop text-[#c5a36e] tracking-[0.4em] uppercase text-[10px] mb-4 block">
                    Detailed Insights
                  </span>
                  <h2 className="font-bai text-3xl md:text-7xl text-white font-medium tracking-tighter mb-8">
                    {heroPost?.category}.
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 mt-12">
                    {[
                      { label: 'Topic', value: heroPost?.category },
                      { label: 'Reading Time', value: '5 min read' },
                      { label: 'Released', value: 'Feb 2026' },
                      { label: 'Author', value: 'LedLum Team' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-pop">{label}</div>
                        <div className="text-white/80 text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <div className="px-6 md:px-12 space-y-24 md:space-y-32 pb-24">
                {modalSections.map((section: any, idx: number) => (
                  <section
                    key={idx}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center"
                  >
                    <div className={`${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                      <h3 className="font-bai text-2xl md:text-4xl text-[#c5a36e] lowercase leading-tight">
                        {section.title}
                      </h3>
                      <p className="font-pop text-lg text-white/60 leading-relaxed font-light">
                        {section.text}
                      </p>
                    </div>
                    <div
                      className={`${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} relative rounded-2xl overflow-hidden border border-white/5`}
                      style={{ aspectRatio: '16/9' }}
                    >
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-1000"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </section>
                ))}

                <div className="pt-20 text-center border-t border-white/10">
                  <p className="font-bai text-3xl md:text-5xl text-white font-light leading-tight max-w-4xl mx-auto">
                    "Innovation is at the heart of everything we illuminate."
                  </p>
                  <div className="mt-12 flex justify-center">
                    <CTABtn label="Discuss a Project" onClick={() => setIsModalOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

        <div className="relative">
          <div className="mb-12 pb-6 border-b border-white/5">
            <h2 className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] text-white font-bai">
              Latest insights & innovations.
            </h2>
          </div>

          {/* FIX: col-span must live on the grid child, not inside BlogCard */}
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

      {/* Stay Updated — col-span applied on wrapper div (correct) */}
      <section className="pb-20 relative">
        <header className="mb-14">
          <h2 className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] text-white font-bai">
            Stay Updated.
          </h2>
          <p className="desk-h3 !text-[1.25rem] md:!text-[var(--text-desk-h3)] text-white/50 mt-1 font-pop font-light">
            With industry insights.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
          {stayUpdatedPosts.map((post, i) => (
            // col-span is correctly on the grid child here — BlogCard gets isFeatured
            // only to adjust its internal image aspect ratio
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