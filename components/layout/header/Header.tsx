"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// 1. Local Image Imports from the /public folder
import LogoImg from "@/public/images/logo/LEDLUM_LOGO.svg";
import MenuIcon from "@/public/images/icons/menu_icon.png";

const HEADER_HEIGHT = "90px";

interface MenuData {
  [key: string]: string[];
}

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [triangleLeft, setTriangleLeft] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  // Memoize static data to prevent recreation on every render
  const navLinks = useMemo(() => [
    "LED Lum Outdoor",
    "LED Lum Indoor",
    "Artizan",
    "Astara",
    "Volaris",
    "Klewe",
  ], []);

  const menuData = useMemo<MenuData>(() => ({
    "LED Lum Outdoor": ["Flood Light", "Bollard", "Wall Washer", "Step Light", "Spike Light", "Pole Light"],
    "LED Lum Indoor": ["Micro spot", "Anti glare", "Linear light", "Linear series", "Linear pin hole", "Anti glare tiltable", "Recess low glare", "Soft track"],
    "Artizan": ["Decorative", "Custom Made", "Pendants", "Wall Lights"],
    "Astara": ["Surface Mount", "Deep Recessed", "High Power"],
    "Volaris": ["Magnetic 20mm", "Magnetic 35mm", "Trimless Magnetic"],
    "Klewe": ["Flexible Strip", "Neon Flex", "IP67 Strip"],
    "side-menu": ["Home", "About Us", "Contact Us"],
  }), []);

  // Scroll Lock Logic for Mobile Menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileOpen]);

  // Handle clicking outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsClicked(false);
        setActiveMenu(null);
        setMobileOpen(false);
        setExpandedMobile(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, link: string) => {
    if (isClicked) setIsClicked(false);
    setActiveMenu(link);
    const rect = e.currentTarget.getBoundingClientRect();
    setTriangleLeft(rect.left + rect.width / 2);
  }, [isClicked]);

  const handleMouseLeave = useCallback(() => {
    if (!isClicked) setActiveMenu(null);
  }, [isClicked]);

  const handleIconClick = useCallback(() => {
    if (isClicked) {
      setIsClicked(false);
      setActiveMenu(null);
    } else {
      setIsClicked(true);
      setActiveMenu("side-menu");
      if (menuIconRef.current) {
        const rect = menuIconRef.current.getBoundingClientRect();
        setTriangleLeft(rect.left + rect.width / 2);
      }
    }
  }, [isClicked]);

  const closeAllMenus = useCallback(() => {
    setIsClicked(false);
    setActiveMenu(null);
    setMobileOpen(false);
    setExpandedMobile(null);
  }, []);

  const currentCategories = useMemo(() => {
    return activeMenu ? menuData[activeMenu] || [] : [];
  }, [activeMenu, menuData]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-black">
      {/* TOP BAR */}
      <div 
        className="w-full px-6 lg:px-14 flex justify-between items-center backdrop-blur-lg text-white border-b border-white/5"
        style={{ height: HEADER_HEIGHT }}
      >
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3" onClick={closeAllMenus}>
          <div className="relative w-30 h-30 lg:w-40 lg:h-40">
            <Image 
              src={LogoImg} 
              alt="LEDLUM Logo"
              fill
              className="object-cover"
              priority 
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-14 h-full">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative h-full flex items-center cursor-pointer group"
              onMouseEnter={(e) => handleMouseEnter(e, link)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`body-sm transition-colors ${activeMenu === link ? "text-[#AD9463]" : "hover:text-[#AD9463]"}`}>
                {link}
              </span>
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6">
          {/* Desktop Sidebar Trigger */}
          <button
            ref={menuIconRef}
            onClick={handleIconClick}
            aria-expanded={isClicked}
            className="hidden lg:block transition-transform hover:scale-110 active:scale-95"
          >
            <Image 
              src={MenuIcon} 
              alt="Open Menu"
              width={28}
              height={28}
              className="brightness-0 invert" 
            />
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-expanded={mobileOpen} 
            className="lg:hidden transition-transform active:scale-90"
          >
            {mobileOpen ? (
              // Inline Close SVG since local file is unavailable
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Hamburger Icon
              <Image 
                src={MenuIcon} 
                alt="Toggle Menu"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP DROPDOWN */}
      <div
        onMouseEnter={() => !isClicked && setActiveMenu(activeMenu)}
        onMouseLeave={handleMouseLeave}
        className={`hidden lg:block absolute left-1/2 -translate-x-1/2 w-max pt-4 transition-all duration-300 ease-in-out z-50 ${
          activeMenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-[-10px] pointer-events-none"
        }`}
        style={{ top: HEADER_HEIGHT }}
      >
        <div
          className="absolute top-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#111111] transition-all duration-300 ease-out"
          style={{ left: `calc(${triangleLeft}px - (50vw - 50%))` }}
        />
        <div className="bg-[#111111] shadow-2xl border border-white/5 w-[1450px] 2xl:w-[1800px] overflow-hidden">
          <div className="p-12 flex flex-wrap justify-center content-start gap-4">
            {currentCategories.map((cat) => (
              <div
                key={`${activeMenu}-${cat}`}
                className="h-[75px] w-[200px] shrink-0 bg-[#222222] border border-white/5 flex items-center justify-center px-6 hover:bg-[#AD9463]/20 hover:border-[#AD9463]/40 transition-all cursor-pointer group"
              >
                <span className="text-[#DBDCDD] body-sm text-center group-hover:text-white whitespace-nowrap">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed left-0 w-full bg-black transition-all duration-300 z-40 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT})` }}
      >
        <div className="px-6 py-8 flex flex-col gap-8 h-full overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-5">
            {menuData["side-menu"].map((item) => (
              <Link
                key={item}
                href="/"
                onClick={closeAllMenus}
                className="body-sm text-white font-semibold tracking-[0.05em] hover:text-[#AD9463] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link}>
                <button
                  onClick={() => setExpandedMobile(expandedMobile === link ? null : link)}
                  className="w-full flex justify-between items-center text-white"
                >
                  <span className={`body-sm transition-colors ${expandedMobile === link ? "text-[#AD9463] font-semibold" : ""}`}>
                    {link}
                  </span>
                  <span className="text-[#AD9463] text-xl font-light">
                    {expandedMobile === link ? "−" : "+"}
                  </span>
                </button>

                {expandedMobile === link && (
                  <div className="mt-5 flex flex-col gap-4 pl-4 border-l border-white/5">
                    {currentCategories.map((cat) => (
                      <span key={`${link}-${cat}`} className="body-sm text-gray-400 font-light hover:text-white transition-colors cursor-pointer">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;