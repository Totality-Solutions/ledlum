"use client";

import React from 'react';
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Send } from "lucide-react";
import { GetInTouch } from './GetInTouch';

export default function Footer() {
  const footerLinks = {
    about: ["Contact", "Our Work", "Studio Notes", "About: Studio"],
    services1: ["Architectural Lighting", "Industrial Solutions", "Smart Controls", "Sustainability"],
    services2: ["Bespoke Design", "Energy Audits", "Custom Fabrication", "Technical Support"],
  };

  return (
    <footer className="relative bg-black pt-6 md:pt-10 px-4 md:px-6 overflow-hidden flex flex-col min-h-screen lg:min-h-[90vh] pb-[5rem] max-w-full">
      
      {/* 1. BACKGROUND LAYERS - OPTIMIZED */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center opacity-40 pointer-events-none will-change-transform" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }} 
      />

      {/* 2. WATERMARK LOGO - OPTIMIZED */}
      <div className="absolute bottom-4 md:bottom-0 left-0 w-full pointer-events-none top-auto md:top-2.5 will-change-transform">
        <img 
          src="/images/about/footer-logo.png" 
          alt="Ledlum Watermark" 
          className="w-full h-auto object-contain object-bottom opacity-60"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* 3. PILL CARD - OPTIMIZED */}
      <div className="relative z-10 w-full mx-auto rounded-[24px] md:rounded-[24px] max-w-[96%] overflow-hidden bg-[#9d9272] shadow-2xl mb-10 md:mb-20 will-change-transform">
        {/* Card Background - Optimized */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <img 
            src="/images/about/footercard.png" 
            className="w-full h-full object-cover will-change-transform"
            alt="Texture"
            style={{
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />
        </div>

        {/* CONTAINER */}
        <Container className="relative z-20 py-12 md:py-20 lg:py-12 !max-w-none px-8 md:px-[7vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Section: Brand & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-white">
                    <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {/* Using fluid desk-h3 for logo text to keep it bold and responsive */}
                  <span className="desk-h3 !text-3xl font-bold tracking-tighter text-white font-pop uppercase ">
                    L E D L U M
                  </span>
                </div>
                
                <p className="text-base leading-relaxed text-white max-w-md font-pop font-light">
                  Enhancing environments through energy efficiency, aesthetic appeal, 
                  and high-performance architectural lighting solutions.
                </p>

                {/* Social Icons */}
                <div className="flex gap-5 mt-10">
                  {[Instagram, Send, Linkedin, Facebook].map((Icon, i) => (
                    <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-500 group">
                      <Icon className="w-4 h-4  text-white transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 lg:mt-24">
                <p className="text-[10px] tracking-[0.3em] text-white font-pop font-medium">
                  © 2026 LEDLUM. Technical Brilliance.
                </p>
              </div>
            </div>

            {/* Right Section: Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-12">
              {[
                { title: "About", links: footerLinks.about },
                { title: "Capabilities", links: footerLinks.services1 },
                { title: "Innovation", links: footerLinks.services2 }
              ].map((column, i) => (
                <div key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : "col-span-1"}>
                  <h4 className="text-[14px] font-bold mb-6 font-bai text-white  tracking-widest">{column.title}</h4>
                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link}>
                        <Link 
                          href="#" 
                          className="text-[15px] text-white transition-all duration-300 font-pop font-light flex items-center group"
                        >
                          <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
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

        {/* Spacer to push card up slightly */}
        <div className="flex-grow min-h-[50px] lg:min-h-[100px]" />
      </div>
    </footer>
  );
}
