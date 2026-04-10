
"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import ContactSection from "@/components/sections/contact/hero"; 
import MobileContactModal from "@/components/sections/contact/MobileContactSection";

export default function FirstVisitModal() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check screen size for mobile view
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    const hasSeen = sessionStorage.getItem("ledlum_popup_active");
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- YOUR PREVENT SCROLL LOGIC (UNCHANGED) ---
  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [show]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("ledlum_popup_active", "true");
  };

  if (!mounted || !show) return null;

  return (
    <div 
      className="fixed inset-0 w-screen h-screen flex items-center justify-center p-4" 
      style={{ zIndex: 9999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl transition-all duration-500" onClick={handleClose} />

      <div className="relative z-[10000000] w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-[30px] md:rounded-[40px] shadow-2xl">
        
        {/* Close Button - Responsive sizes */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-[11000000] p-3 md:p-4 bg-white/10 hover:bg-[#8D794E] rounded-full text-white transition-all"
        >
          <X size={isMobile ? 24 : 32} />
        </button>

        <div className="py-8 md:py-10">
          {/* RENDER LOGIC */}
          {isMobile ? <MobileContactModal /> : <ContactSection />}
        </div>
      </div>
    </div>
  );
}