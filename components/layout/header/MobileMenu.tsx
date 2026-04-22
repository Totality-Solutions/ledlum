"use client";

import { useEffect, useState } from "react";
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
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div
     data-mobile-menu 
      className="lg:hidden fixed inset-0 w-full z-[9999]"
      style={{
        top: HEADER_HEIGHT,
        height: `calc(100dvh - ${HEADER_HEIGHT})`,
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="relative z-50 bg-black w-full h-full overflow-y-auto px-6 py-8 flex flex-col gap-6 rounded-b-3xl shadow-2xl">
        {[...sideNavigation, ...primaryNavigation].map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={onClose}
            className="text-white body-sm font-medium hover:text-[#AD9463] transition-colors py-4 block"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}