"use client";

import React, { useState, useEffect } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  visibleItems?: number;
  gap?: number;
  speed?: number;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  visibleItems = 4,
  gap = 20,
  speed = 3000,
}: MarqueeFlowProps<T>) {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev >= items.length - visibleItems ? 0 : prev + 1
      );
    }, speed);

    return () => clearInterval(interval);
  }, [items.length, visibleItems, speed]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${index * (100 / visibleItems)}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: `calc((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`,
            }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
