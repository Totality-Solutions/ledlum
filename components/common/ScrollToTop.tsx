"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for half-page visibility
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const halfPage = (scrollHeight - clientHeight) / 2;

      if (window.scrollY > halfPage) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          // Using your colors: #8D794E for primary
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 sm:w-14 sm:h-14 bg-[#8D794E] text-white rounded-full flex items-center justify-center shadow-2xl z-[9999] group border border-white/10"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2, backgroundColor: '#A68F5B' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
              transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
            }}
            className="flex flex-col items-center justify-center"
          >
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform stroke-[2.5px]" />
            
            {/* The "Top" text that reveals on hover */}
            <span className="text-[9px] sm:text-[10px] font-pop font-bold uppercase tracking-tighter absolute mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
              Top
            </span>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}