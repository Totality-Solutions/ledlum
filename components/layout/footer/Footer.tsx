
import React from 'react';
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { GetInTouch } from './GetInTouch';

export default function Footer() {
  const footerLinks = {
    about: ["Contact", "Our Work", "Studio Notes", "About the Studio"],
    services1: ["Architectural Lighting", "Industrial Solutions", "Smart Controls", "Sustainability"],
    services2: ["Bespoke Design", "Energy Audits", "Custom Fabrication", "Technical Support"],
  };

  return (
    <footer className="relative bg-black pt-6 md:pt-10 px-6 md:px-6 overflow-hidden flex flex-col min-h-screen lg:min-h-[90vh] pb-[5rem]">
      
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center opacity-60 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' 
        }}
      />
      {/* 1. GLOBAL BACKGROUND LAYERS */}
     

    

{/* <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
  <div className="relative w-full h-full">
    <img 
      src="/images/about/footer-logo.png" 
      alt="Ledlum Watermark" 
      className="w-full h-auto min-h-[40vh] md:min-h-[70vh] object-cover object-bottom" 
    />

  </div>
</div> */}



{/* uu */}

{/* 1. UPDATED BACKGROUND LOGO CONTAINER */}
<div className="absolute bottom-0 left-0  w-full h-[45vh] md:h-auto scale-110 md:scale-100 object-contain md:object-cover object-bottom opacity-70">
  <div className="relative w-full overflow-hidden">
    <img 
      src="/images/about/footer-logo.png" 
      alt="Ledlum Watermark" 
      /* - h-[30vh] md:h-auto: On mobile, we force the image area to take 30% of the screen height.
         - object-contain: Ensures the logo doesn't cut off.
         - object-bottom: Keeps the logo pinned to the very bottom of that 30vh area.
      */
      className="w-full h-[30vh] md:h-auto object-contain md:object-cover object-bottom opacity-80" 
    />
  </div>
</div>

{/* uuu */}


      {/* 2. THE PILL CARD */}
      <div className="relative z-10 w-full mx-auto rounded-[20px] md:rounded-[30px] max-w-[95%] overflow-hidden bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-2xl mb-20 md:mb-32">
        
        {/* Card Background Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/about/footercard.png" 
            className="w-full h-full object-cover opacity-60 " 
            alt="Card Texture"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />
        </div>

        {/* CONTAINER */}
        <Container className="relative z-20 py-12 md:py-20 lg:py-12 !max-w-none px-8 md:px-[7vw]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Section: Brand & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full bg-white/5">
                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span className="text-3xl font-bold tracking-tighter text-white font-bai">Ledlum</span>
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
          </div>
        </Container>
      </div>

      {/* Flex-grow ensures the logo has space at the bottom */}
      <div className="flex-grow min-h-[100px]" />
      
    </footer>
  );
}



