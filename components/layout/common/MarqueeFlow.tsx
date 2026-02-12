"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  visibleItems?: number; // 4 for Arrivals, 6 for Partners
  gap?: number;
  speed?: number; // Auto-play interval in ms
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  visibleItems = 4,
  gap = 20,
  speed = 3000,
}: MarqueeFlowProps<T>) {
  // Triple the items to create the infinite loop effect
  const tripleItems = [...items, ...items, ...items];
  
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [stepWidth, setStepWidth] = useState(0); 
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Logic to calculate exact item width based on container size
  const updateLayout = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Math: (Container - Total Gaps) / Visible Items
      const widthOfOneItem = (containerWidth - ((visibleItems - 1) * gap)) / visibleItems;
      setStepWidth(widthOfOneItem + gap);
    }
  }, [visibleItems, gap]);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const nextSwipe = useCallback(() => {
    setTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (isPaused || stepWidth === 0) return;
    const interval = setInterval(nextSwipe, speed);
    return () => clearInterval(interval);
  }, [nextSwipe, isPaused, stepWidth, speed]);

  const handleTransitionEnd = () => {
    // If we reach the end of the second set, jump back to the first set instantly
    if (currentIndex >= items.length * 2) {
      setTransitionEnabled(false);
      setCurrentIndex(items.length);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden" 
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex" 
        onTransitionEnd={handleTransitionEnd}
        style={{ 
          gap: `${gap}px`,
          transform: `translateX(-${currentIndex * stepWidth}px)`,
          transition: transitionEnabled ? "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)" : "none"
        }}
      >
        {tripleItems.map((item, index) => (
          <div 
            key={`${index}`} 
            className="shrink-0"
            style={{ 
              // CSS calc ensures items always fit the container width perfectly
              width: `calc((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})` 
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}