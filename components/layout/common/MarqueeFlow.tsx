"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MarqueeFlowProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  speed?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
  showArrows?: boolean;
}

export default function MarqueeFlow<T>({
  items,
  renderItem,
  gap = 24,
  speed = 3500,
  mobileCount = 2,
  tabletCount = 3,
  desktopCount = 4,
  showArrows = false,
}: MarqueeFlowProps<T>) {
  const [visibleItems, setVisibleItems] = useState(desktopCount);
  const [activeGap, setActiveGap] = useState(gap);
  const [activeSpeed, setActiveSpeed] = useState(speed);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const isResettingRef = useRef(false);

  const scrollBy = 1;
  const cloneCount = visibleItems;

  const cloned = useMemo(() => {
    if (items.length === 0) return [];
    const tail = items.slice(-cloneCount);
    const head = items.slice(0, cloneCount);
    return [...tail, ...items, ...head];
  }, [items, cloneCount]);

  const realOffset = cloneCount;

  const getTransform = useCallback(
    (idx: number) =>
      `translateX(calc(${idx} * -1 * (100% + ${activeGap}px) / ${visibleItems}))`,
    [activeGap, visibleItems]
  );

  const jumpTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = getTransform(idx);
    void track.offsetHeight;
  }, [getTransform]);

  const slideTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "transform 700ms ease-in-out";
    track.style.transform = getTransform(idx);
  }, [getTransform]);

  const goNext = useCallback(() => {
    if (currentIndex >= items.length - visibleItems) return;
    setIsPaused(true);
    const next = indexRef.current + scrollBy;
    indexRef.current = next;
    setCurrentIndex((prev) => Math.min(prev + scrollBy, items.length - visibleItems));
    slideTo(next);
    setTimeout(() => setIsPaused(false), activeSpeed);
  }, [currentIndex, items.length, visibleItems, scrollBy, slideTo, activeSpeed]);

  const goPrev = useCallback(() => {
    if (currentIndex <= 0) return;
    setIsPaused(true);
    const prev = indexRef.current - scrollBy;
    indexRef.current = prev;
    setCurrentIndex((prev) => Math.max(prev - scrollBy, 0));
    slideTo(prev);
    setTimeout(() => setIsPaused(false), activeSpeed);
  }, [currentIndex, scrollBy, slideTo, activeSpeed]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setVisibleItems(mobileCount);
        setActiveGap(Math.round(gap * 0.5));     // ← half gap on mobile
        setActiveSpeed(Math.round(speed * 0.8)); // ← slightly faster on mobile
      } else if (w < 1024) {
        setVisibleItems(tabletCount);
        setActiveGap(gap);
        setActiveSpeed(speed);
      } else {
        setVisibleItems(desktopCount);
        setActiveGap(gap);
        setActiveSpeed(speed);
      }
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
  }, [mobileCount, tabletCount, desktopCount, gap, speed]);

  useEffect(() => {
    indexRef.current = realOffset;
    jumpTo(realOffset);
  }, [visibleItems, realOffset, activeGap]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
      const next = indexRef.current + scrollBy;
      indexRef.current = next;
      slideTo(next);
      if (showArrows) {
        setCurrentIndex((prev) => Math.min(prev + scrollBy, items.length - visibleItems));
      }

      if (next >= realOffset + items.length) {
        isResettingRef.current = true;
        setTimeout(() => {
          indexRef.current = realOffset;
          if (showArrows) setCurrentIndex(0);
          jumpTo(realOffset);
          isResettingRef.current = false;
        }, 720);
      }
    }, activeSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeSpeed, isVisible, items.length, visibleItems, realOffset, isPaused]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {showArrows && currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#9a8c66]/60 hover:bg-[#9a8c66]/80 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
      )}
      {showArrows && currentIndex < items.length - visibleItems && (
        <button
          onClick={goNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#9a8c66]/60 hover:bg-[#9a8c66]/80 flex items-center justify-center transition-colors"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      )}
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
            gap: `${activeGap}px`,
            transform: getTransform(realOffset),
          }}
        >
          {cloned.map((item: T, i: number) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                flex: `0 0 calc((100% - ${(visibleItems - 1) * activeGap}px) / ${visibleItems})`,
              }}
            >
              {renderItem(item, i % items.length)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}