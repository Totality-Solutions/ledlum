



'use client';

import Image from 'next/image';
import React from 'react';

const stats = [
  {
    title: "Who We Are",
    desc: "A forward-thinking lighting solutions company focused on energy-efficient LED technologies."
  },
  {
    title: "Since When",
    desc: "Founded with expertise in modern lighting design and technical innovation."
  },
  {
    title: "What We Do",
    desc: "Designs and delivers high-performance LED solutions for residential and commercial spaces."
  },
  {
    title: "Core Expertise",
    desc: "Outdoor & indoor LED lighting, linear lighting, task lighting, customized systems."
  }
];

export default function AboutHero() {
  return (
    <section className="relative bg-black text-white pt-32 pb-20 md:pb-32 overflow-hidden px-6 md:px-[74px]">

      {/* BACKGROUND DECORATIVE LAYER - Optimized with Next/Image */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to_bottom,transparent_0%,black_30%)',
          WebkitMaskImage: 'linear-gradient(to_bottom,transparent_0%,black_30%)',
        }}
      >
        <Image 
          src="/images/about/ledlumline.png"
          alt="decorative line"
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-10 w-full mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:desk-h1 text-white leading-[1.05]">
              <span className="block opacity-50 font-extralight mb-2">
                Illuminating Spaces –
              </span>
              <span className="font-bold">
                Inspiring Lives
              </span>
            </h1>
          </div>

          <div className="w-full md:w-[35%] lg:w-[25%]">
            <p className="text-sm md:text-base text-zinc-500 text-left md:text-right font-light tracking-wide leading-relaxed">
              Transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>
      </div>

      {/* CINEMATIC IMAGE - Using Priority for LCP optimization */}
      <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
                      h-[35vh] md:h-[60vh] lg:h-[70vh] 
                      mb-20 md:mb-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="LEDLUM Architectural Lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* STAGGERED GRID SECTION */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-y-0 sm:gap-y-12">
          {stats.map((item, i) => (
            <div
              key={item.title}
              className={`relative px-8 md:px-12 py-12 lg:py-16 
                flex flex-col justify-center 
                transition-transform duration-500
                ${i === 1 ? "lg:translate-y-[15%]" : ""}
                ${i === 2 ? "lg:translate-y-[30%]" : ""}
                ${i === 3 ? "lg:translate-y-[45%]" : ""}
              `}
            >
              {/* Desktop Vertical Line */}
              <div className="hidden sm:block absolute left-0 top-0 w-[1px] h-full bg-white/20" />

              {/* Mobile Separator */}
              {i !== 0 && (
                <div className="block sm:hidden absolute left-8 right-8 top-0 h-[1px] bg-white/5" />
              )}

              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-medium mb-6 tracking-tight leading-tight font-pop ">
                  {item.title}
                </h3>
                <p className="text-zinc-500 font-light leading-relaxed font-pop">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}