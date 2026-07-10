"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { cdnImg } from "@/lib/cdn";
import Carousel, { CarouselHandle, CarouselState } from "./Carousel";

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
  const carouselRef = useRef<CarouselHandle>(null);
  const [carouselState, setCarouselState] = useState<CarouselState>({
    isCarousel: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  const handleStateChange = useCallback((state: CarouselState) => {
    setCarouselState(state);
  }, []);

  const { isCarousel, canScrollLeft, canScrollRight } = carouselState;

  const items = data.map((item) => (
    <Link
      key={item.slug}
      href={item.slug}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer block"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 rounded-2xl sm:rounded-[25px] mb-3 sm:mb-4 shadow-2xl border border-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, calc(25% - 18px)"
        />
        {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
        <div className="absolute bottom-0 py-2 bg-black text-center px-1 sm:px-2 w-full">
          <h3 className="text-md md:text-base font-medium font-pop leading-snug text-white/80 line-clamp-2 group-hover:text-white transition-colors break-words">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  ));

  return (
    <Section className="bg-[#0A0A0A] text-white py-10 lg:py-16 px-4 lg:px-14 overflow-x-hidden">
      <Container className="relative z-10 max-w-full">
        {/* Decorative Background Texture Overlay */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
          <Image
            src={cdnImg("/images/about/ledlumline.webp")}
            alt="background texture"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div> */}

        {/* Unified Premium Header Row */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-4 lg:mb-8 gap-4 md:gap-8">
          <div className="flex flex-col">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              {titleMain}.
            </h2>
            {rightLabel && (
              <p className="text-mob-h3 md:text-tab-h2 lg:text-desk-h3 font-pop font-bold text-white">
                {rightLabel}.
              </p>
            )}
          </div>
        </div>

        {/* ── EXTERNAL ROW CONFIGURATION ── */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-4">
          {/* {isCarousel && (
            <button
              onClick={() => carouselRef.current?.scrollLeft()}
              disabled={!canScrollLeft}
              className={`hidden sm:flex shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-logo text-white rounded-full items-center justify-center transition-all duration-300 ${
                !canScrollLeft
                  ? "opacity-20 cursor-not-allowed scale-95"
                  : "opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              }`}
            >
              <FiChevronLeft size={20} />
            </button>
          )} */}

          <div className="w-full min-w-0">
            <Carousel
              ref={carouselRef}
              items={items}
              onStateChange={handleStateChange}
            />
          </div>

          {/* {isCarousel && (
            <button
              onClick={() => carouselRef.current?.scrollRight()}
              disabled={!canScrollRight}
              className={`hidden sm:flex flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-logo text-white rounded-full items-center justify-center transition-all duration-300 ${
                !canScrollRight
                  ? "opacity-20 cursor-not-allowed scale-95"
                  : "opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              }`}
            >
              <FiChevronRight size={20} />
            </button>
          )} */}
        </div>
      </Container>
    </Section>
  );
}