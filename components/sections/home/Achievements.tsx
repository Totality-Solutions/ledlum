"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

// --- ASSETS ---
import BgImg from '@/public/images/home/home-bg4.png';

const ACHIEVEMENTS = [
  { id: "01", value: "23+", label: "YEARS OF EXPERIENCE", image: "https://placehold.co/492x615" },
  { id: "02", value: "400+", label: "PARTNERS", image: "https://placehold.co/492x615" },
  { id: "03", value: "1,100+", label: "PRODUCTS", image: "https://placehold.co/492x615" },
  { id: "04", value: "30,000+", label: "BURNING HOURS", image: "https://placehold.co/492x615" },
];

export default function AchievementsSection() {
  const [activeId, setActiveId] = useState(ACHIEVEMENTS[0].id);

  return (
    <Section 
      className="relative py-20 lg:py-32 bg-cover bg-top bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${BgImg.src})` }}
    >
      {/* Dark Overlay to match Figma depth */}
      <div className="absolute inset-0 z-0 pointer-events-none" />

      <Container className="max-w-[1280px] 2xl:max-w-[1600px] relative z-10 px-6 lg:px-10">
        
        {/* HEADER */}
        <div className="mb-20">
          <h2 className="text-[48px] font-bai font-medium text-white leading-none">Our.</h2>
          <p className="text-[32px] font-pop text-white font-normal mt-2">Achievements.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
          
          {/* LEFT: Dynamic Image Preview */}
          <div className="relative w-[350px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl hidden lg:block border border-white/10 sticky top-32">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeId === item.id ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <Image src={item.image} alt={item.label} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>

          {/* RIGHT: The "Half-Visible" Accordion List */}
          <div className="flex-1 w-full flex flex-col">
            {ACHIEVEMENTS.map((stat) => {
              const isActive = activeId === stat.id;
              
              return (
                <div
                  key={stat.id}
                  onMouseEnter={() => setActiveId(stat.id)}
                  className={`relative border-b border-white/20 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer overflow-hidden ${
                    isActive ? "h-[180px] lg:h-[220px]" : "h-[60px] lg:h-[70px]"
                  }`}
                >
                  {/* Content Wrapper - Absolute so it doesn't move while parent shrinks */}
                  <div className="absolute top-6 left-0 w-full px-4 lg:px-8">
                    <div className="flex flex-col">
                      {/* The Number - Moves slightly up when active */}
                      <span 
                        className={`text-[60px] lg:text-[84px] font-bai font-bold leading-none transition-all duration-700 ${
                          isActive 
                            ? "text-[#96865D] opacity-100 translate-y-0" 
                            : "text-[#96865D]/30 opacity-40 translate-y-2"
                        }`}
                      >
                        {stat.value}
                      </span>

                      {/* The Label - Fades and slides in only when active */}
                      <span className={`text-[14px] lg:text-[18px] font-pop tracking-[0.2em] uppercase mt-6 transition-all duration-700 ${
                        isActive ? "text-white opacity-100 translate-y-0" : "text-white/0 opacity-0 translate-y-8"
                      }`}>
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  {/* Active Underline Effect */}
                  <div className={`absolute bottom-0 left-0 h-[1px] bg-[#96865D] transition-all duration-1000 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`} />
                </div>
              );
            })}
          </div>
          
        </div>
      </Container>
    </Section>
  );
}