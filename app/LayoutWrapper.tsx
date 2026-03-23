"use client";

import { useState } from "react";
import Preloader from "@/app/PreLoader";

export default function LayoutWrapper({ 
  children, 
  pageLoader 
}: { 
  children: React.ReactNode, 
  pageLoader: React.ReactNode 
}) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {/* Preloader triggers isReady when it's safe to show the site */}
      <Preloader onComplete={() => setIsReady(true)} />
      
      <div 
        style={{ 
          opacity: isReady ? 1 : 0, 
          visibility: isReady ? "visible" : "hidden",
          transition: "opacity 0.8s ease-in-out" 
        }}
      >
        {pageLoader}
        {children}
      </div>
    </>
  );
}