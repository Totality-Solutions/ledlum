
"use client";

import { useState, useCallback } from "react"; // 1. Added useCallback
import Achievements from "./Achievements";
import ProjectSection from "./ProjectSection";
import AutoCarousel from "./AutoCarousel";
import { PopupForm } from "@/components/common/PopupForm";

const HomeClient = () => {
  const [showForm, setShowForm] = useState(false);

  // 2. Wrap the toggle in useCallback to stabilize the function identity
  const handleTriggerForm = useCallback(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="relative">
      {/* 3. Pass the stabilized function instead of an inline arrow function */}
      <Achievements onTriggerForm={handleTriggerForm} />

      <ProjectSection />
      <AutoCarousel />

      {/* FLOATING POPUP */}
      <div className="fixed bottom-6 right-6 z-[2147483647] pointer-events-none">
        <div className="pointer-events-auto">
          <PopupForm 
            isVisible={showForm} 
            onClose={() => setShowForm(false)} 
          />
        </div>
      </div>

      
    </div>
  );
};

export default HomeClient;