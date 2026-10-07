"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from "react";

export interface CarouselHandle {
  scrollLeft: () => void;
  scrollRight: () => void;
}

export interface CarouselState {
  isCarousel: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

interface CarouselProps {
  items: ReactNode[];
  // Card width per breakpoint. Must account for the gap so N cards fit
  // exactly, e.g. 3 per row with a 24px gap: lg:w-[calc(33.333%-16px)].
  itemWidthClassName?: string;
  gapClassName?: string;
  className?: string;
  onStateChange?: (state: CarouselState) => void;
}

// Horizontal row of cards that swipes/scrolls when there are more than fit.
// Layout is pure CSS (responsive card widths), so server and client render
// the same thing on every device; JS only tracks whether there is more to
// scroll to, for the arrow buttons.
const Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    items,
    itemWidthClassName = "w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]",
    gapClassName = "gap-3 sm:gap-6",
    className = "",
    onStateChange,
  },
  ref
) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  // Re-check whenever the row or its cards change size (rotation, resize,
  // images/fonts loading), not just on window resize.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [items.length, updateScrollButtons]);

  const isCarousel = canScrollLeft || canScrollRight;

  useEffect(() => {
    onStateChange?.({ isCarousel, canScrollLeft, canScrollRight });
  }, [isCarousel, canScrollLeft, canScrollRight, onStateChange]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = firstItem ? firstItem.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({
    scrollLeft: () => scrollBy("left"),
    scrollRight: () => scrollBy("right"),
  }));

  return (
    <div className={`relative z-10 w-full max-w-full overflow-hidden ${className}`}>
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className={`flex w-full max-w-full overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain py-2 [&::-webkit-scrollbar]:hidden ${gapClassName}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div key={index} className={`shrink-0 min-w-0 snap-start ${itemWidthClassName}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;
