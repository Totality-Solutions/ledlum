"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

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
  const [visibleItems, setVisibleItems] = useState(4); // how many cards shown
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const isResettingRef = useRef(false);

  const scrollBy = 1; // ← always scroll 1 card at a time

  const cloneCount = visibleItems; // clone enough to fill the visible area

  const cloned = useMemo(() => {
    if (items.length === 0) return [];
    const tail = items.slice(-cloneCount);
    const head = items.slice(0, cloneCount);
    return [...tail, ...items, ...head];
  }, [items, cloneCount]);

  const realOffset = cloneCount;

  // Card width is based on visibleItems (how many show at once)
  const getTransform = (idx: number) =>
    `translateX(calc(${idx} * -1 * (100% + ${gap}px) / ${visibleItems}))`;

  const jumpTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = getTransform(idx);
    void track.offsetHeight;
  };

  const slideTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "transform 700ms ease-in-out";
    track.style.transform = getTransform(idx);
  };

  // Responsive — only affects how many cards are SHOWN, not scroll step
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleItems(2);       // mobile: show 2
      else if (w < 1024) setVisibleItems(3); // tablet: show 3
      else setVisibleItems(4);               // desktop: show 4
    };
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 150);
    };
    update();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Reset position when layout changes
  useEffect(() => {
    indexRef.current = realOffset;
    jumpTo(realOffset);
  }, [visibleItems, realOffset]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Infinite slide engine — scrolls by 1 card each tick
  useEffect(() => {
    if (!isVisible || items.length === 0 || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (isResettingRef.current) return;

      const next = indexRef.current + scrollBy; // ← move 1 card
      indexRef.current = next;
      slideTo(next);

      // When we've scrolled through all real items → jump back seamlessly
      if (next >= realOffset + items.length) {
        isResettingRef.current = true;
        setTimeout(() => {
          indexRef.current = realOffset;
          jumpTo(realOffset);
          isResettingRef.current = false;
        }, 720);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [speed, isVisible, items.length, visibleItems, realOffset, isPaused]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          transform: getTransform(realOffset),
          willChange: "transform",
        }}
      >
        {cloned.map((item: T, i: number) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              // Card size is always based on visibleItems
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