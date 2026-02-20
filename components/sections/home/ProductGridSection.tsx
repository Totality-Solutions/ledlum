"use client";

import React, { memo, useState } from 'react';
import Image from 'next/image';
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import MarqueeFlow from "@/components/layout/common/MarqueeFlow"; 

import BgImg from '@/public/images/home/home-bg1.png';
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import Arrival1 from "@/public/images/home/new-arrival.png";

// --- DATA ---
const NEW_ARRIVALS = [
  { id: 1, img: Arrival1 },
  { id: 2, img: Arrival1 },
  { id: 3, img: Arrival1 },
  { id: 4, img: Arrival1 },
  { id: 5, img: Arrival1 },
  { id: 6, img: Arrival1 },
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
      className="relative min-h-screen py-16 lg:py-24 flex flex-col gap-24 lg:gap-32 overflow-hidden bg-cover bg-center bg-no-repeat will-change-transform"
      style={{ 
        backgroundImage: `url(${BgImg.src})`,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />
      {/* SECTION 1: BESTSELLERS GRID */}
      <Container className="max-w-[1280px] 2xl:max-w-[1600px] relative z-10 px-6 lg:px-10">
        <div className="flex flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="sm:mob-h1 desk-h1 text-white font-bai">Designed In-House.</h2>
            <p className="sm:mob-h2 desk-h2 text-white/80 font-bai">Built <span className="lowercase">to</span> Last.</p>
          </div>
          
          <div className="flex flex-row md:flex-col items-end gap-6">
            <div className="flex items-center gap-6 lg:gap-10">
              <div className="hidden lg:flex items-center gap-2">
                {["Ceiling", "Table", "Wall", "Floor lights"].map((item, index, array) => (
                  <React.Fragment key={item}>
                    <span className="body-xs text-white/40 font-bai cursor-pointer hover:text-white transition-colors uppercase tracking-widest">{item}</span>
                    {index !== array.length - 1 && <div className="w-8 h-[1px] bg-white opacity-20" />}
                  </React.Fragment>
                ))}
              </div>
              <span className="hidden md:block body-sm text-white">Bestsellers</span>
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
                    unoptimized 
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
                    <span className="body font-semibold font-pop leading-tight text-white">{product.title}</span>
                    <span className="body-xs font-pop mt-0.5 text-white/60">{product.sub}</span>
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
      <Container className="max-w-[1280px] 2xl:max-w-[1600px] relative z-10 px-6 lg:px-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="body text-white tracking-[0.3em] flex items-center gap-2 uppercase font-bai">
            <span>New</span><span className="font-semibold">Arrivals</span>
          </h2>
          <p className="body-xs text-white opacity-60 font-pop italic">Experience the Fan’s</p>
        </div>

        <MarqueeFlow
          items={NEW_ARRIVALS}
          gap={20}
          speed={3000}
          renderItem={(item) => (
            <div className="relative aspect-[3/4] rounded-[12px] lg:rounded-[25px] overflow-hidden group shadow-xl w-full">
              <Image 
                src={item.img} 
                alt="New Arrival" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform" 
                style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }} 
                unoptimized 
                sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw" />
              <div className="absolute bottom-6 right-6 w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-1.5 h-1.5 border-[1.5px] border-white rounded-full" />
                <div className="w-1.5 h-1.5 border-[1.5px] border-white rounded-full" />
              </div>
            </div>
          )}
        />
      </Container>
    </Section>
  );
});

export default CombinedProductSection;