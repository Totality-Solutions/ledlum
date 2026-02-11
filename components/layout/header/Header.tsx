"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [triangleLeft, setTriangleLeft] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    "LED Lum Outdoor", "LED Lum Indoor", "Artizan", "Astara", "Volaris", "Klewe"
  ];

  const menuData: Record<string, string[]> = {
    "LED Lum Outdoor": ["Flood Light", "Bollard", "Wall Washer", "Step Light", "Spike Light", "Pole Light"],
    "LED Lum Indoor": ["Micro spot", "Anti glare", "Linear light", "Linear series", "Linear pin hole", "Anti glare tiltable", "Recess low glare", "Soft track"],
    "Artizan": ["Decorative", "Custom Made", "Pendants", "Wall Lights"],
    "Astara": ["Surface Mount", "Deep Recessed", "High Power"],
    "Volaris": ["Magnetic 20mm", "Magnetic 35mm", "Trimless Magnetic"],
    "Klewe": ["Flexible Strip", "Neon Flex", "IP67 Strip"],
    "side-menu": ["Home", "About Us", "Contact Us"]
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsClicked(false);
        setActiveMenu(null);
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

  const currentCategories = activeMenu ? menuData[activeMenu] || [] : [];

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50">
      <div className="w-full h-[90px] px-16 flex justify-between items-center bg-[#828282] text-white border-b border-white/5">
        <Link href="/" className="flex items-center gap-2" onClick={() => {setIsClicked(false); setActiveMenu(null);}}>
          <span className="text-[#AD9463] text-4xl">✦</span>
          <span className="text-[#AD9463] text-2xl tracking-[0.2em] font-medium leading-none font-pop">
            LEDLUM
          </span>
        </Link>

        <nav className="flex items-center gap-10 h-full">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative h-full flex items-center cursor-pointer group"
              onMouseEnter={(e) => handleMouseEnter(e, link)}
              onMouseLeave={handleMouseLeave}
            >
              <span className={`body-sm transition-colors ${activeMenu === link ? 'font-(--primary-semibold)' : ''}`}>
                {link}
              </span>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <button className="hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          
          <button 
            ref={menuIconRef}
            onClick={handleIconClick}
            className={`transition-colors hover:text-[#AD9463] ${isClicked ? 'text-[#AD9463]' : 'text-white'}`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8"/><line x1="8" y1="16" x2="20" y2="16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Container */}
      <div 
        onMouseEnter={() => !isClicked && setActiveMenu(activeMenu)}
        onMouseLeave={handleMouseLeave}
        className={`
          absolute top-[90px] left-1/2 -translate-x-1/2 w-max pt-4 
          transition-all duration-300 ease-in-out z-50
          ${activeMenu 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-[-10px] pointer-events-none'
          }
        `}
      >
        <div 
          className="absolute top-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#111111] transition-all duration-300 ease-out"
          style={{ left: `calc(${triangleLeft}px - (50vw - 50%))` }}
        />

        {/* Height adjusts automatically, Width is constant */}
        <div className="bg-[#111111] shadow-2xl border border-white/5 w-[1450px] overflow-hidden">
          <div className="p-12 flex flex-wrap justify-center content-start gap-4">
            {currentCategories.map((cat, index) => (
              <div 
                key={`${activeMenu}-${index}`} 
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
    </header>
  );
};

export default Header;