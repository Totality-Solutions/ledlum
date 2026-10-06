"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
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

function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
      />
      <path fill="#fff" d="m9.6 15.6 6.2-3.6-6.2-3.6v7.2Z" />
    </svg>
  );
}

// YouTube video cards (home page "Testimonials").
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
      aria-label={`Watch "${item.title}" on YouTube`}
      className="group block h-full"
    >
      <article className="h-full flex flex-col overflow-hidden rounded-2xl sm:rounded-[24px] bg-[#141414] border border-white/5 shadow-2xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-logo/50">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" /> */}

          {/* {item.category && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-pop font-medium text-white/90">
              {item.category}
            </span>
          )} */}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full bg-black/45 backdrop-blur-md border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF0000] group-hover:border-[#FF0000]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-white" aria-hidden="true">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 gap-2 p-5 lg:p-6">
          <h3 className="text-lg lg:text-xl font-pop font-semibold leading-snug text-white line-clamp-2">
            {item.title}
          </h3>
          {item.author && (
            <p className="text-xs sm:text-sm font-pop text-white/45 uppercase tracking-wider truncate">
              {item.author}
            </p>
          )}

          <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-white/10">
            <span className="flex items-center gap-2 text-sm font-pop font-medium text-white/75 transition-colors group-hover:text-white">
              <YouTubeIcon className="w-6 h-6 shrink-0" />
              Watch on YouTube
            </span>
            {item.date && (
              <span className="text-xs font-pop text-white/40 whitespace-nowrap">{item.date}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  ));

  // Same look as the Product Catalog row arrows (MarqueeFlow).
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#9a8c66] hover:bg-[#9a8c66]/80  flex items-center justify-center text-white shadow-xl transition-colors";

  return (
    <Section className="bg-[#0A0A0A] text-white py-10 lg:py-16 px-4 lg:px-14 overflow-x-hidden">
      <Container className="relative z-10 max-w-full">
        {/* Header */}
        <div className="relative z-10 flex flex-row justify-between items-end mb-6 lg:mb-10 gap-4 md:gap-8">
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

        <div className="relative z-10 w-full">
          {isCarousel && canScrollLeft && (
            <button
              onClick={() => carouselRef.current?.scrollLeft()}
              aria-label="Previous videos"
              className={`${arrowClass} left-2 md:left-4`}
            >
              <FiChevronLeft size={24} />
            </button>
          )}
          {isCarousel && canScrollRight && (
            <button
              onClick={() => carouselRef.current?.scrollRight()}
              aria-label="Next videos"
              className={`${arrowClass} right-2 md:right-4`}
            >
              <FiChevronRight size={24} />
            </button>
          )}
          <Carousel
            ref={carouselRef}
            items={items}
            onStateChange={handleStateChange}
            thresholds={{ mobile: 1, tablet: 2, desktop: 3 }}
            gridColsClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            itemWidthClassName="max-w-[85%] sm:max-w-none sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            gapClassName="gap-4 sm:gap-6"
          />
        </div>
      </Container>
    </Section>
  );
}
