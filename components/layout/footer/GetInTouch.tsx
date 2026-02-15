import React from 'react';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GetInTouch() {
  return (
    <section className="relative z-10 w-full pt-10 md:pt-32 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-6xl font-bai font-bold text-white mb-4">
        Get In Touch
      </h2>
      <p className="text-xl md:text-2xl font-pop font-light text-white/80 mb-10">
        With Our Lighting Specialists.
      </p>
      
      <Link 
        href="/contact" 
        className="group flex items-center gap-3 bg-[#EFE3D3] px-8 py-4 rounded-full transition-transform hover:scale-105 duration-300"
      >
        <span className="text-black font-bai font-semibold text-lg">Our Story</span>
        <div className="bg-[#A39678] rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </Link>
    </section>
  );
}