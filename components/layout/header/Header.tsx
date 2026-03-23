"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigation, sideNavigation } from "@/config/navigation";
import MobileMenu from "./MobileMenu"; 

// Local Image Imports
import LogoImg from "@/public/images/logo/LEDLUM_LOGO.svg";
import MenuIcon from "@/public/images/icons/menu_icon.png";

const HEADER_HEIGHT = "90px";

const Header = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
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
    // 🔥 FIX: Wrap in a fragment <> ... </> 
    <>
      <header ref={headerRef} className="sticky top-0 left-0 w-full z-[60] bg-black lg:px-12 px-3">
        {/* TOP BAR */}
        <div 
          className="w-full flex justify-between items-center backdrop-blur-lg text-white will-change-filter relative z-50" 
          style={{ 
            height: HEADER_HEIGHT,
            transform: 'translate3d(0, 0, 0)', 
            backfaceVisibility: 'hidden' 
          }}
        >
          <Link href="/" onClick={closeAll} className="flex items-center gap-3">
            <div className="relative w-30 h-30 lg:w-40 lg:h-40">
              <Image src={LogoImg} alt="LEDLUM Logo" fill className="object-cover" priority />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-14 h-full">
            {primaryNavigation.map((link) => (
              <Link key={link.title} href={link.href} className="relative h-full flex items-center group">
                <span className="body-sm transition-colors text-white hover:text-[#AD9463]">
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              ref={menuIconRef}
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
              className="hidden lg:block transition-transform hover:scale-110 active:scale-95"
            >
              <Image src={MenuIcon} alt="Open Menu" width={28} height={28} className="brightness-0 invert" />
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden transition-transform active:scale-90 z-50">
              {mobileOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <Image src={MenuIcon} alt="Toggle Menu" width={28} height={28} className="brightness-0 invert" />
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP DROPDOWN */}
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

        {/* 🔥 FIX: MobileMenu is now OUTSIDE the <header> tag */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;