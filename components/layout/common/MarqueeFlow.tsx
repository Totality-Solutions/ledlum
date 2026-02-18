"use client";

import React, { useEffect, useState } from "react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  speed?: number;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  gap = 24,
  speed = 3500,
}: MarqueeFlowProps<T>) {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const [transition, setTransition] = useState(true);

  /* ---------------- Responsive ---------------- */

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) setVisibleItems(1);
      else if (w < 1024) setVisibleItems(2);
      else setVisibleItems(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ---------------- Infinite Slide ---------------- */

  const duplicated = [...items, ...items];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    if (index >= items.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 700);

      setTimeout(() => {
        setTransition(true);
      }, 750);
    }
  }, [index, items.length]);

  return (
    <div className="w-full overflow-hidden">
      <div
  className={`flex ${
    transition ? "transition-transform duration-700 ease-in-out" : ""
  }`}
  style={{
    gap: `${gap}px`,
    transform: `translateX(calc(-${index} * (100% / ${visibleItems})))`,
  }}
>

        {duplicated.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              flex: `0 0 calc((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`,
            }}
          >
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
