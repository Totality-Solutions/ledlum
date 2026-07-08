"use client";

import React, { memo, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cdnImg } from "@/lib/cdn";
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
  // On mobile, don't decode a background video — it's the main cause of
  // out-of-memory crashes when combined with the rest of the page.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useVideo = type === "video" && !isMobile;

  return (
    <section className="relative w-full h-[30vh] sm:h-[50vh] lg:h-screen min-h-[230px] max-h-[700px] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* 🎥 VIDEO BACKGROUND */}
      {useVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={cdnImg("/images/home/home-hero.webp")}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={typeof src === "string" ? src : ""} />
        </video>
      ) : type === "video" ? (
        /* Mobile: static poster image instead of the video */
        <Image
          src={cdnImg("/images/home/home-hero.webp")}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0"
        />
      ) : (
        /* 🖼️ IMAGE BACKGROUND */
        <Image
          src={src}
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0 transition-transform duration-1000 hover:scale-105"
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