"use client";

import React from 'react';

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] flex flex-col overflow-hidden selection:bg-white/20">
      
      {/* 1. TOP IMAGE - FULLY VISIBLE & PROPER */}
      <div className="relative h-[45vh] w-full shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Architectural Lighting"
          className="w-full h-full object-cover" 
        />
        
        {/* Top Text Overlay exactly as per your image */}
        <div className="absolute top-12 left-8 md:left-20 z-20">
          <h2 className="text-white text-3xl md:text-5xl font-extralight tracking-tight leading-[1.1] max-w-3xl drop-shadow-2xl">
            Transforming architectural lighting through <br/>
            <span className="font-bold">innovation, performance and design excellence.</span>
          </h2>
        </div>
      </div>

      {/* 2. BOTTOM SECTION - STATIC LIQUID GLASS 404 */}
      <div className="relative flex-grow flex flex-col items-center justify-center bg-black pt-10">
        
        {/* Subtle Static Grid Background */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative flex flex-col items-center">
          {/* THE 404 - STATIC LIQUID FILL EFFECT */}
          <div className="relative leading-none">
            <h1 className="static-liquid-text text-[160px] md:text-[320px] lg:text-[480px] font-black leading-none tracking-tighter select-none">
              404
            </h1>
            
            {/* Static Glass Outline Overlay */}
            <h1 className="absolute inset-0 text-[160px] md:text-[320px] lg:text-[480px] font-black leading-none tracking-tighter select-none text-transparent pointer-events-none"
                style={{ 
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.15)',
                  filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.05))'
                }}>
              404
            </h1>
          </div>

          {/* UPDATED TEXT: Lowercase and clearly below the 404 */}
          <p className="text-white/40 text-sm md:text-base tracking-[0.4em] font-light mt-4 md:mt-8 relative z-10">
            oops, page not found
          </p>
        </div>
      </div>

      {/* STATIC NOISE OVERLAY FOR TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <style jsx>{`
        .static-liquid-text {
          background: linear-gradient(
            180deg, 
            rgba(255,255,255,0.3) 0%, 
            rgba(255,255,255,0.15) 45%, 
            rgba(255,255,255,0.02) 52%, 
            transparent 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </main>
  );
}