import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function GetInTouch() {
  return (
    <section className="relative z-10 w-full pt-20 pb-20 flex flex-col items-center text-center bg-[#111111] overflow-hidden">
      
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
        {/* Title: Manual sizing and font-pop */}
        <h2 className="font-pop font-medium text-[48px] md:text-[64px] leading-tight text-white mb-2 tracking-tight">
          Get In Touch
        </h2>
        
        {/* Subtitle: Manual sizing and font-pop */}
        <p className="font-pop font-light text-[24px] md:text-[42px] text-white opacity-95 mb-14">
          With Our Lighting Specialists.
        </p>
        
        {/* Button: Exact color matching and shape */}
        <Link 
          href="/contact" 
          className="group flex items-center gap-5 bg-[#EFE3D3] pl-10 pr-4 py-3 rounded-full transition-all hover:scale-105 duration-300 active:scale-95"
        >
          <span className="text-black font-pop font-semibold text-[22px]">
            Our Story
          </span>
          
          {/* Arrow Container: Circle matching the branding */}
          <div className="bg-[#A39678] rounded-full w-14 h-14 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-sm">
            <ArrowUpRight className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </Link>
      </div>
    </section>
  );
}