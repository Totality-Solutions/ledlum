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
    <div className="w-full bg-black mx-auto px-6 lg:px-[70px] py-10 lg:py-[60px] border-t border-white/30">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-2">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={cn(
              "relative overflow-hidden rounded-[10px] transition-all duration-700",
              /* Maintaining Ratio: Using aspect ratio instead of fixed height 
                 Mobile: Smallest width (centered max-w)
                 Tablet: Middle-sized width
                 Desktop: Large flexible width
              */
              "aspect-[4/5] w-full max-w-[300px] md:max-w-[350px] lg:max-w-none lg:flex-1",
            )}
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