"use client";

import React from "react";
import Image from "next/image";

export default function ProductShowcaseGallery({
  images,
}: {
  images: string[];
}) {
  return (
    <div className="w-full bg-black mx-auto px-6 lg:px-[70px] py-10 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative aspect-[6/5] w-full rounded-[10px] overflow-hidden"
          >
            <Image
              src={src}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-contain grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}