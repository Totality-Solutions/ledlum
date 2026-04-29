
"use client";

import React, { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import MarqueeFlow from "@/components/layout/common/MarqueeFlow"; 

import BgImg from '@/public/images/home/home-bg1.webp';
import productSeller1 from "@/public/images/home/bestseller/Indoor1.jpeg";
import productSeller2 from "@/public/images/home/bestseller/Indoor2.jpeg";

import productSeller3 from "@/public/images/home/bestseller/Klewe1.jpeg";
import productSeller4 from "@/public/images/home/bestseller/Klewe2.jpeg";

import productSeller5 from "@/public/images/home/bestseller/Outdoor1.jpeg";
import productSeller6 from "@/public/images/home/bestseller/Outdoor2.jpeg";

import productSeller7 from "@/public/images/home/bestseller/Volaris1.png";
import productSeller8 from "@/public/images/home/bestseller/Volaris2.png";
import Arrival1 from "@/public/images/home/product/Outdoor_Catalogue.jpg";
import Arrival2 from "@/public/images/home/product/Indoor_Catalogue.jpg";
import Arrival3 from "@/public/images/home/product/Artizan_Catalogue.jpg";
import Arrival4 from "@/public/images/home/product/Astara_Catalogue.jpg"; 
import Arrival5 from "@/public/images/home/product/Volaris_Catalogue.jpg";
import Arrival6 from "@/public/images/home/product/Klewe_Catalogue.jpg";

// --- DATA ---
const NEW_ARRIVALS = [
  { id: 1, img: Arrival1, title: 'Outdoor', href:"/product/outdoor" },
  { id: 2, img: Arrival2, title: 'Indoor', href:"/product/indoor" },
  { id: 3, img: Arrival3, title: 'Artizan', href:"/product/artizan" },
  { id: 4, img: Arrival4, title: 'Astara', href:"/product/astara" },
  { id: 5, img: Arrival5, title: 'Volaris', href:"/product/volaris" },
  { id: 6, img: Arrival6, title: 'Klewe', href:"/product/klewe" },
];

const BESTSELLERS = [
  { id: 1, title: 'Indoor Lights', sub: 'Nordic Pendant', lightImg: productSeller2, darkImg: productSeller1 },
  { id: 3, title: 'Outdoor Lights', sub: 'Globe Minimal', lightImg: productSeller6, darkImg: productSeller5 },
  { id: 4, title: 'Volaris Fans', sub: 'Cone Classic', lightImg: productSeller8, darkImg: productSeller7 },
  { id: 2, title: 'Klewe Lights', sub: 'Wooden Tier', lightImg: productSeller4, darkImg: productSeller3 },
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

  // --- DOWNLOAD HANDLER ---
  const handleDownload = (e: React.MouseEvent, imgSrc: any, fileName: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    // Handle both StaticImageData objects and string paths
    link.href = typeof imgSrc === 'string' ? imgSrc : imgSrc.src;
    link.download = `${fileName.replace(/\s+/g, '-').toLowerCase()}-ledlum.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      className="object-cover relative -z-20 "
    />
    <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
                          <Image 
                            src="/images/about/ledlumline.webp"
                            alt="background texture"
                            fill
                            className="object-cover object-center"
                          />
    </div>

      {/* SECTION 1: BESTSELLERS GRID */}
      <Container className="relative z-20 ">
        <div className="flex flex-row-2 md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <div className="max-w-full md:max-w-xl">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white ">Designed In-House.</h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">Built <span className="lowercase">to</span> Last.</p>
          </div>
          
          <div className="flex flex-row md:flex-col items-end gap-6">
            <div className="flex items-center gap-6 lg:gap-10">
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
                      {/* <span className="body-xs font-pop mt-0.5 text-black/70">{product.sub}</span> */}
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
            Product Collection
          </h2>
          <p className="text-body-sm lg:text-body font-pop font-regular text-white">Product Catalog</p>
        </div>

        <MarqueeFlow
          items={NEW_ARRIVALS}
          gap={20}
          speed={3000}
          
          renderItem={(item) => (
            <Link 
              href={item.href || "#"} 
              className="relative block aspect-[3/4] w-full rounded-[12px] overflow-hidden group shadow-xl"
            >
              <Image 
                src={item.img} 
                alt={item.title || "New Arrival"} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform rounded-[16px] " 
                style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }} 
                sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw" 
              />

              {/* The Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between">
                
                {/* Left Side: Title */}
                <span className="text-body-sm lg:text-body font-pop font-regular text-white truncate pr-4">
                  {item.title}
                </span>

                <div className="flex items-center gap-3">
                  {/* DOWNLOAD ICON */}
                  <button 
                    onClick={(e) => handleDownload(e, item.img, item.title)}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 hover:text-black transition-all cursor-pointer"
                  >
                   <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>

                  {/*  */}


                  {/*  */}

                  {/* Arrow Side */}
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
              </div>
            </Link>
          )}
        />
      </Container>
    </Section>
  );
});

export default CombinedProductSection;