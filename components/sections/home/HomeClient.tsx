"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Achievements from "./Achievements";
import ProjectSection from "./ProjectSection";
import AutoCarousel from "./AutoCarousel";
import { PopupForm } from "@/components/common/PopupForm";

// --- ASSETS ---
import BgImg from '@/public/images/home/home-bg3.png';

const HomeClient = () => {
  const [showForm, setShowForm] = useState(false);

  const handleTriggerForm = useCallback(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* --- SHARED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <Image
          src={BgImg}
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover"
        />
      </div>

      {/* --- SHARED TEXTURE OVERLAY --- */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 md:opacity-30">
        <Image 
          src="/images/about/ledlumline.png"
          alt="background texture"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      {/* Wrapping these 3 ensures they all sit on top of the same background */}
      <div className="relative z-10">
        <Achievements onTriggerForm={handleTriggerForm} />
        <ProjectSection />
        <AutoCarousel />
      </div>

      {/* FLOATING POPUP */}
      {/* {showForm && (
        <div className="fixed bottom-6 right-6 z-[50]">
          <PopupForm 
            isVisible={showForm} 
            onClose={() => setShowForm(false)} 
          />
        </div>
      )} */}
    </div>
  );
};

export default HomeClient;