

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageSliderCard from "@/components/layout/common/InfiniteCarousel";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTABtn from "@/components/layout/common/CTABtn"; // Import your CTA component

// --- ASSETS ---
import BgImg from '@/public/images/home/home-bg3.png';

// --- LIVE ASSETS (Unsplash Lighting Images) ---
const LIGHTING_IMAGES = [
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=2080&auto=format&fit=crop", 
];

// --- DATA ---
const BLOG_LINKS = [
  "/blog/redefining-ambience-mood",
  "/blogs/wooden-tier-lighting",
  "/blogs/modern-minimalist-trends",
];

const SLIDE_INTERVAL = 5000;

export default function CombinedLightingPartners() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync logic: Track which slide is active based on the interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIGHTING_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const handleSliderClick = () => {
    const targetLink = BLOG_LINKS[currentIndex];
    router.push(targetLink);
  };

  return (
    <Section 
      className="relative flex flex-col gap-24 lg:gap-32 bg-cover bg-center bg-no-repeat will-change-transform"
    >
      <Image
        src={BgImg}
        alt="Background"
        fill
        priority
        quality={100}
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

      <Container className="max-w-[1280px] 2xl:max-w-[1600px] ">
        {/* Partners content placeholder */}
      </Container>

      <Container className="">
        <div className="mb-12">
          <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
            Blogs
          </h2>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
            that defines the space.
          </p>
        </div>
        
        <div className="flex justify-center"> 
          <div 
            onClick={handleSliderClick}
            className="w-full cursor-pointer relative group overflow-hidden rounded-[12px] md:rounded-[24px]"
          >
            <ImageSliderCard 
              images={LIGHTING_IMAGES as any} 
              interval={SLIDE_INTERVAL} 
              className="w-full aspect-video md:aspect-[12/4] transition-all duration-700 group-hover:scale-[1.01]" 
            />
            
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

            {/* --- CENTER REDIRECTION BUTTON --- */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                <CTABtn 
                  label="View Article"
                  size="md"
                  iconType="arrow"
                  showIconCircle={true}
                  btnBg="#ffffff"
                  textColor="#000000"
                  circleBg="#96865D"
                  iconColor="#ffffff"
                  // We use className to ensure the internal group-hover of the button
                  // works in sync with our slider group hover
                  className="shadow-2xl pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}