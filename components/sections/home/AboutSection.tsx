"use client";

import React from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import BgImg from '@/public/images/home/home-bg2.png';
import CTABtn from "@/components/layout/common/CTABtn"; // Adjust this path based on your folder structure

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
      <Container className="relative z-10 ">
        <div className="flex flex-col gap-10">
          
          {/* Title Header - Optimized Typography */}
          <div className="flex flex-col">
            <h2 className="desk-h2 text-white font-pop">
              Who.
            </h2>
            <p className="desk-h3 text-white mt-1 opacity-90">
              We Are.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            {/* Description Text - Balanced for Laptop width */}
            <p className="max-w-[750px] text-white text-[1rem] lg:text-[1.25rem] font-medium leading-[1.6] font-pop opacity-90">
              LEDLUM creates refined lighting solutions that elevate spaces through design, 
              quality, and innovation. Each piece is crafted to balance aesthetics with performance.
            </p>

            {/* "Our Story" CTA Button - Now using the CTABtn Component */}
            <CTABtn 
              label="Our Story"
              href="/our-story" // Or use onClick={() => ...}
              size="md"
              btnBg="#F3E7D8"
              circleBg="#96865D"
              btnHoverBg="#ffffff"
            />
          </div>
          
        </div>
      </Container>
    </Section>
  );
}