"use client";

import React from 'react';
import Image from "next/image";
import CTABtn from "../../../components/layout/common/CTABtn"; // Adjust the import path as necessary
import { usePathname } from 'next/navigation';

export function GetInTouch() {
  const pathname = usePathname(); // Initialize pathname


  // 1. Theme now only controls the main footer background
  const theme: Record<string, { bg: string }> = {
    '/': { bg: 'bg-black' },        // Home
    '/about': { bg: 'bg-[#111111]' },   // About
    '/blog': { bg: 'bg-black' },     // Contact
     
  }; 



  // Fallback to default if route isn't defined
  const currentTheme = theme[pathname] || theme['/']; 

  return (
    <section className={`relative z-10 w-full pt-20 pb-20 flex flex-col items-center text-center ${currentTheme.bg} overflow-hidden`}>
      
      {/* 1. GLOBAL BACKGROUND LAYER - Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
        <Image 
          src="/images/about/ledlumline.png"
          alt="background texture"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="font-pop font-medium text-[48px] md:text-[64px] leading-tight text-white mb-2 tracking-tight">
          Get In Touch
        </h2>
        
        {/* Subtitle */}
        <p className="font-pop font-light text-[24px] md:text-[42px] text-white opacity-95 mb-14">
          With Our Lighting Specialists.
        </p>
        
        {/* Modular Button Replacement */}
        <CTABtn 
          label="Our Story"
          href="/contact"
          size="md"
          btnBg="#EFE3D3"
          circleBg="#A39678"
          textColor="#000000"
          iconColor="#FFFFFF"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
}