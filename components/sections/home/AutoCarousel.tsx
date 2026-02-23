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
      <TrustedPartnersSection />
      {/* PART 2: LIGHTING SECTION */}
<Container className="px-6 lg:px-10">
  <div className="max-w-5xl mb-12">
    <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight font-bai">
      Lighting.
    </h2>
    <p className="text-xl text-white/60 mt-2 font-bai">
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