"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "@/lib/icons";

export default function ProductShowcaseGallery({
  images,
}: {
  images: string[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  // Lock body scroll while the lightbox is open, and wire up keyboard nav.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, close, showPrev, showNext]);

  return (
    <div className="w-full bg-black mx-auto px-6 lg:px-[70px] py-10 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setOpenIndex(index)}
            className="relative aspect-[6/5] w-full rounded-[10px] overflow-hidden bg-white"
          >
            <Image
              src={src}
              alt={`Gallery ${index + 1}`}
              fill
              className="object-contain  hover:scale-103 transition-all duration-700 cursor-pointer"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={close}
          />

          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 group transition-all"
          >
            <X className="text-white w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 transition-all"
              >
                <ChevronLeft className="text-white w-6 h-6" />
              </button>
              <button
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 transition-all"
              >
                <ChevronRight className="text-white w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={openIndex}
              src={images[openIndex!]}
              alt={`Gallery ${openIndex! + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-body-xs font-pop">
              {openIndex! + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
