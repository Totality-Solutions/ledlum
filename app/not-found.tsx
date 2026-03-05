
import React from 'react';
import Image from 'next/image';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-grow flex flex-col">
        
        {/* 1. TOP HERO SECTION - Optimized */}
        <div className="relative w-full h-[55vh] overflow-hidden border-b border-white/5">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
            alt="Architectural Lighting Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />
          <div className="absolute inset-0 z-20 flex items-start pt-24 pl-10 md:pl-20">
            <p className="text-[22px] md:text-[30px] font-bai font-light leading-tight tracking-tight max-w-xl text-zinc-300">
              transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>

        {/* 2. BOTTOM 404 SECTION */}
        <div className="relative flex flex-col items-center justify-center min-h-[90vh] w-full px-4 overflow-hidden">
          
          {/* GLOBAL BACKGROUND LAYER - Optimized */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
            <Image 
              src="/images/about/ledlumline.png"
              alt="background line"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* ANCHOR WRAPPER */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[800px]">
            
            {/* 2. THE NOT-BG LAYER - Locked to center */}
            <div className="absolute z-0 pointer-events-none w-[100vw] h-[125vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-difference">
              <Image 
                src="/images/blog/not-bg.jpg"
                alt="texture overlay"
                fill
                className="object-cover object-[center_38%]"
              />
            </div>

            {/* 404 Image Container - Optimized */}
            <div className="relative z-10 w-full max-w-[600px] aspect-video">
              <Image 
                src="/404.png" 
                alt="404 Error" 
                fill
                priority
                className="object-contain pointer-events-none select-none transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Typography */}
            <div className="relative z-10 mt-4 text-center space-y-2 font-pop">
              <h1 className="text-white text-xl md:text-2xl font-medium tracking-wide">
                Oops! Page not found
              </h1>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full" />
        </div>
      </main>

      <Footer/>
    </div>
  );
}