



'use client';

import { Container } from '@/components/layout/Container';
import Section from '@/components/layout/Section';
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
    <Section className="relative bg-black text-white overflow-hidden ">
      <Container>

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
              <h1 className="max-w-xl leading-[1.05]">
                <span className="lg:text-desk-h1 md:text-tab-h1 text-mob-h1 font-bai font-semibold text-white">
                  Illuminating Spaces
                </span>
                <span className="lg:text-desk-h1 md:text-tab-h1 text-mob-h1 font-bai font-semibold text-white">
                  - Inspiring Lives
                </span>
              </h1>
            </div>

            <div className="w-full md:w-[35%] lg:w-[40%]">
              <p className="lg:text-tab-h2 text-mob-h2  text-white/40 text-left md:text-right font-light ">
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
            src="/images/home/about-new.jpg"
            alt="LEDLUM Architectural Lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
        </div>

{/* SIMPLE STAGGERED GRID SECTION */}
{/* <div className="relative z-10 w-full px-4 md:px-10 h-[500px] "> */}
<div className="relative z-10 w-full px-4 md:px-10 h-auto md:h-[500px]">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((item, i) => (
      <div
        key={item.title}
        /* Logic and structure strictly preserved */
        style={{ height: i === 1 ? '110%' : i === 2 ? '120%' : i === 3 ? '130%' : '100%' }}
        /* - border-b: creates the bottom line for mobile 
           - sm:border-b-0: removes bottom line for desktop
           - sm:border-l: restores the side line for desktop
        */
        className="relative flex flex-col justify-end p-10 min-h-[250px] sm:min-h-[320px] border-b sm:border-b-0 sm:border-l border-white/20"
      >
        {/* Removed the manual absolute separator div to prevent double lines */}

        {/* Content pinned to the bottom-0 */}
        <div className="relative z-10">
          <h3 className="text-[22px] lg:text-[28px] font-semibold text-white mb-3 tracking-tight leading-tight font-pop">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-[15px] lg:text-[16px] font-normal leading-relaxed font-pop">
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>



       
      </Container>
    </Section>
  );
}