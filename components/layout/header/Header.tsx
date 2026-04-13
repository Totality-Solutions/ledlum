// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { primaryNavigation, sideNavigation } from "@/config/navigation";
// import MobileMenu from "./MobileMenu"; 

// // Local Image Imports
// import LogoImg from "@/public/images/logo/LEDLUM - Logo.webp";
// import MenuIcon from "@/public/images/icons/menu_icon.png";

// const HEADER_HEIGHT = "90px";

// const Header = () => {
//   const [sideMenuOpen, setSideMenuOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
  
//   const headerRef = useRef<HTMLDivElement>(null);
//   const menuIconRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
//         setSideMenuOpen(false);
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const closeAll = () => {
//     setSideMenuOpen(false);
//     setMobileOpen(false);
//   };

//   return (
//     // 🔥 FIX: Wrap in a fragment <> ... </> 
//     <>
//       <header ref={headerRef} className="sticky top-0 left-0 w-full z-[60] bg-black lg:px-12 px-3">
//         {/* TOP BAR */}
//         <div 
//           className="w-full flex justify-between items-center backdrop-blur-lg text-white will-change-filter relative z-50" 
//           style={{ 
//             height: HEADER_HEIGHT,
//             transform: 'translate3d(0, 0, 0)', 
//             backfaceVisibility: 'hidden' 
//           }}
//         >
//           <Link href="/" onClick={closeAll} className="flex items-center gap-3">
//             <div className="relative w-30 h-10 lg:w-50 lg:h-16 ">
//               <Image src={LogoImg} alt="LEDLUM Logo" className="object-contain" fill priority />
//             </div>
//           </Link>

//           <nav className="hidden lg:flex items-center gap-14 h-full">
//             {primaryNavigation.map((link) => (
//               <Link key={link.title} href={link.href} className="relative h-full flex items-center group">
//                 <span className="body-sm transition-colors text-white hover:text-[#AD9463]">
//                   {link.title}
//                 </span>
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-6">
//             <button
//               ref={menuIconRef}
//               onClick={() => setSideMenuOpen(!sideMenuOpen)}
//               className="hidden lg:block transition-transform hover:scale-110 active:scale-95"
//             >
//               <Image src={MenuIcon} alt="Open Menu" width={28} height={28} className="brightness-0 invert" />
//             </button>

//             <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden transition-transform active:scale-90 z-50">
//               {mobileOpen ? (
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               ) : (
//                 <Image src={MenuIcon} alt="Toggle Menu" width={28} height={28} className="brightness-0 invert" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* DESKTOP DROPDOWN */}
//         <div
//           className={` w-[90%] hidden lg:block absolute left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out z-50 ${
//             sideMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-[-10px] pointer-events-none"
//           }`}
//           style={{ top: HEADER_HEIGHT }}
//         >
//           <div className="bg-[#111111] w-full shadow-2xl border border-white/5 overflow-hidden">
//             <div className="p-7 flex flex-wrap justify-center content-start gap-4">
//               {sideNavigation.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.href}
//                   onClick={closeAll}
//                   className="h-auto w-[150px] p-4 flex-shrink-0 bg-[#222222] border border-white/5 flex items-center justify-center px-6 hover:bg-[#AD9463]/20 hover:border-[#AD9463]/40 transition-all cursor-pointer group"
//                 >
//                   <span className="text-content body-sm text-center group-hover:text-white whitespace-nowrap">
//                     {item.title}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
      
//       </header>

//         {/* 🔥 FIX: MobileMenu is now OUTSIDE the <header> tag */}
//       <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
//     </>
//   );
// };

// export default Header;





"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNavigation, sideNavigation } from "@/config/navigation";
import MobileMenu from "./MobileMenu"; 

// Local Image Imports
import LogoImg from "@/public/images/logo/LEDLUM - Logo.webp";
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
    <>
      <header ref={headerRef} className="sticky top-0 left-0 w-full z-[60] bg-black lg:px-12 px-4">
        {/* TOP BAR */}
        <div 
          className="w-full flex justify-between items-center backdrop-blur-lg text-white will-change-filter relative z-50" 
          style={{ 
            height: HEADER_HEIGHT,
            transform: 'translate3d(0, 0, 0)', 
            backfaceVisibility: 'hidden' 
          }}
        >
          {/* --- LEFT GROUP: LOGOS --- */}
          <div className="flex items-center gap-3 md:gap-6 lg:gap-10 relative z-10 shrink-0">
            {/* Primary Logo */}
            <Link href="/" onClick={closeAll} className="flex items-center shrink-0">
              <div className="relative w-20 h-8 sm:w-28 sm:h-9 lg:w-32 lg:h-10 xl:w-36 xl:h-12">
                <Image 
                  src={LogoImg} 
                  alt="LEDLUM Logo" 
                  fill 
                  className="object-contain object-left" 
                  priority 
                />
              </div>
            </Link>

            {/* Vertical Divider - Visible from 'small' screens up */}
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block shrink-0" />

            {/* Secondary Logo - Now using 'flex' by default to ensure visibility */}
            <Link href="/brand-story" onClick={closeAll} className="flex items-center group shrink-0">
              <div className="relative w-20 h-7 sm:w-28 sm:h-9 lg:w-32 lg:h-10 xl:w-36 xl:h-6 transition-opacity group-hover:opacity-80">
                <Image 
                  src={SecondaryLogoImg} 
                  alt="Secondary Brand Logo" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </Link>
          </div>

          {/* --- CENTER GROUP: NAV LINKS --- */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center lg:gap-6 xl:gap-10 h-full pointer-events-auto">
            {primaryNavigation.map((link) => (
              <Link key={link.title} href={link.href} className="relative h-full flex items-center group">
                <span className="text-[13px] xl:text-[14px] font-medium transition-colors text-white hover:text-[#AD9463] whitespace-nowrap uppercase tracking-wider">
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>

          {/* --- RIGHT GROUP: ICONS --- */}
          <div className="flex items-center gap-4 md:gap-6 relative z-10 shrink-0">
            <button
              ref={menuIconRef}
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
              className="hidden lg:block transition-transform hover:scale-110 active:scale-95"
            >
              <Image src={MenuIcon} alt="Open Menu" width={26} height={26} className="brightness-0 invert" />
            </button>

            <button 
                onClick={() => setMobileOpen(!mobileOpen)} 
                className="lg:hidden p-2 -mr-2 transition-transform active:scale-90 z-50"
            >
              {mobileOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <div className="space-y-1.5">
                    <div className="w-7 h-0.5 bg-white"></div>
                    <div className="w-7 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white ml-auto"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* DESKTOP DROPDOWN */}
        <div
          className={`w-[95%] xl:w-[90%] hidden lg:block absolute left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-in-out z-50 ${
            sideMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-[-10px] pointer-events-none"
          }`}
          style={{ top: HEADER_HEIGHT }}
        >
          <div className="bg-[#111111]/95 backdrop-blur-xl w-full shadow-2xl border border-white/5 overflow-hidden rounded-b-xl">
            <div className="p-8 flex flex-wrap justify-center content-start gap-4">
              {sideNavigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={closeAll}
                  className="h-auto w-[calc(25%-1rem)] min-w-[160px] p-5 flex-shrink-0 bg-[#1a1a1a] border border-white/5 flex items-center justify-center hover:bg-[#AD9463]/10 hover:border-[#AD9463]/30 transition-all cursor-pointer group"
                >
                  <span className="text-[12px] uppercase tracking-widest text-center group-hover:text-[#AD9463] whitespace-nowrap">
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

