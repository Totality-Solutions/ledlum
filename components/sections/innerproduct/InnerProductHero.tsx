"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/layout/Section";

// Static imports or dynamic paths
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import productImg3 from "@/public/images/home/new-arrival.png";
import productImg4 from "@/public/images/home/new-arrival.png";

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
        /* 1. Adjusted mobile height to 85vh and used lg:min-h-screen */
        <Section className="relative w-full h-[85vh] lg:min-h-screen bg-black flex items-center justify-center overflow-hidden lg:pt-24 lg:pb-12 lg:px-6 xl:px-16">
            
            {/* --- MOBILE/TABLET OVERLAYS --- */}
            <div className="lg:hidden">
                {/* 2. Moved back button down (top-24) to avoid overlapping the fixed header */}
                <Link 
                    href="/product" 
                    className="absolute top-24 left-6 z-50 flex items-center gap-4 text-white"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-xl will-change-filter" 
                        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}>
                        <span className="text-xl">←</span>
                    </div>
                    <span className="text-base font-light tracking-wide opacity-90">Back to List</span>
                </Link>

                {/* Navigation Arrows Overlay */}
                <div className="absolute bottom-18 right-6 z-50 flex gap-3">
                    <button 
                        onClick={prevImage}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-xl"
                    >
                        ←
                    </button>
                    <button 
                        onClick={nextImage}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-xl"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* --- MAIN WRAPPER --- */}
            <div className="w-full h-full max-w-[1440px] flex flex-col lg:flex-row items-stretch lg:gap-10">
                
                {/* SIDEBAR: (Hidden on Mobile/Tab UI until lg: breakpoint) */}
                <div className="hidden lg:flex flex-col w-auto shrink-0 justify-between py-4 z-10">
                    <div className="flex flex-col gap-10">
                        <Link 
                            href="/product" 
                            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors body-xs uppercase tracking-[0.2em]"
                        >
                            <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
                            <span>Back</span>
                        </Link>

                        <div className="flex flex-col gap-4 no-scrollbar">
                            {PRODUCT_IMAGES.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-20 h-20 shrink-0 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                                        activeIndex === index 
                                            ? "border-[#AD9463] bg-[#1A1A1A]" 
                                            : "border-white/5 bg-[#111111] opacity-40 hover:opacity-100"
                                    }`}
                                >
                                    <Image src={img} alt={`Angle ${index}`} fill className="object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-12">
                        <button onClick={prevImage} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">←</button>
                        <button onClick={nextImage} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">→</button>
                    </div>
                </div>

                {/* MAIN VIEWPORT */}
                {/* 3. Changed md: classes to lg: and reduced mobile padding */}
                <div className="flex-1 relative w-full h-full bg-[#0A0A0A] lg:rounded-[40px] lg:border lg:border-white/5 overflow-hidden flex items-center justify-center shadow-2xl">
                    
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,148,99,0.05)_0%,transparent_75%)] pointer-events-none" />
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full h-full max-w-[85%] max-h-[85%]"
                        >
                            <Image
                                src={PRODUCT_IMAGES[activeIndex]}
                                alt="Main Product View"
                                fill
                                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] lg:drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Mobile Pagination Dot Indicator */}
                    <div className="absolute bottom-6 flex lg:hidden gap-1.5 z-40">
                        {PRODUCT_IMAGES.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1 rounded-full transition-all duration-500 backdrop-blur-md will-change-filter ${activeIndex === i ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`} 
                                style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProductInnerHero;