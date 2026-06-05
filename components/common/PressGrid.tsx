"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

interface PressItem {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

interface PressGridProps {
  data: PressItem[];
  titleMain: string;
  rightLabel?: string;
}

export default function PressGrid({
  data,
  titleMain,
  rightLabel,
}: PressGridProps) {
  const [isCarousel, setIsCarousel] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    const handleLayoutMode = () => {
      const width = window.innerWidth;
      let activeCarousel = false;

      if (width >= 1024) {
        activeCarousel = data.length > 4;
      } else if (width >= 640) {
        activeCarousel = data.length > 2;
      } else {
        activeCarousel = data.length > 1;
      }

      setIsCarousel(activeCarousel);
      setTimeout(updateScrollButtons, 100);
    };

    handleLayoutMode();
    window.addEventListener("resize", handleLayoutMode);
    return () => window.removeEventListener("resize", handleLayoutMode);
  }, [data.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollRef.current.scrollLeft - cardWidth
            : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section className="bg-[#0A0A0A] text-white py-12 lg:py-16 px-3 lg:px-14">
      <Container className="relative z-10">
        
        {/* Decorative Background Texture Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
          <Image 
            src="/images/about/ledlumline.webp"
            alt="background texture"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Unified Premium Header Row */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-4 lg:mb-8 gap-8">
          <div className="flex flex-col">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              {titleMain}.
            </h2>
            {rightLabel && (
              <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">
                {rightLabel}.
              </p>
            )}
          </div>
        </div>

        {/* ── EXTERNAL ROW CONFIGURATION ── */}
        <div className="relative z-10 flex items-center gap-4">
          
          {/* Left Navigation Arrow: Placed horizontally outside the viewport block element */}
          {isCarousel && (
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`flex-shrink-0 w-10 h-10 bg-logo text-white rounded-full flex items-center justify-center transition-all duration-300 ${
                !canScrollLeft 
                  ? "opacity-20 cursor-not-allowed scale-95" 
                  : "opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              }`}
            >
              <FiChevronLeft size={20} />
            </button>
          )}

          {/* Carousel Viewport Container */}
          <div className="flex-1 min-w-0">
            <div
              ref={scrollRef}
              onScroll={updateScrollButtons}
              className={`w-full gap-6 ${
                isCarousel 
                  ? "flex overflow-x-auto no-scrollbar scroll-smooth py-2" 
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
              style={isCarousel ? { scrollbarWidth: "none", msOverflowStyle: "none" } : undefined}
            >
              {data.map((item, index) => (
                <Link
                  key={index}
                  href={item.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group cursor-pointer block ${
                    isCarousel 
                      ? "flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" 
                      : "w-full"
                  }`}
                >
                  {/* Image Container Card */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 rounded-[25px] mb-4 shadow-2xl border border-white/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Meta Text Stack */}
                  <div className="flex flex-col gap-1 px-2">
                    {/* <span className="text-[10px] md:text-sm text-white/40 font-semibold font-pop">
                      {item.category}
                    </span> */}
                    <h3 className="text-sm md:text-base font-light font-pop leading-snug text-white/80 line-clamp-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow: Placed horizontally outside the viewport block element */}
          {isCarousel && (
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`flex-shrink-0 w-10 h-10 bg-logo text-white rounded-full flex items-center justify-center transition-all duration-300 ${
                !canScrollRight 
                  ? "opacity-20 cursor-not-allowed scale-95" 
                  : "opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              }`}
            >
              <FiChevronRight size={20} />
            </button>
          )}

        </div>
      </Container>
    </Section>
  );
}