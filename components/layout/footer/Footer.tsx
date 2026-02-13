// import React from 'react';
// import { Container } from "@/components/layout/Container";
// import Link from "next/link";
// import { Instagram, Facebook, Linkedin, Send } from "lucide-react";

// export default function Footer() {
//   const footerLinks = {
//     about: ["Contact", "Our Work", "Studio Notes", "About the Studio"],
//     services1: ["Architectural Lighting", "Industrial Solutions", "Smart Controls", "Sustainability"],
//     services2: ["Bespoke Design", "Energy Audits", "Custom Fabrication", "Technical Support"],
//   };

//   return (
//     // Reduced outer padding from py-20 to py-10
//     <footer className="relative bg-black  py-6 md:py-10 px-4 overflow-hidden opacity-99 h-[600px] bg-[url('/images/about/ledlum-line.png')] bg-cover bg-center">
//       <div className="absolute inset-0 z-0  bg-[url('/images/about/footer-logo.png')] bg-cover bg-center pointer-events-none" />
        
//       {/* 1. THE PILL CARD - Reduced min-height and rounding slightly for better balance */}
//       <div className="relative z-10 max-w-7xl mx-auto rounded-[32px] md:rounded-[60px] overflow-hidden bg-zinc-900/20 min-h-fit flex items-center border border-white/5">
        
//         {/* Card Background Image */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <img 
//             src="/images/about/footercard.png" 
//             className="w-full h-full object-cover opacity-60 md:opacity-100" 
//             alt="Card Texture"
//           />
//           <div className="absolute inset-0 bg-black/40 md:bg-transparent" />
//         </div>

//         {/* Reduced inner vertical padding from py-24 to py-12/16 */}
//         <Container className="relative z-20 py-12 md:py-16">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
//             {/* Left Section: Brand & Description */}
//             <div className="lg:col-span-5 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full">
//                     <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
//                       <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="2"/>
//                       <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="2"/>
//                     </svg>
//                   </div>
//                   <span className="text-2xl font-semibold tracking-tight text-white font-bai">Ledlum</span>
//                 </div>
                
//                 <p className="text-sm leading-relaxed text-white/80 max-w-sm font-pop font-light">
//                   Enhancing environments through energy efficiency, aesthetic appeal, 
//                   and high-performance architectural lighting solutions.
//                 </p>

//                 {/* Social Icons */}
//                 <div className="flex gap-6 mt-8">
//                   <Link href="#" className="p-2 -m-2 transition-colors duration-300">
//                     <Instagram className="w-5 h-5 text-white/70 hover:text-white" />
//                   </Link>
//                   <Link href="#" className="p-2 -m-2 transition-colors duration-300">
//                     <Send className="w-5 h-5 text-white/70 hover:text-white" />
//                   </Link>
//                   <Link href="#" className="p-2 -m-2 transition-colors duration-300">
//                     <Linkedin className="w-5 h-5 text-white/70 hover:text-white" />
//                   </Link>
//                   <Link href="#" className="p-2 -m-2 transition-colors duration-300">
//                     <Facebook className="w-5 h-5 text-white/70 hover:text-white" />
//                   </Link>
//                 </div>
//               </div>

//               {/* Copyright - Reduced top margin */}
//               <div className="mt-12">
//                 <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-pop">
//                   © 2026 LEDLUM. Technical Brilliance.
//                 </p>
//               </div>
//             </div>

//             {/* Right Section: Link Columns */}
//             <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-8 text-white">
//               <div className="col-span-1">
//                 <h4 className="text-[13px] font-semibold mb-5 font-bai text-white">About</h4>
//                 <ul className="space-y-3">
//                   {footerLinks.about.map((link) => (
//                     <li key={link}>
//                       <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="col-span-1">
//                 <h4 className="text-[13px] font-semibold mb-5 font-bai text-white">Capabilities</h4>
//                 <ul className="space-y-3">
//                   {footerLinks.services1.map((link, idx) => (
//                     <li key={idx}>
//                       <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="col-span-2 sm:col-span-1">
//                 <h4 className="text-[13px] font-semibold mb-5 font-bai text-white">Innovation</h4>
//                 <ul className="space-y-3">
//                   {footerLinks.services2.map((link, idx) => (
//                     <li key={idx}>
//                       <Link href="#" className="text-sm text-white/60 hover:text-white transition-all duration-300 font-pop font-light hover:pl-1">
//                         {link}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
          
//         </Container>

        
//       </div>
      
//     </footer>
//   );
// }




// import React from 'react';
// import { Container } from "@/components/layout/Container";
// import Link from "next/link";
// import { Instagram, Facebook, Linkedin, Send } from "lucide-react";

// export default function Footer() {
//   const footerLinks = {
//     about: ["Contact", "Our Work", "Studio Notes", "About the Studio"],
//     services1: ["Architectural Lighting", "Industrial Solutions", "Smart Controls", "Sustainability"],
//     services2: ["Bespoke Design", "Energy Audits", "Custom Fabrication", "Technical Support"],
//   };

//   return (
//     <footer className="relative bg-black pt-6 md:pt-10 px-6 md:px-6 overflow-hidden flex flex-col min-h-screen lg:min-h-[90vh]">
      
//       {/* 1. GLOBAL BACKGROUND LAYERS */}
//       <div 
//         className="absolute inset-0 z-0 opacity-30 bg-[url('/images/about/ledlum-line.png')] bg-cover bg-center pointer-events-none" 
//       />
      
//       {/* The Footer Logo - Positioned explicitly below the card flow */}
//       <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[45vh] lg:h-[60vh] z-0 pointer-events-none">
//         <img 
//           src="/images/about/footer-logo.png" 
//           alt="Ledlum Watermark" 
//           className="w-full h-full object-contain object-bottom" 
//         />
//       </div>

//       {/* 2. THE PILL CARD - Removed max-w-7xl to fill the width */}
//       <div className="relative z-10 w-full mx-auto rounded-[40px] md:rounded-[80px]  max-w-[95%] overflow-hidden bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-2xl mb-20 md:mb-32">
        
//         {/* Card Background Texture */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           <img 
//             src="/images/about/footercard.png" 
//             className="w-full h-full object-cover opacity-60 " 
//             alt="Card Texture"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />
//         </div>

//         {/* CONTAINER: Removed max-width and adjusted padding for edge-to-edge feel */}
//         <Container className="relative z-20 py-12 md:py-20 lg:py-24 !max-w-none px-8 md:px-[7vw]">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
//             {/* Left Section: Brand & Description */}
//             <div className="lg:col-span-5 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full bg-white/5">
//                     <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
//                       <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="2"/>
//                       <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="2"/>
//                     </svg>
//                   </div>
//                   <span className="text-3xl font-bold tracking-tighter text-white font-bai">Ledlum</span>
//                 </div>
                
//                 <p className="text-base leading-relaxed text-white max-w-md font-pop font-light">
//                   Enhancing environments through energy efficiency, aesthetic appeal, 
//                   and high-performance architectural lighting solutions.
//                 </p>

//                 {/* Social Icons */}
//                 <div className="flex gap-5 mt-10">
//                   {[Instagram, Send, Linkedin, Facebook].map((Icon, i) => (
//                     <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-500 group">
//                       <Icon className="w-4 h-4  text-white transition-colors" />
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-16 lg:mt-24">
//                 <p className="text-[10px] tracking-[0.3em] text-white font-pop font-medium">
//                   © 2026 LEDLUM. Technical Brilliance.
//                 </p>
//               </div>
//             </div>

//             {/* Right Section: Link Columns - Better spacing for wide screens */}
//             <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-12">
//               {[
//                 { title: "About", links: footerLinks.about },
//                 { title: "Capabilities", links: footerLinks.services1 },
//                 { title: "Innovation", links: footerLinks.services2 }
//               ].map((column, i) => (
//                 <div key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : "col-span-1"}>
//                   <h4 className="text-[14px] font-bold mb-6 font-bai text-white  tracking-widest">{column.title}</h4>
//                   <ul className="space-y-4">
//                     {column.links.map((link) => (
//                       <li key={link}>
//                         <Link 
//                           href="#" 
//                           className="text-[15px] text-white transition-all duration-300 font-pop font-light flex items-center group"
//                         >
//                           <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100" />
//                           {link}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* Flex-grow ensures the logo has space at the bottom on all screen sizes */}
//       <div className="flex-grow min-h-[100px]" />
      
//     </footer>
//   );
// }



import React from 'react';
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Send, ArrowUpRight } from "lucide-react";

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
      {/* <div 
        className="absolute inset-0 z-0 opacity-30 bg-[url('/images/about/ledlum-line.png')] bg-cover bg-center pointer-events-none" 
      /> */}
      
      {/* --- NEW SECTION: GET IN TOUCH --- */}
      <section className="relative z-10 w-full py-20 md:py-32 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bai font-bold text-white mb-4">
          Get In Touch
        </h2>
        <p className="text-xl md:text-2xl font-pop font-light text-white/80 mb-10">
          With Our Lighting Specialists.
        </p>
        
        <Link 
          href="/contact" 
          className="group flex items-center gap-3 bg-[#EFE3D3] px-8 py-4 rounded-full transition-transform hover:scale-105 duration-300"
        >
          <span className="text-black font-bai font-semibold text-lg">Our Story</span>
          <div className="bg-[#A39678] rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </Link>
      </section>
      {/* ------------------------------- */}

      {/* The Footer Logo - Positioned explicitly below the card flow */}
      {/* <div className="absolute bottom-0 left-0 w-full h-[30vh] md:h-[45vh] lg:h-[60vh] z-0 pointer-events-none mt-6">
        <img 
          src="/images/about/footer-logo.png" 
          alt="Ledlum Watermark" 
          className="w-full h-full  object-bottom  object-cover " 
        />
      </div> */}

<div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
  <div className="relative w-full h-full">
    <img 
      src="/images/about/footer-logo.png" 
      alt="Ledlum Watermark" 
      className="w-full h-auto min-h-[40vh] md:min-h-[70vh] object-cover object-bottom" 
    />

  </div>
</div>


      {/* 2. THE PILL CARD */}
      <div className="relative z-10 w-full mx-auto rounded-[40px] md:rounded-[80px] max-w-[95%] overflow-hidden bg-zinc-900/40 backdrop-blur-md border border-white/5 shadow-2xl mb-20 md:mb-32">
        
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