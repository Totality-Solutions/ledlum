// "use client";

// import React, { memo, useState } from "react";
// import CTABtn from "@/components/layout/common/CTABtn";

// const MobileContactSection = memo(function MobileContactSection() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       alert("Message sent successfully!");
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-col gap-8 px-4 pb-6 font-pop">
//       {/* Header Area */}
//       <div className="text-center md:text-left">
//         <h2 className="text-[32px] md:text-[42px] leading-tight font-medium text-white">
//           Get <span className="font-semibold block md:inline">in Touch.</span>
//         </h2>
//         <p className="text-sm text-white/40 mt-2 max-w-xs mx-auto md:mx-0">
//           A practical guide to selecting efficient, high-performance lighting systems.
//         </p>
//       </div>

//       {/* Form Area */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#8D794E] text-white transition-all"
//         />
//         <input
//           type="email"
//           placeholder="E-mail / Contact"
//           required
//           className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-[#8D794E] text-white transition-all"
//         />
//         <textarea
//           placeholder="Message"
//           rows={4}
//           required
//           className="w-full bg-white/5 border border-white/10 rounded-[24px] px-6 py-4 text-sm focus:outline-none focus:border-[#8D794E] text-white resize-none transition-all"
//         />

//         <div className="flex items-center justify-between gap-4 mt-2">
//            <button 
//              type="reset" 
//              className="text-white/50 text-sm hover:text-white transition-colors pl-2"
//            >
//              Reset
//            </button>
//           <CTABtn 
//             label={isSubmitting ? "..." : "Submit"} 
//             disabled={isSubmitting} 
//           />
//         </div>
//       </form>

//       {/* Quick Links - Simplified for Mobile */}
//       <div className="grid grid-cols-1 gap-3">
//         <QuickLink icon="mail" value="info@ledlum.com" />
//         <QuickLink icon="phone" value="+91 96631 02951" />
//       </div>
//     </div>
//   );
// });

// // Helper for the small links at bottom
// const QuickLink = ({ icon, value }: { icon: string; value: string }) => (
//   <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-full">
//     <div className="w-8 h-8 rounded-full bg-[#8D794E] flex items-center justify-center">
//        {/* Small simplified SVG icons */}
//        <div className="w-4 h-4 bg-white rounded-sm opacity-80" /> 
//     </div>
//     <span className="text-xs text-white/70">{value}</span>
//   </div>
// );

// export default MobileContactSection;


"use client";

import React, { memo, useState } from "react";
import CTABtn from "@/components/layout/common/CTABtn";

const  MobileContactSection = memo(function  MobileContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 font-pop w-full">
      {/* 1. Compact Header */}
      <div className="flex flex-col">
        <h1 className="flex items-baseline gap-2">
          <span className="text-[32px] font-medium text-white">Get.</span>
          <span className="text-[28px] font-semibold text-white/80">in Touch.</span>
        </h1>
        <p className="text-[13px] font-regular text-white/30 leading-tight">
          Selecting efficient lighting systems for offices.
        </p>
      </div>

      {/* 2. Compact Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm font-light text-white focus:border-[#8D794E]/50 transition-all"
        />
        <input
          type="email"
          placeholder="E-mail / Contact no."
          required
          className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3.5 text-sm font-light text-white focus:border-[#8D794E]/50 transition-all"
        />
        <textarea
          placeholder="Message"
          rows={3} // Reduced rows
          required
          className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 text-sm font-light text-white focus:border-[#8D794E]/50 transition-all resize-none"
        />

        <div className="flex items-center justify-between gap-4">
          <button type="reset" className="text-[12px] text-white/30  tracking-widest pl-2">
            Reset
          </button>
          <CTABtn
            label={isSubmitting ? "..." : "Submit"}
            disabled={isSubmitting}
          />
        </div>
      </form>

      {/* 3. Tighter Contact Links */}
      <div className="grid grid-cols-1 gap-2 pt-4 border-t border-white/5">
        <ContactLink label="Email" value="info@ledlum.com" iconType="mail" />
        <div className="grid grid-cols-2 gap-2">
           <ContactLink label="Call" value="+91 96631..." iconType="phone" isSmall />
           <ContactLink label="WA" value="10am-6pm" iconType="whatsapp" isSmall />
        </div>
      </div>
    </div>
  );
});

/**
 * COMPACT LINK COMPONENT
 */
const ContactLink = memo(function ContactLink({
  label,
  value,
  iconType,
  isSmall = false
}: {
  label: string;
  value: string;
  iconType: "mail" | "phone" | "whatsapp";
  isSmall?: boolean;
}) {
  const icons = {
    mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    phone: "M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    whatsapp: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2"
  };

  return (
    <div className={`flex items-center gap-3 p-1.5 rounded-full border border-white/5 bg-white/[0.02] ${isSmall ? 'justify-start' : 'justify-between'}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#8D794E] flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d={icons[iconType]} />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 leading-none">{label}</span>
          <span className="text-[11px] text-white font-light truncate max-w-[100px]">{value}</span>
        </div>
      </div>
    </div>
  );
});

export default  MobileContactSection;