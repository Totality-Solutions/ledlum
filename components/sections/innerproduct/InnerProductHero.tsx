"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import productImg3 from "@/public/images/home/new-arrival.png";
import productImg4 from "@/public/images/home/new-arrival.png";
import Section from "@/components/layout/Section";


// Update this with the actual images for the specific product
const PRODUCT_IMAGES = [
    productImg1, productImg2, productImg3, productImg4
];

const ProductInnerHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  return (
    <Section className="relative w-full min-h-screen bg-black flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-stretch gap-10">
        
        {/* SIDEBAR: Navigation, Thumbnails & Controls */}
        <div className="flex flex-col w-full md:w-auto shrink-0 justify-between py-4 z-10">
          
          <div className="flex flex-col gap-10">
            {/* Back to Products */}
            <Link 
              href="/product" 
              className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors body-xs uppercase tracking-[0.2em]"
            >
              <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
              <span>Back</span>
            </Link>

            {/* Vertical Thumbnail Rail */}
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    activeIndex === index 
                      ? "border-[#AD9463] bg-[#1A1A1A]" 
                      : "border-white/5 bg-[#111111] opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Product angle ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-4 mt-12">
            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              →
            </button>
          </div>
        </div>

        {/* MAIN DISPLAY: Central Image Viewport */}
        <div className="flex-1 relative min-h-[50vh] md:min-h-[75vh] bg-[#0A0A0A] rounded-[40px] border border-white/5 overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,148,99,0.06)_0%,transparent_75%)] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full max-w-[85%] max-h-[85%]"
            >
              <Image
                src={PRODUCT_IMAGES[activeIndex]}
                alt="Detailed product view"
                fill
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Pagination Indicators (Mobile Only) */}
          <div className="absolute bottom-10 flex md:hidden gap-2">
            {PRODUCT_IMAGES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-[#AD9463]' : 'w-2 bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductInnerHero;