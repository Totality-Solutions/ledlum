"use client";
import React from "react";
import Image from "next/image";

export default function ProductShowcaseGallery({ images }: { images: string[] }) {
  return (
    <div className="w-full bg-black mx-auto px-6 lg:px-[70px] py-10 lg:py-[60px] border-t border-white/10">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-5">
        {images.map((src, index) => (
          <div key={index} className="relative aspect-[4/5] w-full max-w-[400px] md:max-w-none md:flex-1 rounded-[10px] overflow-hidden">
            <Image src={src} alt="Gallery" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}