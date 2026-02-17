"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface MobileSliderProps {
  children: React.ReactNode[];
  pause?: number;
  direction?: "left" | "right";
  mode?: "buttons" | "swipe";
}

export default function MobileSlider({
  children,
  pause = 3000,
  direction = "left",
  mode = "buttons",
}: MobileSliderProps) {
  const total = children.length;
  if (total === 0) return null;

  const extended = [
    children[total - 1],
    ...children,
    children[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const controls = useAnimationControls();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSwipe = mode === "swipe";
  const showButtons = mode === "buttons";

  const clearAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    clearAuto();
    if (total <= 1) return;

    intervalRef.current = setInterval(() => {
      setPosition((p) => p + 1);
      setCurrentIndex((i) => (direction === "left"
        ? (i + 1) % total
        : (i - 1 + total) % total));
    }, pause);
  }, [clearAuto, pause, direction, total]);

  useEffect(() => {
    if (!isInteracting && !isDragging && !isJumping) {
      startAuto();
    } else {
      clearAuto();
    }
    return clearAuto;
  }, [isInteracting, isDragging, isJumping, startAuto, clearAuto]);

  useEffect(() => {
    if (isJumping || isDragging) return;
    controls.start({
      x: `-${position * 100}%`,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [position, isJumping, isDragging, controls]);

  const handleAnimationComplete = () => {
    if (isJumping) return;
    if (position === total + 1) {
      setIsJumping(true);
      controls.set({ x: `-${1 * 100}%` });
      setPosition(1);
      requestAnimationFrame(() => setIsJumping(false));
    } else if (position === 0) {
      setIsJumping(true);
      controls.set({ x: `-${total * 100}%` });
      setPosition(total);
      requestAnimationFrame(() => setIsJumping(false));
    }
  };

  const handleManualAction = (fn: () => void) => {
    setIsInteracting(true);
    clearAuto();
    fn();
    setTimeout(() => setIsInteracting(false), 800);
  };

  const next = () => handleManualAction(() => {
    setPosition((p) => p + 1);
    setCurrentIndex((i) => (i + 1) % total);
  });

  const prev = () => handleManualAction(() => {
    setPosition((p) => p - 1);
    setCurrentIndex((i) => (i - 1 + total) % total);
  });

  const goTo = (target: number) => handleManualAction(() => {
    setCurrentIndex(target);
    setPosition(target + 1);
  });

  return (
    <div className="relative w-screen overflow-hidden z-0">
      <motion.div
        className="flex w-full touch-none hide-scrollbar"
        animate={controls}
        drag={isSwipe ? "x" : false}
        dragElastic={0.2}
        dragMomentum={false}
        onDragStart={() => {
          if (!isSwipe) return;
          setIsDragging(true);
          setIsInteracting(true);
          clearAuto();
        }}
        onDragEnd={(e, info) => {
          if (!isSwipe) return;
          setIsDragging(false);
          const offset = info.offset.x;
          const threshold = 50;

          if (offset < -threshold) {
            setPosition((p) => p + 1);
            setCurrentIndex((i) => (i + 1) % total);
          } else if (offset > threshold) {
            setPosition((p) => p - 1);
            setCurrentIndex((i) => (i - 1 + total) % total);
          } else {
            controls.start({
              x: `-${position * 100}%`,
              transition: { duration: 0.3, ease: "easeOut" },
            });
          }
          setIsInteracting(false);
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {extended.map((child, i) => (
          <div key={i} className="w-full shrink-0 select-none">
            {child}
          </div>
        ))}
      </motion.div>

      {/* NAVIGATION BUTTONS */}
      {showButtons && (
        <div className="flex justify-center gap-6 mt-6 pb-2">
          <button
            onClick={prev}
            /* Using var(--secondary-color) for button background */
            className="w-14 h-14 rounded-full bg-[var(--secondary-color)] flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
          >
            {/* Using Bai Jamjuree (primary-font) for the arrow symbol */}
            <span className="text-white text-[45px] font-(--primary-light) -mt-1.5 select-none">
              ‹
            </span>
          </button>

          <button
            onClick={next}
            className="w-14 h-14 rounded-full bg-[var(--secondary-color)] flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
          >
            <span className="text-white text-[45px] font-(--primary-light) -mt-1.5 select-none">
              ›
            </span>
          </button>
        </div>
      )}

      {/* INDICATOR DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            /* Using --primary-color for active dot, --gray-color for inactive */
            className={`h-2 rounded-full transition-all duration-500 ${
              currentIndex === i
                ? "bg-[var(--primary-color)] w-8"
                : "bg-[var(--gray-color)] w-2 opacity-50"
            }`}
          />
        ))}
      </div> 
    </div>
  );
}