
"use client";



import React, { useMemo, Suspense, useState, useEffect } from 'react';

import Link from 'next/link';

import { useSearchParams, useRouter } from 'next/navigation';

import { X } from 'lucide-react';

import GridOverlay from "@/components/blog/GridOverlay";

import BlogCard from "@/components/blog/BlogCard";

import Pagination from '@/components/blog/Pagination';

import { blogPosts } from "@/lib/blogData";

import CTABtn from '@/components/layout/common/CTABtn';



// --- UPDATED STRUCTURED CONTENT: Each category now has full multi-section data ---

const CATEGORY_EXTENDED_CONTENT: Record<string, any> = {

  "Architectural lighting": [

    {

      title: "Structural Accentuation",

      text: "Our architectural solutions focus on the intersection of form and function. By utilizing advanced ray-tracing simulations, we ensure every structural detail—from cantilevered beams to textured masonry—is accentuated with intent.",

      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"

    },

    {

      title: "Circadian Integration",

      text: "We integrate tunable white technology to create environments that adapt to natural circadian rhythms. This biological approach to lighting enhances human comfort and focus while maintaining strict energy compliance.",

      image: "https://images.unsplash.com/photo-1507652313519-d4511f7c46bc?q=80&w=2070"

    },

    {

      title: "Sustainable Performance",

      text: "Beyond simple LED retrofitting, we optimize power density and implement daylight harvesting, reducing operational costs significantly through intelligent automation and optical precision.",

      image: "https://images.unsplash.com/photo-1518005020251-58296d421c14?q=80&w=2070"

    }

  ],

  "Commercial projects": [

    {

      title: "The Modern Workspace",

      text: "Efficiency meets branding. We design glare-free environments that prioritize visual comfort for long-duration tasks, utilizing micro-prismatic optics to eliminate screen reflection.",

      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070"

    },

    {

      title: "Adaptive Zoning",

      text: "Commercial spaces require flexibility. Our DALI-2 controlled systems allow for dynamic rezoning of office layouts without the need for physical rewiring, supporting agile business growth.",

      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070"

    },

    {

      title: "Lobby & Experience",

      text: "First impressions are light-driven. We use high-output wall washing and hospitality-grade color rendering to create warm, inviting entryways that represent corporate identity.",

      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070"

    }

  ],

  "Residential systems": [

    {

      title: "Intimate Sanctuaries",

      text: "Transforming living spaces through discrete lighting layers. We focus on 'hidden' light sources that provide warmth and intimacy without the clutter of visible fixtures.",

      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070"

    },

    {

      title: "Smart Living Control",

      text: "Seamless integration with home automation protocols. Control your entire environment through voice, sensors, or scheduled 'scenes' that mirror your lifestyle.",

      image: "https://images.unsplash.com/photo-1556912177-c54030639a6d?q=80&w=2070"

    },

    {

      title: "Artistic Illumination",

      text: "Specialized high-CRI spot lighting designed for private galleries. Protect and showcase your investments with UV-free LEDs that reveal the true depth of every pigment.",

      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070"

    }

  ],

  "Energy efficiency": [

    {

      title: "The Green Footprint",

      text: "Our systems prioritize lumens-per-watt without sacrificing light quality. By utilizing high-efficiency drivers, we reduce parasitic power consumption across large-scale installations.",

      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070"

    },

    {

      title: "Occupancy Intelligence",

      text: "Sensors are the brain of efficiency. Our PIR and ultrasonic hybrid sensors ensure that light is only delivered when and where it is needed, cutting waste by up to 60%.",

      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2070"

    }

  ],

  "Product insights": [

    {

      title: "Optical Engineering",

      text: "A look into the science of beam angles. We develop custom TIR lenses that provide sharp cut-offs and uniform light distribution.",

      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"

    },

    {

      title: "Thermal Management",

      text: "Longevity is determined by heat. Our heat sinks ensure that LED junctions remain cool, extending the life-cycle to over 100,000 hours.",

      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"

    }

  ],

  "All": [

    {

      title: "The Future of Light",

      text: "Explore our holistic approach to illuminating the world's most ambitious projects where light defines the space.",

      image: "https://images.unsplash.com/photo-1505373633562-2289f636838a?q=80&w=2070"

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

  const categories = ["All", "Architectural lighting", "Commercial projects", "Residential systems", "Energy efficiency", "Product insights"];
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

  const handleCategoryChange = (category: string) => {
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

  const currentGridPosts = blogPosts.slice((currentPage - 1) * 6, currentPage * 6);
  const stayUpdatedPosts = blogPosts.slice((stayPage - 1) * 5, stayPage * 5);

  const totalPagesLatest = Math.ceil(blogPosts.length / 6);
  const totalPagesStay = Math.ceil(blogPosts.length / 5);

  const modalSections = useMemo(() => {
    return CATEGORY_EXTENDED_CONTENT[heroPost?.category] || CATEGORY_EXTENDED_CONTENT["All"];
  }, [heroPost]);

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-16 lg:px-24 py-24 overflow-x-hidden">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2 opacity-10 md:opacity-30"
        style={{ backgroundImage: "url('/images/about/ledlumline.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

      <header className="mb-14 relative z-10">
        <h1 className="desk-h1 !text-[3.5rem] md:!text-[var(--text-desk-h1)] text-white leading-tight font-bai">Insights.</h1>
        <p className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] text-white/50 mt-2 font-pop font-light">That illuminate.</p>

        <div className="flex flex-wrap gap-2 md:gap-2.5 mt-10 md:mt-12 font-pop">
          {categories.map((cat) => (
            <button key={cat} onClick={() => handleCategoryChange(cat)}
              className={`w-[calc(50%-4px)] md:w-auto px-3 md:px-6 py-3 md:py-2 rounded-full border transition-all cursor-pointer text-center 
              ${normalize(activeCategory) === normalize(cat) ? 'bg-[#c5a36e]/10 border-[#c5a36e]/40 text-[#c5a36e]' : 'border-white/5 text-zinc-500 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Card */}
        <div className="mt-8 md:mt-16 bg-[#0a0a0a] border border-white/5 rounded-[32px] md:rounded-[48px] p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start shadow-2xl">
          <div className="w-full lg:w-[58%] aspect-[16/9] relative rounded-[24px] md:rounded-[32px] overflow-hidden group">
            <img src={heroPost?.image} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
          </div>

          <div className="w-full lg:w-[42%] flex flex-col justify-center lg:pt-4">
            <div className="space-y-6 md:space-y-8">
              <h2 className="desk-h3 !text-[1.75rem] md:!text-[var(--text-desk-h3)] text-white font-bai font-medium">{heroPost?.category}</h2>
              <p className="body-sm text-zinc-400 desk-h3 font-light leading-relaxed line-clamp-4 font-pop">{heroPost?.description}</p>
              <div className="pt-2">
                <button onClick={() => setIsModalOpen(true)}
                  className="group flex items-center justify-between w-full sm:w-auto sm:min-w-[195px] bg-[#ece3d4] hover:bg-white transition-all rounded-full p-1.5 pr-1.5 pl-8 md:pl-10">
                  <span className="font-pop text-[#1a1a1a] text-[15px] font-bold tracking-tight">Read more</span>
                  <div className="w-10 h-10 rounded-full bg-[#9a8c66] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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

      {/* --- REFACTORED MODAL (WorkModal Style) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-top justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />

          {/* Modal Body */}
          <div className="relative w-full max-w-[1200px] max-h-[90vh] bg-[#0a0a0a] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden rounded-2xl">
            
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-50">
              <button onClick={() => setIsModalOpen(false)} 
                className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 group transition-all">
                <X className="text-2xl text-white group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto h-full hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
              
              {/* --- 1. HERO SECTION --- */}
              <section className="relative h-[50vh] md:h-[60vh] w-full">
                <img src={heroPost?.image} className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </section>

              {/* --- 2. HEADER CONTENT --- */}
              <section className="py-12 md:py-16 px-6 md:px-12">
                <div className="max-w-4xl">
                  <span className="font-pop text-[#c5a36e] tracking-[0.4em] uppercase text-[10px] mb-4 block">Detailed Insights</span>
                  <h2 className="font-bai text-4xl md:text-7xl text-white font-medium lowercase tracking-tighter mb-8">
                    {heroPost?.category}.
                  </h2>
                  
                  {/* Meta Grid (WorkModal Style) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 mt-12">
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-pop">Topic</div>
                      <div className="text-white/80 text-sm font-medium">{heroPost?.category}</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-pop">Reading Time</div>
                      <div className="text-white/80 text-sm font-medium">5 min read</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-pop">Released</div>
                      <div className="text-white/80 text-sm font-medium">Feb 2026</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-pop">Author</div>
                      <div className="text-white/80 text-sm font-medium">LedLum Team</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* --- 3. DYNAMIC SECTIONS (WorkModal Grid Style) --- */}
              <div className="px-6 md:px-12 space-y-24 md:space-y-32 pb-24">
                {modalSections.map((section: any, idx: number) => (
                  <section key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center ${idx % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
                    <div className={`${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                      <h3 className="font-bai text-2xl md:text-4xl text-[#c5a36e] lowercase leading-tight">
                        {section.title}
                      </h3>
                      <p className="font-pop text-lg text-white/60 leading-relaxed font-light">
                        {section.text}
                      </p>
                    </div>

                    <div className={`${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} relative aspect-video rounded-2xl overflow-hidden border border-white/5`}>
                      <img src={section.image} alt={section.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                    </div>
                  </section>
                ))}

                {/* --- 4. FOOTER QUOTE --- */}
                <div className="pt-20 text-center border-t border-white/10">
                   <p className="font-bai text-3xl md:text-5xl text-white font-light leading-tight max-w-4xl mx-auto">
                    "Innovation is at the heart of everything we illuminate."
                  </p>
                  <div className="mt-12 flex justify-center">
                    <CTABtn 
                      label="Discuss a Project" 
                      onClick={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- GRID SECTIONS (Remain unchanged per instructions) --- */}
      <section className="mb-32 relative z-10 pt-16">
        <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-100" style={{ backgroundImage: "url('/images/about/ledlumbox.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
        </div>
        <div className="relative z-10">
          <div className="mb-12 pb-6 border-b border-white/5">
            <h2 className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] text-white font-bai">Latest insights & innovations.</h2>
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

      <section className="pb-20 relative z-10">
        <header className="mb-14">
          <h2 className="desk-h3 !text-[1.5rem] md:!text-[var(--text-desk-h3)] text-white font-bai">Stay Updated.</h2>
          <p className="desk-h3 !text-[1.25rem] md:!text-[var(--text-desk-h3)] text-white/50 mt-1 font-pop font-light">With industry insights.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
          {stayUpdatedPosts.map((post, i) => {
            let spanClass = i === 0 ? "md:col-span-4" : "md:col-span-2";
            return (
              <div key={`${post.slug}-stay`} className={spanClass}>
                <Link href={`/blog/${post.slug}`}>
                  <BlogCard isFeatured={i === 0} category={post.category} description={post.description} image={post.image} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-12">
          <Pagination currentPage={stayPage} totalPages={totalPagesStay} paramName="stayPage" />
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









