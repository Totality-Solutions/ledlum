"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HEADER_HEIGHT = "90px";
const ACCENT_GOLD = "#AD9463";
const BG_DARK = "#111111";
const BG_CARD = "#222222";

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

  const navLinks = [
    "LED Lum Outdoor",
    "LED Lum Indoor",
    "Artizan",
    "Astara",
    "Volaris",
    "Klewe",
  ];

  const menuData: MenuData = {
    "LED Lum Outdoor": ["Flood Light", "Bollard", "Wall Washer", "Step Light", "Spike Light", "Pole Light"],
    "LED Lum Indoor": ["Micro spot", "Anti glare", "Linear light", "Linear series", "Linear pin hole", "Anti glare tiltable", "Recess low glare", "Soft track"],
    "Artizan": ["Decorative", "Custom Made", "Pendants", "Wall Lights"],
    "Astara": ["Surface Mount", "Deep Recessed", "High Power"],
    "Volaris": ["Magnetic 20mm", "Magnetic 35mm", "Trimless Magnetic"],
    "Klewe": ["Flexible Strip", "Neon Flex", "IP67 Strip"],
    "side-menu": ["Home", "About Us", "Contact Us"],
  };

  // Scroll Lock Logic
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileOpen]);

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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, link: string) => {
    if (isClicked) setIsClicked(false);
    setActiveMenu(link);
    const rect = e.currentTarget.getBoundingClientRect();
    setTriangleLeft(rect.left + rect.width / 2);
  };

  const handleMouseLeave = () => {
    if (!isClicked) setActiveMenu(null);
  };

  const handleIconClick = () => {
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
  };

  const closeAllMenus = () => {
    setIsClicked(false);
    setActiveMenu(null);
    setMobileOpen(false);
    setExpandedMobile(null);
  };

  const currentCategories = activeMenu ? menuData[activeMenu] || [] : [];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-black">
      {/* TOP BAR */}
      <div 
        className="w-full px-6 lg:px-16 flex justify-between items-center backdrop-blur-lg text-white border-b border-white/5"
        style={{ height: HEADER_HEIGHT }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2" onClick={closeAllMenus}>
          <span className="text-[#AD9463] text-4xl">✦</span>
          <span className="text-[#AD9463] text-2xl tracking-[0.2em] font-medium leading-none font-pop">
            LEDLUM
          </span>
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
              <span className={`body-sm transition-colors ${activeMenu === link ? "font-(--primary-semibold)" : ""}`}>
                {link}
              </span>
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center">
          <button
            ref={menuIconRef}
            onClick={handleIconClick}
            aria-expanded={isClicked}
            className="hidden lg:block transition-colors hover:text-[#AD9463]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="8" y1="16" x2="20" y2="16" />
            </svg>
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} className="lg:hidden">
            <svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
              {mobileOpen ? (
                <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              ) : (
                <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>
              )}
            </svg>
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
            {currentCategories.map((cat, index) => (
              <div
                key={index}
                className="h-[75px] w-[200px] flex-shrink-0 bg-[#222222] border border-white/5 flex items-center justify-center px-6 hover:bg-[#AD9463]/20 hover:border-[#AD9463]/40 transition-all cursor-pointer group"
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
        className={`lg:hidden fixed left-0 w-full bg-black transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT})` }}
      >
        <div className="px-6 py-8 flex flex-col gap-8 h-full overflow-y-auto no-scrollbar">
          
          {/* Primary Side Menu */}
          <div className="flex flex-col gap-5">
            {menuData["side-menu"].map((item, index) => (
              <Link
                key={index}
                href="/"
                onClick={closeAllMenus}
                className="body-sm text-white font-(--primary-semibold) tracking-[0.05em]"
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
                  <span className={`body-sm transition-colors ${expandedMobile === link ? "font-(--primary-semibold)" : ""}`}>
                    {link}
                  </span>
                  <span className="text-[#AD9463] text-xl font-light">
                    {expandedMobile === link ? "−" : "+"}
                  </span>
                </button>

                {expandedMobile === link && (
                  <div className="mt-5 flex flex-col gap-4 pl-4 border-l border-white/5">
                    {menuData[link].map((cat, index) => (
                      <span key={index} className="body-sm text-gray-400 font-light">
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