"use client";

import React, {
  useState,
  useRef,
  useEffect,
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
  thresholds?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gridColsClassName?: string;
  itemWidthClassName?: string;
  gapClassName?: string;
  className?: string;
  onStateChange?: (state: CarouselState) => void;
}

const Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    items,
    thresholds = { mobile: 1, tablet: 2, desktop: 4 },
    gridColsClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    itemWidthClassName = "sm:w-[46%] lg:w-[calc(25%-18px)]",
    gapClassName = "gap-3 sm:gap-6",
    className = "",
    onStateChange,
  },
  ref
) {
  const [isCarousel, setIsCarousel] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    const handleLayoutMode = () => {
      const width = window.innerWidth;
      let activeCarousel = false;

      if (width >= 1024) {
        activeCarousel = items.length > (thresholds.desktop ?? 4);
      } else if (width >= 640) {
        activeCarousel = items.length > (thresholds.tablet ?? 2);
      } else {
        activeCarousel = items.length > (thresholds.mobile ?? 1);
      }

      setIsCarousel(activeCarousel);
      setTimeout(updateScrollButtons, 100);
    };

    handleLayoutMode();
    window.addEventListener("resize", handleLayoutMode);
    return () => window.removeEventListener("resize", handleLayoutMode);
  }, [items.length, thresholds.mobile, thresholds.tablet, thresholds.desktop]);

  useEffect(() => {
    onStateChange?.({ isCarousel, canScrollLeft, canScrollRight });
  }, [isCarousel, canScrollLeft, canScrollRight, onStateChange]);

  const scrollBy = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollRef.current.scrollLeft - cardWidth
            : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
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
        className={`w-full max-w-full ${gapClassName} ${
          isCarousel
            ? "flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth py-2"
            : `grid ${gridColsClassName}`
        }`}
        style={
          isCarousel
            ? { scrollbarWidth: "none", msOverflowStyle: "none" }
            : undefined
        }
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`shrink-0 min-w-0 snap-center ${
              isCarousel ? `w-full ${itemWidthClassName}` : "w-full"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;