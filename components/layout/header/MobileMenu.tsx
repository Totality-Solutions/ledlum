"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { primaryNavigation, sideNavigation } from "@/config/navigation";

const HEADER_HEIGHT = "90px";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
  const scrollY = window.scrollY;

  if (isOpen) {
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    // We save the position to the body
    document.body.setAttribute('data-scroll-pos', scrollY.toString());
  } else {
    const savedPos = document.body.getAttribute('data-scroll-pos');

    // 1. Force the scroll behavior to 'auto' (instant) to override CSS smooth scroll
    document.documentElement.style.scrollBehavior = "auto";

    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.removeAttribute('data-scroll-pos');

    if (savedPos) {
      // 2. Perform the snap
      window.scrollTo(0, parseInt(savedPos));
    }

    // 3. Put the smooth scroll back after a tiny delay so normal navigation still works
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 0);
  }

  return () => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.documentElement.style.scrollBehavior = "";
  };
}, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 w-full z-[9999] transition-all duration-300 ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      style={{
        top: HEADER_HEIGHT,
        height: `calc(100dvh - ${HEADER_HEIGHT})`,
      }}
    >
      {/* Semi-transparent Backdrop to prevent interaction with background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"
        onClick={onClose}
      />

      {/* Actual Menu Content */}
      
      <div className="relative z-50 bg-black w-full h-full overflow-y-auto px-6 py-8 flex flex-col gap-6 rounded-b-3xl border-t border-white/10 shadow-2xl">
        {[...sideNavigation, ...primaryNavigation].map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={onClose}
            className="relative z-[60] pointer-events-auto text-white body-sm font-medium hover:text-[#AD9463] transition-colors py-4 block"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>,
    document.body // This sends the menu to the bottom of <body>
  );
}