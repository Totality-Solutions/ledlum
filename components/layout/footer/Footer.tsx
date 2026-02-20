
"use client";

import React from 'react';
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    about: ["Contact", "Our Work", "Studio Notes", "About the Studio"],
    services1: ["Architectural Lighting", "Industrial Solutions", "Smart Controls", "Sustainability"],
    services2: ["Bespoke Design", "Energy Audits", "Custom Fabrication", "Technical Support"],
  };

  return (
    /* FIXED: max-w-full and overflow-hidden to match your blog layout safety */
    <footer className="relative bg-black pt-6 md:pt-10 px-4 md:px-6 overflow-hidden flex flex-col min-h-screen lg:min-h-[90vh] max-w-full">
      
      {/* 1. BACKGROUND LAYERS */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center opacity-40 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' 
        }}
      />

      {/* Big Watermark Logo */}
      <div className="absolute bottom-4 md:bottom-0 left-0 w-full  pointer-events-none  top-auto md:top-2.5 ">
        <img 
          src="/images/about/footer-logo.png" 
          alt="Ledlum Watermark" 
          className="w-full h-auto object-contain object-bottom" 
        />
      </div>

      {/* 2. THE PILL CARD */}
      <div className="relative z-10 w-full mx-auto rounded-[24px] md:rounded-[24px] max-w-[96%] overflow-hidden bg-[#9d9272] shadow-2xl mb-10 md:mb-20">
        
        {/* Card Subtle Texture Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-multiply">
          <img 
            src="/images/about/footercard.png" 
            className="w-full h-full object-cover" 
            alt="Texture"
          />
        </div>

        <Container className="relative z-20 py-12 md:py-16 lg:py-20 !max-w-none px-6 md:px-[6vw]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
            
            {/* --- LEFT MODULE: Brand & Identity --- */}
            <div className="flex flex-col justify-between h-full max-w-sm w-full">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-white">
                    <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {/* Using fluid desk-h3 for the logo text to keep it bold and responsive */}
                  <span className="desk-h3 !text-3xl font-bold tracking-tighter text-white font-pop uppercase ">
                    L E D L U M
                  </span>
                </div>
                
                {/* Using body-sm from global.css */}
                <p className="body-sm leading-relaxed text-white font-pop font-light max-w-[320px]">
                  Enhancing environments through energy efficiency, aesthetic appeal, 
                  and high-performance architectural lighting solutions.
                </p>

                {/* Social Icons */}
                <div className="flex gap-6 mt-10">
                  {[Instagram, Send, Linkedin, Facebook].map((Icon, i) => (
                    <Link key={i} href="#" className="text-white hover:opacity-60 transition-all">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop Copyright */}
              <div className="hidden lg:block mt-7">
                <p className="text-[10px] tracking-[0.3em] text-white/70 font-pop font-medium ">
                  © 2026 LEDLUM. All rights reserved.
                </p>
              </div>
            </div>

            {/* --- RIGHT MODULE: Link Groups --- */}
            <div className="flex flex-wrap md:flex-nowrap gap-x-12 lg:gap-x-20 gap-y-12 w-full lg:w-auto">
              {[
                { title: "About us", links: footerLinks.about },
                { title: "Our Services", links: footerLinks.services1 },
                { title: "Our Services", links: footerLinks.services2 }
              ].map((column, i) => (
                <div key={i} className="min-w-[140px] flex-grow md:flex-grow-0">
                  {/* Using body-lg for column headers */}
                  <h4 className="body-lg !text-sm font-medium mb-6 font-pop text-white  tracking-wider">
                    {column.title}
                  </h4>
                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link}>
                        <Link 
                          href="#" 
                          className="body-sm text-white/70 hover:text-white transition-colors font-pop font-light"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* --- MOBILE COPYRIGHT --- */}
            <div className="lg:hidden w-full mt-4 pt-8 border-t border-white/10">
              <p className="text-[10px] tracking-[0.3em] text-white/70 font-pop font-medium  text-center">
                © 2026 LEDLUM. Technical Brilliance.
              </p>
            </div>

          </div>
        </Container>
      </div>

      {/* Spacer to push card up slightly */}
      <div className="flex-grow min-h-[50px] lg:min-h-[100px]" />
    </footer>
  );
}