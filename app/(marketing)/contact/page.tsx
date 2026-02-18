
// "use client";

// import React, { useState } from "react";
// import TechGrid from "@/components/blog/TechGrid";

// export default function ContactPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => setIsSubmitting(false), 2000);
//   };

//   return (
//     <div className="relative min-h-screen text-white bg-black font-bai selection:bg-[#8D794E] selection:text-black overflow-hidden">
//       {/* <TechGrid /> */}

//       <div
//         className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2"
//         style={{
//           backgroundImage: "url('/images/about/ledlumline.png')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: '0.3'
//         }}
//       ></div>



//       <div
//         className="absolute z-0 pointer-events-none"
//         style={{
//           width: '1608px',
//           height: '2010px',
//           /* Using your exact calculation for horizontal centering with an offset */
//           left: 'calc(50% - 1608px / 2 + 10px)',
//           top: '277px',
//           backgroundImage: "url('/images/blog/not-bg.jpg')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           mixBlendMode: 'difference',
//           opacity: '0.05',
//         }}
//       />


//       <main className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 min-h-screen flex items-center pt-24 pb-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start w-full">

//           {/* --- LEFT COLUMN: INFO --- */}
//           <div className="space-y-16">
//             <header className="space-y-8">
//               {/* <h1 className="desk-h1 sm:mob-h1 leading-[0.9] tracking-tighter">
//                 Get. <br /> <span className="text-zinc-500 lowercase">in touch.</span>
//               </h1> */}

//             <h1 className="leading-none tracking-tighter">
//     {/* "Get." - Uses desk-h1 for 48px on desktop */}
//     <span className="desk-h1 block text-white md:!text-[48px] !font-pop !font-medium capitalize">
//       Get.
//     </span>
    
//     {/* "in touch." - Uses desk-h3 for 32px on desktop */}
//     <span className="desk-h3 block text-zinc-500 md:!text-[32px] !font-pop !font-normal lowercase">
//       in touch.
//     </span>
//   </h1>
//               <p className="body-sm text-zinc-400 max-w-sm leading-relaxed lowercase">
//                 A practical guide to selecting efficient, high-performance lighting systems for offices.
//               </p>
//             </header>

//             <div className="space-y-4 max-w-[480px]">
//               <ContactLink
//                 label="E-mail"
//                 value="info@ledlum.com"
//                 iconType="mail"
//               />
//               <ContactLink
//                 label="Call us"
//                 value="+91 96631 02951"
//                 iconType="phone"
//               />
//               <ContactLink
//                 label="Msg on Whatsapp"
//                 value="10:00 am to 6:00 pm"
//                 iconType="whatsapp"
//               />
//             </div>
//           </div>

//           {/* --- RIGHT COLUMN: FORM --- */}
//           <div className="w-full lg:pt-4">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   required
//                   className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white"
//                 />
//                 <input
//                   type="email"
//                   placeholder="E-mail / Contact no."
//                   required
//                   className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white"
//                 />
//                 <textarea
//                   placeholder="Message"
//                   rows={6}
//                   required
//                   className="w-full bg-white/5 border border-white/10 rounded-[40px] px-8 py-8 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white resize-none"
//                 />
//               </div>

//               <div className="flex items-center justify-between gap-4 pt-8 w-full">
//                 {/* Reset Button */}
//                 <button
//                   type="reset"
//                   className="group flex items-center justify-center gap-2 
//                w-[140px] h-[48px] md:w-[180px] md:h-[56px] 
//                rounded-full bg-[#1A1A1A] border border-white/10 
//                hover:bg-[#222] transition-all cursor-pointer shrink-0"
//                 >
//                   <span className="button-xs text-zinc-400 capitalize">Reset</span>
//                   <svg className="w-4 h-4 text-zinc-500 group-hover:rotate-180 transition-transform " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//                     <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m0 0V3m0 5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16m0 0v5m0-5h-5" />
//                   </svg>
//                 </button>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="group flex items-center justify-between 
//                w-[140px] h-[48px] md:w-[180px] md:h-[56px] 
//                bg-[#E5E1D8] text-black pl-4 pr-1 md:pl-8 md:pr-1.5 
//                rounded-full hover:bg-white transition-all  
//                cursor-pointer disabled:opacity-50 shrink-0"
//                 >
//                   <span className="button-sm font-bold capitalize">
//                     {isSubmitting ? "..." : "Submit"}
//                   </span>
//                   <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-[#8D794E] flex items-center justify-center text-white transition-transform group-hover:rotate-45 shrink-0">
//                     <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                       <line x1="7" y1="17" x2="17" y2="7"></line>
//                       <polyline points="7 7 17 7 17 17"></polyline>
//                     </svg>
//                   </div>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function ContactLink({ label, value, iconType }: { label: string, value: string, iconType: 'mail' | 'phone' | 'whatsapp' }) {
//   const icons = {
//     mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
//     phone: "M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
//     whatsapp: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42 1.56 1.56 2.41 3.63 2.41 5.83 0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.46-.72-1.69-.8-.23-.07-.39-.12-.56.12-.17.25-.66.8-.81.98-.15.17-.3.2-.55.07-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.09-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.51-.4-.44-.56-.45-.14-.01-.31-.01-.47-.01z"
//   };

//   return (
//     <div className="group flex items-center justify-between p-2 rounded-full border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] transition-all cursor-pointer font-pop">
//       <div className="flex items-center gap-5 pl-1">
//         <div className="w-14 h-14 rounded-full bg-[#8D794E] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-95">
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//             <path d={icons[iconType]} />
//           </svg>
//         </div>
//         <div className="space-y-0.5">
//           <p className="button-xs text-white capitalize leading-none font-semibold">{label}</p>
//           <p className="body-xs text-zinc-500 tracking-wide lowercase">{value}</p>
//         </div>
//       </div>
//       <div className="mr-3 w-9 h-9 rounded-full bg-[#8D794E]/20 flex items-center justify-center text-white group-hover:bg-[#8D794E] ">
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform">
//           <line x1="7" y1="17" x2="17" y2="7"></line>
//           <polyline points="7 7 17 7 17 17"></polyline>
//         </svg>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";

/**
 * CONTACT PAGE
 * Integrated with global typography protection and responsive background opacity.
 */
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen text-white bg-black font-bai selection:bg-[#8D794E] selection:text-black overflow-hidden">
      
      {/* 1. GLOBAL BACKGROUND LAYER - Responsive Opacity */}
      <div
        className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2 transition-opacity duration-1000 opacity-10 md:opacity-30"
        style={{
          backgroundImage: "url('/images/about/ledlumline.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. TEXTURE OVERLAY - Adjusted for mobile readability */}
      <div
        className="absolute z-0 pointer-events-none opacity-[0.02] md:opacity-[0.05]"
        style={{
          width: '1608px',
          height: '2010px',
          left: 'calc(50% - 1608px / 2 + 10px)',
          top: '277px',
          backgroundImage: "url('/images/blog/not-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'difference',
        }}
      />

      <main className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 min-h-screen flex items-center pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start w-full">

          {/* --- LEFT COLUMN: INFO --- */}
          <div className="space-y-12 md:space-y-16">
            <header className="space-y-6 md:space-y-8">
              <h1 className="leading-none tracking-tighter">
                {/* FIX: We use !text-[rem] to stop the global 1rem mobile override.
                   We use !font-pop to ensure it stays Poppins regardless of parent.
                */}
                <span className="desk-h1 block text-white !text-[3.5rem] md:!text-[var(--text-desk-h1)] !font-pop !font-medium capitalize">
                  Get.
                </span>
                
                <span className="desk-h3 block text-zinc-500 !text-[2rem] md:!text-[var(--text-desk-h3)] !font-pop !font-normal lowercase">
                  in touch.
                </span>
              </h1>
              
              <p className="body-sm !text-[0.9rem] md:!text-[var(--text-body-sm)] text-zinc-400 max-w-sm leading-relaxed lowercase">
                A practical guide to selecting efficient, high-performance lighting systems for offices.
              </p>
            </header>

            <div className="space-y-4 max-w-[480px]">
              <ContactLink 
                label="E-mail" 
                value="info@ledlum.com" 
                iconType="mail" 
              />
              <ContactLink 
                label="Call us" 
                value="+91 96631 02951" 
                iconType="phone" 
              />
              <ContactLink 
                label="Msg on Whatsapp" 
                value="10:00 am to 6:00 pm" 
                iconType="whatsapp" 
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="w-full lg:pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 md:py-6 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white"
                />
                <input
                  type="email"
                  placeholder="E-mail / Contact no."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 md:py-6 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white"
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-[30px] md:rounded-[40px] px-8 py-6 md:py-8 body-sm focus:outline-none focus:border-[#8D794E]/50 transition-all placeholder:text-zinc-700 text-white resize-none"
                />
              </div>

              {/* BUTTON GROUP */}
              <div className="flex items-center justify-between gap-4 pt-6 md:pt-8 w-full">
                {/* Reset Button */}
                <button
                  type="reset"
                  className="group flex items-center justify-center gap-2 
                  w-[120px] h-[48px] md:w-[180px] md:h-[56px] 
                  rounded-full bg-[#1A1A1A] border border-white/10 
                  hover:bg-[#222] transition-all cursor-pointer shrink-0"
                >
                  <span className="button-xs text-zinc-400 capitalize">Reset</span>
                  <svg className="w-4 h-4 text-zinc-500 group-hover:rotate-180 transition-transform " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m0 0V3m0 5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16m0 0v5m0-5h-5" />
                  </svg>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-between 
                  w-[150px] h-[48px] md:w-[180px] md:h-[56px] 
                  bg-[#E5E1D8] text-black pl-5 pr-1 md:pl-8 md:pr-1.5 
                  rounded-full hover:bg-white transition-all  
                  cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <span className="button-sm font-bold capitalize">
                    {isSubmitting ? "..." : "Submit"}
                  </span>
                  <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-[#8D794E] flex items-center justify-center text-white transition-transform group-hover:rotate-45 shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * CONTACT LINK COMPONENT
 */
function ContactLink({ label, value, iconType }: { label: string, value: string, iconType: 'mail' | 'phone' | 'whatsapp' }) {
  const icons = {
    mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    phone: "M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    whatsapp: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42 1.56 1.56 2.41 3.63 2.41 5.83 0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.46-.72-1.69-.8-.23-.07-.39-.12-.56.12-.17.25-.66.8-.81.98-.15.17-.3.2-.55.07-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.09-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.51-.4-.44-.56-.45-.14-.01-.31-.01-.47-.01z"
  };

  return (
    <div className="group flex items-center justify-between p-2 rounded-full border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] transition-all cursor-pointer font-pop">
      <div className="flex items-center gap-5 pl-1">
        <div className="w-14 h-14 rounded-full bg-[#8D794E] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-95">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d={icons[iconType]} />
          </svg>
        </div>
        <div className="space-y-0.5">
          <p className="button-xs text-white capitalize leading-none font-semibold">{label}</p>
          <p className="body-xs text-zinc-500 tracking-wide lowercase">{value}</p>
        </div>
      </div>
      <div className="mr-3 w-9 h-9 rounded-full bg-[#8D794E]/20 flex items-center justify-center text-white group-hover:bg-[#8D794E] transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  );
}