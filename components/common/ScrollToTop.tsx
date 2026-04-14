

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    // Check multiple possible scroll sources
    const scrollTop = 
      window.pageYOffset || 
      document.documentElement.scrollTop || 
      document.body.scrollTop || 
      0;

    // Check if there's a specific "main" or "wrapper" that is scrolling
    const mainElement = document.querySelector('main');
    const wrapperElement = document.getElementById('wrapper'); // adjust if you have a specific ID
    const extraScroll = (mainElement?.scrollTop || 0) || (wrapperElement?.scrollTop || 0);

    if (scrollTop > 300 || extraScroll > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  useEffect(() => {
    // 'true' helps catch events in nested divs (Capture Phase)
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [handleScroll]);

  const forceScrollToTop = () => {
    // 1. Modern Window Scroll
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2. Document Elements
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });

    // 3. Bruteforce search for the scrolling container
    // We find every element on the page that has scrolled and reset it
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTo({ top: 0, behavior: "smooth" });
        // Instant backup if smooth fails
        el.scrollTop = 0;
      }
    });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          // Using both onClick and onPointerDown to ensure the event is caught
          onClick={forceScrollToTop}
          onPointerDown={(e) => e.stopPropagation()} 
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#8D794E] text-white rounded-full flex items-center justify-center shadow-2xl z-[60] cursor-pointer pointer-events-auto border-2 border-white/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1, backgroundColor: '#7A6840' }}
          whileTap={{ scale: 0.9 }}
          style={{ touchAction: 'none' }} // Prevents mobile interference
        >
          <ChevronUp size={30} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}