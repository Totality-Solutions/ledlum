"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ImageSliderCardProps {
  images: (string | StaticImageData)[];
  interval?: number;
  className?: string;
}

const InfiniteCarousel: React.FC<ImageSliderCardProps> = ({ 
  images, 
  interval = 5000,
  className = "w-full aspect-square"
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    // Changed bg-gray-200 to bg-black to ensure any gap shows as black, not white
    <div className={cn("relative overflow-hidden rounded-[25px] shadow-xl bg-black", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          // Added a 1% offset (101%) to ensure images overlap slightly, hiding the gap
          initial={{ x: "100.5%" }} 
          animate={{ x: 0 }}
          exit={{ x: "-100.5%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1] 
          }}
          // Added willChange and translateZ to fix sub-pixel rendering lines
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <Image
            src={images[index]}
            alt={`Slide ${index}`}
            fill
            className="object-cover" 
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default InfiniteCarousel;