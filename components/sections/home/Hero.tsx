"use client";

import React, { memo } from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

type HeroProps = {
  type?: "image" | "video";
  src: string | StaticImageData;
  overlay?: boolean;
  children?: React.ReactNode;
};

const Hero = memo(function Hero({
  type = "image",
  src,
  overlay = true,
  children,
}: HeroProps) {
  return (
    <section className="relative w-full h-[30vh] sm:h-[50vh] lg:h-screen min-h-[230px] max-h-[700px] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* 🎥 VIDEO BACKGROUND */}
      {type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={typeof src === "string" ? src : ""} />
        </video>
      ) : (
        /* 🖼️ IMAGE BACKGROUND */
        <Image
          src={src}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0 transition-transform duration-1000 hover:scale-105 will-change-transform"
        />
      )}

      {/* 🌑 Optional Overlay */}
      {/* {overlay && (
        <div className="absolute inset-0 bg-black/40 z-10" />
      )} */}

      {/* 🧩 Content */}
      <div className="relative z-20 text-center text-white px-4">
        {children}
      </div>
    </section>
  );
});

export default Hero;