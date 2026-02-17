"use client";

import React from "react";

interface GalleryProps {
  images?: string[];
}

export const ProductShowcaseGallery = ({
  images = [
    "https://placehold.co/437x531",
    "https://placehold.co/437x531",
    "https://placehold.co/405x531",
  ],
}: GalleryProps) => {
  return (
    <div className="w-full bg-black mx-auto px-6 md:px-[70px] py-[60px] border-t border-white/30 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4 lg:gap-2.5">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={cn(
              "relative overflow-hidden rounded-[10px] ",
              index === 2 ? "w-full md:w-[405px]" : "flex-1 w-full"
            )}
            style={{ height: '531px' }}
          >
            <img 
              src={src} 
              alt={`Lifestyle detail ${index + 1}`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper for classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}