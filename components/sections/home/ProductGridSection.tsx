"use client";

import React, { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import MarqueeFlow from "@/components/layout/common/MarqueeFlow"; 

import BgImg from '@/public/images/home/home-bg1.png';
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import Arrival1 from "@/public/images/home/new-arrival.png";
import CTABtn from '@/components/layout/common/CTABtn';

// --- DATA ---
const NEW_ARRIVALS = [
  { id: 1, img: Arrival1, title: 'Simply Dummy', href:"#" },
  { id: 2, img: Arrival1, title: 'Simply Dummy', href:"#" },
  { id: 3, img: Arrival1, title: 'Simply Dummy', href:"#" },
  { id: 4, img: Arrival1, title: 'Simply Dummy', href:"#" },
  { id: 5, img: Arrival1, title: 'Simply Dummy', href:"#" },
  { id: 6, img: Arrival1, title: 'Simply Dummy', href:"#" },
];

const BESTSELLERS = [
  { id: 1, title: 'Simply Dummy', sub: 'Nordic Pendant', lightImg: productImg1, darkImg: productImg2 },
  { id: 2, title: 'Simply Dummy', sub: 'Wooden Tier', lightImg: productImg1, darkImg: productImg2 },
  { id: 3, title: 'Simply Dummy', sub: 'Globe Minimal', lightImg: productImg1, darkImg: productImg2 },
  { id: 4, title: 'Simply Dummy', sub: 'Cone Classic', lightImg: productImg1, darkImg: productImg2 },
];

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const CombinedProductSection = memo(function CombinedProductSection() {
  const [isAllDark, setIsAllDark] = useState(false);
  const [activeModes, setActiveModes] = useState<Record<number, boolean>>({});

  // --- HANDLERS ---
  const toggleAll = () => {
    const nextState = !isAllDark;
    setIsAllDark(nextState);
    const newState: Record<number, boolean> = {};
    BESTSELLERS.forEach(p => newState[p.id] = nextState);
    setActiveModes(newState);
  };

  const toggleIndividual = (id: number) => {
    setActiveModes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Section className="relative min-h-screen py-16 lg:py-24 overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${BgImg.src})` }}
  />

  {/* Transparency Layer to blend with main background */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

  {/* SECTION 1 */}
  <Container className="relative z-10">

    {/* Header */}
    <div className="flex flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">

      <div className="max-w-xl font-pop">
        <h2 className="desk-h2 text-white">
          Designed In-House.
        </h2>

        <p className="desk-h3 text-white mt-1">
          Built <span className="lowercase">to</span> Last.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex flex-row md:flex-col items-end gap-6">

        <span className="hidden md:block body-sm text-white">
          Bestsellers
        </span>

        <button
          onClick={toggleAll}
          className={cn(
            "w-[40px] h-[20px] lg:w-[70px] lg:h-[36px] rounded-full p-1.5 flex items-center transition-colors duration-500 shadow-lg",
            isAllDark ? "bg-black" : "bg-white"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-transform duration-500",
              isAllDark
                ? "translate-x-4 lg:translate-x-8 bg-white"
                : "translate-x-0 bg-black"
            )}
          >
            <div
              className={cn(
                "w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full border-[1.5px]",
                isAllDark ? "border-black" : "border-white"
              )}
            />
          </div>
        </button>

      </div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

      {BESTSELLERS.map((product) => {

        const isDark = activeModes[product.id] ?? isAllDark;

        return (

          <div key={product.id} className="group relative">

            {/* Image */}
            <div className="relative aspect-[3/4] rounded-[18px] overflow-hidden shadow-2xl">

              <Image
                src={isDark ? product.darkImg : product.lightImg}
                alt={product.title}
                fill
                priority={false}
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                className="object-cover transition-opacity duration-700"
              />

              {/* Desktop Info */}
              <div className="hidden lg:flex absolute bottom-0 left-0 w-full h-[110px] px-8 items-center justify-between bg-white/20 backdrop-blur-xl border-t border-white/20">

                <div className="flex flex-col">
                  <span className="body font-semibold text-black">
                    {product.title}
                  </span>

                  <span className="body-xs text-black/70">
                    {product.sub}
                  </span>
                </div>

                <button
                  onClick={() => toggleIndividual(product.id)}
                  className={cn(
                    "w-[54px] h-[28px] rounded-full p-1 flex items-center transition-all duration-300",
                    isDark ? "bg-black" : "bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-500",
                      isDark
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-black"
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full border",
                        isDark ? "border-black" : "border-white"
                      )}
                    />
                  </div>
                </button>

              </div>
            </div>

            {/* Mobile Info */}
            <div className="flex lg:hidden justify-between items-center pt-4">

              <div className="flex flex-col">
                <span className="body font-semibold text-white">
                  {product.title}
                </span>

                <span className="body-xs text-white/60">
                  {product.sub}
                </span>
              </div>

              <button
                onClick={() => toggleIndividual(product.id)}
                className={cn(
                  "w-[46px] h-[24px] rounded-full p-1 flex items-center transition-all",
                  isDark ? "bg-black" : "bg-white"
                )}
              >
                <div
                  className={cn(
                    "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-transform duration-500",
                    isDark
                      ? "translate-x-5 bg-white"
                      : "translate-x-0 bg-black"
                  )}
                >
                  <div
                    className={cn(
                      "w-1 h-1 rounded-full border",
                      isDark ? "border-black" : "border-white"
                    )}
                  />
                </div>
              </button>

            </div>

          </div>

        );
      })}

    </div>

  </Container>

</Section>
  );
});

export default CombinedProductSection;