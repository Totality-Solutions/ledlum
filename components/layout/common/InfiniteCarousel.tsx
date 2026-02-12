"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ImageSliderCardProps {
  images: (string | StaticImageData)[];
  interval?: number;
}

const InfiniteCarousel: React.FC<ImageSliderCardProps> = ({ 
  images, 
  interval = 5000 
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[21/9] rounded-[25px] overflow-hidden shadow-xl bg-gray-200">
      {/* 1. REMOVE mode="wait" so images animate simultaneously */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          // 2. Initial state: New image starts just outside the right edge
          initial={{ x: "100%" }}
          // 3. Animate state: New image moves to the center
          animate={{ x: 0 }}
          // 4. Exit state: Old image moves out to the left
          exit={{ x: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1] // Professional cubic-bezier for "snappy" feel
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[index]}
            alt={`Slide ${index}`}
            fill
            // 5. Use object-cover to ensure the image fills the card like your screenshot
            className="object-contain" 
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InfiniteCarousel;