"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import BgImg from "@/public/images/home/home-bg4.png";

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
      className="relative py-12 lg:py-20 bg-cover bg-top bg-no-repeat overflow-hidden will-change-transform"
    >
    <Image
      src={BgImg}
      alt="Background"
      fill
      priority
      className="object-cover -z-[20]"
    />
    <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
                  <Image 
                    src="/images/about/ledlumline.png"
                    alt="background texture"
                    fill
                    className="object-cover object-center"
                  />
      </div>
      {/* <div className="absolute inset-0 z-0 pointer-events-none" /> */}

      <Container className="relative z-10 ">

        {/* HEADER (UNCHANGED DESKTOP STYLE) */}
        <div className="mb-20">
          <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
            Our.
          </h2>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
            Achievements.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">

          {/* DESKTOP IMAGE (unchanged) */}
          <div className="relative w-[320px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl hidden lg:block border border-white/10 sticky top-32">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeId === item.id ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
<div className="flex-1 w-full flex flex-col">
  {ACHIEVEMENTS.map((stat) => {
    const isActive = activeId === stat.id;

    return (
      <div
        key={stat.id}
        onMouseEnter={() => setActiveId(stat.id)}
        className={`
          relative border-b border-white/20 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden
          
          /* LAYOUT LOGIC */
          flex flex-col
          
          /* MOBILE + TABLET */
          h-auto py-6 md:py-8
          
          /* DESKTOP ACCORDION SIZING */
          lg:py-0
          ${isActive ? "lg:h-[190px]" : "lg:h-[80px]"}
        `}
      >
        {/* SPACER: Grows only when active to push content from top to bottom */}
        <div className={`hidden lg:block transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "flex-grow" : "h-0"}`} />

        {/* MOBILE + TABLET CONTENT (Always Visible) */}
        <div className="block lg:hidden px-4">
          <span className="text-desk-h2 md:text-desk-h1 font-bai text-logo leading-none">
            {stat.value}
          </span>
          <span className="block text-tab-h2  md:text-desk-h3  font-pop tracking-[0.2em] uppercase mt-4 text-white">
            {stat.label}
          </span>
        </div>

        {/* DESKTOP CONTENT 
            Uses absolute top-5 when collapsed, but switches to standard flow (bottom-anchored) when active.
        */}
        <div 
          className={`
            hidden lg:block w-full px-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isActive 
              ? "relative pb-3 translate-y-0" 
              : "absolute top-10 left-0 translate-y-0"
            }
          `}
        >
          <div className="flex flex-col">
            <span
              className={`text-desk-h1 font-bai font-semibold uppercase transition-all duration-700 ${
                isActive
                  ? "text-logo opacity-100"
                  : "text-logo/30 opacity-40"
              }`}
            >
              {stat.value}
            </span>

            <span
              className={`text-desk-h3 font-semibold font-pop uppercase transition-all duration-700 ${
                isActive
                  ? "text-white opacity-100 mt-2 h-auto block"
                  : "text-white/0 opacity-0 h-0 overflow-hidden"
              }`}
            >
              {stat.label}
            </span>
          </div>
        </div>

        {/* DESKTOP UNDERLINE */}
        <div
          className={`hidden lg:block absolute bottom-0 left-0 h-[1.5px] bg-logo transition-all duration-1000 z-10 ${
            isActive ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    );
  })}
</div>
        </div>
      </Container>
    </Section>
  );
}
