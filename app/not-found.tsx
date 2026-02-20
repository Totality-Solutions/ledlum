"use client";

import React from 'react';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-grow flex flex-col">
        
        {/* 1. TOP HERO SECTION */}
        <div className="relative w-full h-[55vh] overflow-hidden border-b border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Architectural Lighting Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          <div className="absolute inset-0 z-10 flex items-start pt-24 pl-10 md:pl-20">
            <p className="text-[22px] md:text-[30px] font-bai font-light leading-tight tracking-tight max-w-xl text-zinc-300">
              transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>

     {/* 2. BOTTOM 404 SECTION */}
<div className="relative flex flex-col items-center justify-center min-h-[90vh] w-full px-4 overflow-hidden">
  
  {/* GLOBAL BACKGROUND LAYER (ledlumline) */}
  <div 
    className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30"
    style={{
      backgroundImage: "url('/images/about/ledlumline.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />

  {/* ANCHOR WRAPPER 
      This is the key: by placing the not-bg image inside a container 
      that scales with the 404 image, they will NEVER detach.
  */}
  <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[800px]">
    
    {/* 2. THE NOT-BG LAYER - Now locked to the 404 image's center */}
    <div 
      className="absolute z-0 pointer-events-none w-[100vw] h-[125vh]"
      style={{
        backgroundImage: "url('/images/blog/not-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 38%', // Your exact requested position
        backgroundRepeat: 'no-repeat',
        mixBlendMode: 'difference',
        opacity: 0.2,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)', // Keeps it perfectly centered on the 404
      }}
    />

    {/* 404 Image Container */}
    <div className="relative z-10 w-full max-w-[600px] aspect-video">
      <img 
        src="/404.png" 
        alt="404 Error" 
        className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-700 hover:scale-105"
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