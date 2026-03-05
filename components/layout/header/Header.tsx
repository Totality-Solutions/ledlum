"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigation, sideNavigation } from "@/config/navigation";

// Local Image Imports
import LogoImg from "@/public/images/logo/LEDLUM_LOGO.svg";
import MenuIcon from "@/public/images/icons/menu_icon.png";
import { Container } from "../Container";

const HEADER_HEIGHT = "90px";

const Header = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [triangleLeft, setTriangleLeft] = useState<number>(0);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  // --- STOP BACKGROUND SCROLLING ---
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; // Locks the body height
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    };
  }, [mobileOpen]);

  // Close menus on outside click
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

  const handleIconClick = () => {
    if (!sideMenuOpen && menuIconRef.current) {
      const rect = menuIconRef.current.getBoundingClientRect();
      setTriangleLeft(rect.left + rect.width / 2);
    }
    setSideMenuOpen(!sideMenuOpen);
  };

  const closeAll = () => {
    setSideMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 left-0 w-full z-50 bg-black">
      <Container>
      {/* TOP BAR */}
      <div 
        className="w-full  flex justify-between items-center backdrop-blur-lg text-white  will-change-filter" 
        style={{ 
          height: HEADER_HEIGHT,
          transform: 'translate3d(0, 0, 0)', 
          backfaceVisibility: 'hidden' 
        }}
      >
        {/* LOGO */}
        <Link href="/" onClick={closeAll} className="flex items-center gap-3">
          <div className="relative w-30 h-30 lg:w-40 lg:h-40">
            <Image src={LogoImg} alt="LEDLUM Logo" fill className="object-cover" priority />
          </div>
        </Link>

        {/* DESKTOP MAIN NAV (Direct Links) */}
        <nav className="hidden lg:flex items-center gap-14 h-full">
          {primaryNavigation.map((link) => (
            <Link key={link.title} href={link.href} className="relative h-full flex items-center group">
              <span className="body-sm transition-colors text-white hover:text-[#AD9463]">
                {link.title}
              </span>
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6">
          <button
            ref={menuIconRef}
            onClick={handleIconClick}
            className="hidden lg:block transition-transform hover:scale-110 active:scale-95"
          >
            <Image 
              src={MenuIcon} 
              alt="Open Menu" 
              width={28} height={28} 
              className="brightness-0 invert" 
            />
          </button>

          {/* Mobile Menu Trigger */}
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
        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 w-max pt-4 transition-all duration-300 ease-in-out z-50 ${
          sideMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-[-10px] pointer-events-none"
        }`}
        style={{ top: HEADER_HEIGHT }}
      >
        <div
          className="absolute top-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#111111] transition-all duration-300 ease-out"
          style={{ left: `calc(${triangleLeft}px - (50vw - 50%))` }}
        />
        <div className="bg-[#111111] shadow-2xl border border-white/5 w-[1450px] 2xl:w-[1800px] overflow-hidden">
          <div className="p-12 flex flex-wrap justify-center content-start gap-4">
            {sideNavigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={closeAll}
                className="h-[75px] w-[200px] flex-shrink-0 bg-[#222222] border border-white/5 flex items-center justify-center px-6 hover:bg-[#AD9463]/20 hover:border-[#AD9463]/40 transition-all cursor-pointer group"
              >
                <span className="text-[#DBDCDD] body-sm text-center group-hover:text-white whitespace-nowrap">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </Container>

      {/* MOBILE MENU - FIXED FULL HEIGHT */}
      <Container> 
      <div
        className={`lg:hidden fixed left-0 w-full bg-black transition-all duration-300 z-40 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ 
          top: HEADER_HEIGHT, 
          height: `calc(100dvh - ${HEADER_HEIGHT})` // Using dvh for accurate mobile height
        }}
      >
        <div className="px-6 py-8 flex flex-col gap-8 h-full overflow-y-auto">
           {[...sideNavigation, ...primaryNavigation].map((item, idx) => (
             <Link 
               key={idx} 
               href={item.href} 
               onClick={closeAll} 
               className="text-white body-sm font-semibold hover:text-[#AD9463] transition-colors py-2"
             >
               {item.title}
             </Link>
           ))}
        </div>
      </div>
      </Container>
    </header>
  );
};

export default Header;