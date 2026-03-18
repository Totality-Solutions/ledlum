"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { primaryNavigation, sideNavigation } from "@/config/navigation";

const HEADER_HEIGHT = "60px";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {

  // 🔒 Lock background scroll completely
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

  return (
    <div
      className={`lg:hidden absolute left-0 w-full z-50 transition-all duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      style={{
        top: HEADER_HEIGHT,
        height: `calc(100vh - ${HEADER_HEIGHT})`,
      }}
    >
      {/* Drawer */}
      <div className="bg-black fixed w-full h-full overflow-y-auto  px-6 py-6 flex flex-col gap-6 rounded-b-2xl">
        
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
    </div>
  );
}