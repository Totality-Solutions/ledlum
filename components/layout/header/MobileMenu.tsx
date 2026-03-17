"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; 
import Link from "next/link";
import { primaryNavigation, sideNavigation } from "@/config/navigation";

const HEADER_HEIGHT = "90px";

export default function MobileMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Strict Background Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`lg:hidden fixed inset-0 bg-black transition-all duration-300 z-[9999] ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      style={{ top: HEADER_HEIGHT }}
    >
      <div className="px-6 py-8 flex flex-col gap-8 h-full overflow-y-auto overscroll-contain pb-32">
        {[...sideNavigation, ...primaryNavigation].map((item, idx) => (
          <Link 
            key={idx} 
            href={item.href} 
            onClick={onClose} 
            className="text-white body-sm font-semibold hover:text-[#AD9463] transition-colors py-2"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>,
    document.body 
  );
}