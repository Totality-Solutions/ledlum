"use client";

import React from 'react';
import Image from "next/image";
import CTABtn from "../../../components/layout/common/CTABtn"; // Adjust the import path as necessary
import { usePathname } from 'next/navigation';

export function GetInTouch() {
  const pathname = usePathname(); // Initialize pathname


  // 1. Theme now only controls the main footer background
  const theme: Record<string, { bg: string }> = {
    '/': { bg: '' },        // Home
    '/about': { bg: '' },   // About
    '/blog': { bg: '' },     // Contact
     
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
        <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
          Get In Touch
        </h2>
        
        {/* Subtitle */}
        <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-regular text-white opacity-95 mb-14">
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