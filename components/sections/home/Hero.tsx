"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "@/components/common/SmartImage";
import { cdnImg } from "@/lib/cdn";
import clsx from "clsx";

type HeroProps = {
  type?: "image" | "video";
  src: string | StaticImageData;
  // Poster for the video, and the banner shown on data saver instead of it.
  poster?: string;
  overlay?: boolean;
  children?: React.ReactNode;
};

const Hero = memo(function Hero({
  type = "image",
  src,
  overlay = true,
  poster = cdnImg("/images/home/home-hero.webp"),
  children,
}: HeroProps) {
  // Video plays on all devices, except on data-saver / slow connections where
  // the poster image is shown instead.
  const [lowData, setLowData] = useState(false);
  useEffect(() => {
    const conn = (navigator as any).connection;
    if (conn && (conn.saveData || ["slow-2g", "2g"].includes(conn.effectiveType))) {
      setLowData(true);
    }
  }, []);

  const useVideo = type === "video" && !lowData;

  // Only keep the video playing while the hero is on screen. A background
  // video decoding while the rest of the page scrolls was the cause of the
  // out-of-memory crashes on phones.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [useVideo]);

  return (
    <section className="relative w-full h-[30vh] sm:h-[50vh] lg:h-screen min-h-[230px] max-h-[700px] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* 🎥 VIDEO BACKGROUND */}
      {useVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={typeof src === "string" ? src : ""} />
        </video>
      ) : type === "video" ? (
        /* Data saver / slow connection: static poster image instead */
        <Image
          src={poster}
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