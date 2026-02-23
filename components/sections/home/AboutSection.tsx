"use client";

import React from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import BgImg from '@/public/images/home/home-bg2.png';

export default function WhoWeAreSection() {
  return (
    <Section className="relative min-h-[400px] py-16 md:py-24 overflow-hidden flex items-center">
      {/* Background Image Layer with Luminosity effect - Optimized */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={BgImg}
          alt="Background Texture"
          fill
          className="object-cover mix-blend-luminosity"
          priority
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
        {/* Color Overlay Layer (rgba(161, 147, 110, 0.50)) */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(161, 147, 110, 0.50)' }} 
        />
      </div>

      {/* Laptop Optimized Container: max-w-[1280px] */}
      <Container className="relative z-10 px-6 lg:px-10">
        <div className="flex flex-col gap-10">
          
          {/* Title Header - Optimized Typography */}
          <div className="flex flex-col">
            <h2 className="text-white text-[2.5rem] lg:text-[3.5rem] font-semibold leading-tight font-bai">
              Who.
            </h2>
            <p className="text-white text-[1.5rem] lg:text-[2rem] font-medium leading-tight font-bai opacity-90">
              We Are.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            {/* Description Text - Balanced for Laptop width */}
            <p className="max-w-[750px] text-white text-[1rem] lg:text-[1.25rem] font-medium leading-[1.6] font-pop opacity-90">
              LEDLUM creates refined lighting solutions that elevate spaces through design, 
              quality, and innovation. Each piece is crafted to balance aesthetics with performance.
            </p>

            {/* "Our Story" CTA Button - Consistent Styling */}
            <div className="group cursor-pointer bg-[#F3E7D8] rounded-full pl-8 pr-2 py-2 flex items-center gap-8 ">
              <span className="text-black desk-h3">
                Our Story
              </span>
              <div className="w-10 h-10 lg:w-12 lg:h-12 relative bg-[#96865D] rounded-full flex items-center justify-center ">
                 {/* Arrow Icon */}
                <div className="w-3 h-3 border-t-2 border-r-2 border-white  translate-x-[-1px] translate-y-[1px]" />
              </div>
            </div>
          </div>
          
        </div>
      </Container>
    </Section>
  );
}