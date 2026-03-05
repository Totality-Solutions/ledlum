"use client";

import React from "react";
import ImageSliderCard from "@/components/layout/common/InfiniteCarousel";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import MarqueeFlow from "@/components/layout/common/MarqueeFlow";
import TrustedPartnersSection from "./TrustedPartners";

// --- ASSETS ---
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import Arrival1 from "@/public/images/home/new-arrival.png";
import BgImg from '@/public/images/home/home-bg3.png'; // Using your existing background

// --- DATA ---
const LIGHTING_IMAGES = [productImg1, productImg2, Arrival1];

const PARTNERS = [
  { id: 1, name: "Apple", icon: "" },
  { id: 2, name: "Google", icon: "G" },
  { id: 3, name: "Drive", icon: "△" },
  { id: 4, name: "VS Code", icon: "V" },
  { id: 5, name: "Framer", icon: "F" },
  { id: 6, name: "Edge", icon: "e" },
  { id: 7, name: "Figma", icon: "Fi" },
  { id: 8, name: "NextJS", icon: "N" },
];

export default function CombinedLightingPartners() {
  return (
    <Section 
      className="relative py-20 lg:py-32 flex flex-col gap-24 lg:gap-32 bg-cover bg-center bg-no-repeat will-change-transform"
      style={{ 
        backgroundImage: `url(${BgImg.src})`,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }} // Shared background applied here
    >
      {/* PART 1: TRUSTED PARTNERS SECTION */}
      <Container className="max-w-[1280px] 2xl:max-w-[1600px] ">
        {/* HEADING SECTION */}
        <div className="mb-12">
          <h2 className="desk-h2 text-white">
            Our.
          </h2>
          <p className="desk-h3 mt-1 text-white">
            Trusted Partners.
          </p>
        </div>

        {/* MARQUEE FLOW CAROUSEL */}
        <MarqueeFlow
          items={PARTNERS}
          gap={20}
          speed={2000}
          renderItem={(partner) => (
            <div 
              className="w-full h-[70px] lg:h-[90px] bg-[#5B5442] rounded-[45px] flex items-center justify-center transition-all duration-500 hover:bg-[#4a4435] group shadow-xl border border-white/5 cursor-pointer"
            >
              <div className="text-white text-2xl lg:text-3xl font-bold opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                {partner.icon}
              </div>
            </div>
          )}
        />
      </Container>
      {/* PART 2: LIGHTING SECTION */}
<Container className="">
  <div className="max-w-5xl mb-12">
    <h2 className="desk-h2 text-white">
      Lighting.
    </h2>
    <p className="desk-h3 mt-1 text-white">
      That Defines the Space.
    </p>
  </div>
  
  {/* 1. Added max-w-2xl to limit the width 
      2. Added aspect-video or aspect-square if you want it even shorter
  */}
  <div className="flex justify-center"> {/* Use justify-center if you want it in the middle */}
    <ImageSliderCard 
      images={LIGHTING_IMAGES} 
      interval={5000} 
      className="w-full aspect-video md:aspect-[20/9] " 
    />
  </div>
</Container>
    </Section>
  );
}