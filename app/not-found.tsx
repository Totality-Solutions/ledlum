"use client";

import React from 'react';

export default function NotFound() {
  return (
    /* h-screen and overflow-hidden ensures everything stays in one frame */
    <main className="h-screen w-full flex flex-col bg-black overflow-hidden">
      
      {/* 1. TOP IMAGE - Fixed at 40% height to leave room for the 404 */}
      <div className="h-[40vh] w-full shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Architectural Lighting"
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 2. BOTTOM 404 IMAGE - Takes up the remaining 60% height */}
      <div className="flex-grow w-full bg-black flex items-center justify-center p-2">
        <img 
          src="/404-page.png" 
          alt="404 Page" 
          /* 'object-contain' = Full image shown, no cropping.
             'w-full h-full' = Scales up to fill as much space as possible.
          */
          className="w-full h-full object-contain" 
        />
      </div>

    </main>
  );
}