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
    <footer className="relative bg-black py-10 md:py-20 px-4 overflow-hidden">
      
      {/* 1. THE PILL CARD - Responsive rounding and height */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-[40px] md:rounded-[80px] overflow-hidden bg-zinc-900/20 min-h-[500px] flex items-center border border-white/5">
        
        {/* Card Background Image with Overlay for Readability */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/Ledlum Footer Card.png" 
            className="w-full h-full object-cover opacity-60 md:opacity-100" 
            alt="Card Texture"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-transparent" />
        </div>

        <Container className="relative z-20 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            
            {/* Left Section: Brand & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full">
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="text-3xl font-semibold tracking-tight text-white font-bai">Ledlum</span>
                </div>
                
                <p className="text-sm md:text-base leading-relaxed text-white/80 max-w-sm font-pop font-light">
                  Enhancing environments through energy efficiency, aesthetic appeal, 
                  and high-performance architectural lighting solutions.
                </p>

                {/* Social Icons - Improved Touch Targets */}
                <div className="flex gap-6 mt-10">
                  <Link href="#" className="p-2 -m-2 hover:text-yellow-100 transition-colors duration-300">
                    <Instagram className="w-5 h-5 text-white/70 hover:text-white" />
                  </Link>
                  <Link href="#" className="p-2 -m-2 hover:text-yellow-100 transition-colors duration-300">
                    <Send className="w-5 h-5 text-white/70 hover:text-white" />
                  </Link>
                  <Link href="#" className="p-2 -m-2 hover:text-yellow-100 transition-colors duration-300">
                    <Linkedin className="w-5 h-5 text-white/70 hover:text-white" />
                  </Link>
                  <Link href="#" className="p-2 -m-2 hover:text-yellow-100 transition-colors duration-300">
                    <Facebook className="w-5 h-5 text-white/70 hover:text-white" />
                  </Link>
                </div>
              </div>

              {/* Copyright - Bottom aligned on desktop */}
              <div className="mt-16 lg:mt-24">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-pop">
                  © 2026 LEDLUM. Technical Brilliance.
                </p>
              </div>
            </div>

            {/* Right Section: Link Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8 text-white">
              <div className="col-span-1">
                <h4 className="text-[14px] font-semibold mb-6 font-bai text-white">About</h4>
                <ul className="space-y-4">
                  {footerLinks.about.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="text-[14px] font-semibold mb-6 font-bai text-white">Capabilities</h4>
                <ul className="space-y-4">
                  {footerLinks.services1.map((link, idx) => (
                    <li key={idx}>
                      <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-[14px] font-semibold mb-6 font-bai text-white">Innovation</h4>
                <ul className="space-y-4">
                  {footerLinks.services2.map((link, idx) => (
                    <li key={idx}>
                      <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </Container>
      </div>
    </footer>
  );
}