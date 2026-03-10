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
    <Section 
      className="relative min-h-screen bg-black flex flex-col gap-24 lg:gap-32 overflow-hidden bg-cover bg-center bg-no-repeat will-change-transform"
    >
    <Image
      src={BgImg}
      alt="Background"
      fill
      priority
      className="object-cover "
    />
      {/* <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" /> */}
      {/* SECTION 1: BESTSELLERS GRID */}
      <Container className="relative z-20 ">
        <div className="flex flex-row-2 md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <div className="max-w-full md:max-w-xl">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white ">Designed In-House.</h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">Built <span className="lowercase">to</span> Last.</p>
          </div>
          
          <div className="flex flex-row md:flex-col items-end gap-6">
            <div className="flex items-center gap-6 lg:gap-10">
              {/* <div className="hidden lg:flex items-center gap-2">
                {["Ceiling", "Table", "Wall", "Floor lights"].map((item, index, array) => (
                  <React.Fragment key={item}>
                    <span className="body-xs text-white/40 font-bai cursor-pointer hover:text-white transition-colors uppercase tracking-widest">{item}</span>
                    {index !== array.length - 1 && <div className="w-8 h-[1px] bg-white opacity-20" />}
                  </React.Fragment>
                ))}
              </div> */}
              <span className="hidden md:block text-body-sm lg:text-body font-pop font-regular text-white">Bestsellers</span>
            </div>
              
            <button onClick={toggleAll} className={cn("w-[40px] h-[20px] lg:w-[70px] lg:h-[36px] rounded-full p-1.5 flex items-center transition-colors duration-500 shadow-lg", isAllDark ? "bg-black" : "bg-white")}>
              <div className={cn("w-4 h-4 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-transform duration-500 ease-in-out", isAllDark ? "translate-x-4 lg:translate-x-8 bg-white" : "translate-x-0 bg-black")}>
                <div className={cn("w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full border-[1.5px]", isAllDark ? "border-black" : "border-white")} />
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 justify-items-center">
          {BESTSELLERS.map((product) => {
            const isDark = activeModes[product.id] ?? isAllDark;
            return (
              <div key={product.id} className="flex flex-col w-full max-w-[300px] lg:max-w-none group relative">
                {/* IMAGE CONTAINER */}
                <div className="relative w-full aspect-[3/4] rounded-[12px] lg:rounded-[25px] overflow-hidden shadow-2xl">
                  <Image 
                    src={isDark ? product.darkImg : product.lightImg} 
                    alt={product.title} 
                    fill 
                    className="object-cover transition-opacity duration-700 ease-in-out" 
                    sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw" />
                  
                  {/* INFO CONTAINER: Desktop Overlay Mode */}
                  <div className={cn(
                    "hidden lg:flex absolute bottom-0 left-0 w-full h-[110px] px-8 items-center justify-between transition-all",
                    "bg-white/20 backdrop-blur-[20px] border-t border-white/20 will-change-filter rounded-b-[25px]"
                  )}>
                    <div className="flex flex-col">
                      <span className="body font-semibold font-pop leading-tight text-black">{product.title}</span>
                      <span className="body-xs font-pop mt-0.5 text-black/70">{product.sub}</span>
                    </div>
                    <button 
                      onClick={() => toggleIndividual(product.id)} 
                      className={cn(
                        "w-[54px] h-[28px] rounded-full p-1 flex items-center transition-all duration-300", 
                        isDark ? "bg-black" : "bg-white"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-500", 
                        isDark ? "translate-x-6 bg-white" : "translate-x-0 bg-black"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full border", isDark ? "border-black" : "border-white")} />
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* INFO CONTAINER: Mobile/Tablet Relative Mode */}
                <div className="flex lg:hidden w-full justify-between items-center pt-4 px-1">
                  <div className="flex flex-col">
                    <span className="text-body-sm lg:text-body font-pop font-regular leading-tight text-white">{product.title}</span>
                    <span className="text-body-xs lg:text-body-sm font-pop font-regular mt-0.5 text-white/60">{product.sub}</span>
                  </div>
                  <button 
                    onClick={() => toggleIndividual(product.id)} 
                    className={cn(
                      "w-[46px] h-[24px] rounded-full p-1 flex items-center transition-all duration-300", 
                      isDark ? "bg-black" : "bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-transform duration-500", 
                      isDark ? "translate-x-5 bg-white" : "translate-x-0 bg-black"
                    )}>
                      <div className={cn("w-1 h-1 rounded-full border", isDark ? "border-black" : "border-white")} />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* SECTION 2: NEW ARRIVALS CAROUSEL */}
      <Container className="relative z-20">
  <div className="flex justify-between items-center mb-10">
    <h2 className="text-body-sm lg:text-body font-pop font-regular text-white">
      New Arrivals
    </h2>
    <p className="text-body-sm lg:text-body font-pop font-regular text-white">Experience the Fan’s</p>
  </div>

  <MarqueeFlow
    items={NEW_ARRIVALS}
    gap={20}
    speed={3000}
    renderItem={(item) => (
      /* Each card is now a Link providing unique navigation based on item data */
      <Link 
        href={item.href || "#"} 
        className="relative block aspect-[3/4] w-full rounded-[12px] overflow-hidden group shadow-xl"
      >
        {/* The Image fills the entire card */}
        <Image 
          src={item.img} 
          alt={item.title || "New Arrival"} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform rounded-[16px] " 
          style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }} 
          sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw" 
        />

        {/* The Overlay: Custom footer with left text and right arrow */}
        <div className="absolute bottom-0 left-0 w-full bg-black p-4 flex items-center justify-between">
          
          {/* Left Side: Title */}
          <span className="text-body-sm lg:text-body font-pop font-regular text-white truncate pr-4">
            {item.title}
          </span>

          {/* Right Side: Normal Circle Button with Arrow */}
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#9a8c66] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
          
        </div>
      </Link>
    )}
  />
</Container>
    </Section>
  );
});

export default CombinedProductSection;