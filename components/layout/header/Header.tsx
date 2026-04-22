

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigation, sideNavigation } from "@/config/navigation";
import MobileMenu from "./MobileMenu"; 

// Local Image Imports
import LogoImg from "@/public/images/logo/LEDLUM - Logo.webp";
// Replace with your actual second logo path
import SecondaryLogoImg from "@/public/images/logo/SECONDARY_LOGO.png"; 
import MenuIcon from "@/public/images/icons/menu_icon.png";

const HEADER_HEIGHT = "90px";

const Header = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // ✅ ignore clicks inside mobile menu
    if (target.closest("[data-mobile-menu]")) return;

    if (headerRef.current && !headerRef.current.contains(target)) {
      setSideMenuOpen(false);
      setMobileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const closeAll = () => {
    setSideMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 left-0 w-full z-[60] bg-black border-b border-white/10"
        style={{ height: HEADER_HEIGHT }}
      >
        {/* ============ MAIN HEADER CONTAINER - 3 PART LAYOUT ============ */}
        <div
          className="w-full h-full flex items-center px-4 sm:px-6 lg:px-12 gap-4 sm:gap-6 lg:gap-0"
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-center gap-4">
  {/* Primary Logo */}
  <Link href="/" onClick={closeAll} className="flex items-center group">
    <div className="relative w-32 h-10 sm:w-36 sm:h-11 lg:w-44 lg:h-12">
      <Image
        src={LogoImg}
        alt="LEDLUM Logo"
        className="object-contain"
        fill
        priority
      />
    </div>
  </Link>

  {/* Divider Line */}
  <div className="h-6 sm:h-7 lg:h-8 w-px bg-white/30" />

  {/* Secondary Logo */}
  <Link
    href="https://allhome.in/"
    target="_blank"
    rel="noopener noreferrer"
    onClick={closeAll}
    className="flex items-center group transition-opacity hover:opacity-80"
  >
    <div className="relative w-20 h-6 sm:w-24 sm:h-7 lg:w-32 lg:h-10">
      <Image
        src={SecondaryLogoImg}
        alt="Secondary Logo"
        className="object-contain"
        fill
      />
    </div>
  </Link>
</div>

          {/* ============ CENTER SECTION: NAVIGATION (DESKTOP ONLY) ============ */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-14 mx-8">
            {primaryNavigation.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={closeAll}
                className="relative group transition-all duration-300"
              >
                <span className="body-sm font-medium text-white/80 group-hover:text-[#AD9463] transition-colors">
                  {link.title}
                </span>
                {/* Animated underline on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#AD9463] to-transparent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* ============ RIGHT SECTION: SECONDARY LOGO + MENU BUTTONS ============ */}

          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 ml-auto flex-shrink-0">
            {/* Desktop Menu Button - Visible on lg+ */}
            <button
              ref={menuIconRef}
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
              className="hidden lg:flex items-center justify-center p-2 transition-all hover:bg-white/10 rounded-lg active:scale-95"
              aria-label="Toggle menu"
            >
              {sideMenuOpen ? (
                // Close icon (X)
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Menu icon (hamburger)
                <Image src={MenuIcon} alt="Open Menu" width={28} height={28} className="brightness-0 invert" />
              )}
            </button>

            {/* Mobile Menu Button - Visible on mobile (< lg) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center p-2 transition-all hover:bg-white/10 rounded-lg active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                // Close icon (X)
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Menu icon (image)
                <Image
                  src={MenuIcon}
                  alt="Menu Icon"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              )}
            </button>
          </div>
        </div>

        {/* ============ DESKTOP DROPDOWN MENU ============ */}
         <div
          className={` w-[90%] hidden lg:block absolute left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out z-50 ${
            sideMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-[-10px] pointer-events-none"
          }`}
          style={{ top: HEADER_HEIGHT }}
        >
          <div className="bg-[#111111] w-full shadow-2xl border border-white/5 overflow-hidden">
            <div className="p-7 flex flex-wrap justify-center content-start gap-4">
              {sideNavigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={closeAll}
                  className="h-auto w-[150px] p-4 flex-shrink-0 bg-[#222222] border border-white/5 flex items-center justify-center px-6 hover:bg-[#AD9463]/20 hover:border-[#AD9463]/40 transition-all cursor-pointer group"
                >
                  <span className="text-content body-sm text-center group-hover:text-white whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;