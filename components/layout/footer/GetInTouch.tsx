// import React from 'react';
// import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";

// export function GetInTouch() {
//   return (
//     <section className="relative z-10 w-full pt-10 md:pt-32 flex flex-col items-center text-center">
//       <h2 className="text-4xl md:text-6xl font-bai font-bold text-white mb-4">
//         Get In Touch
//       </h2>
//       <p className="text-xl md:text-2xl font-pop font-light text-white/80 mb-10">
//         With Our Lighting Specialists.
//       </p>
      
//       <Link 
//         href="/contact" 
//         className="group flex items-center gap-3 bg-[#EFE3D3] px-8 py-4 rounded-full transition-transform hover:scale-105 duration-300"
//       >
//         <span className="text-black font-bai font-semibold text-lg">Our Story</span>
//         <div className="bg-[#A39678] rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
//           <ArrowUpRight className="w-5 h-5 text-white" />
//         </div>
//       </Link>
//     </section>
//   );
// }





import React from 'react';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GetInTouch() {
  return (
    <section className="relative z-10 w-full pt-20 pb-20 flex flex-col items-center text-center bg-[#111111]">
       <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2 opacity-10 md:opacity-30"
        style={{ backgroundImage: "url('/images/about/ledlumline.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      {/* Title: Manual sizing and font-bai */}
      <h2 className="font-pop font-bold-500 text-[48px] md:text-[64px] leading-tight text-white mb-2 tracking-tight">
        Get In Touch
      </h2>
      
      {/* Subtitle: Manual sizing and font-pop */}
      <p className="font-pop font-light text-[24px] md:text-[42px] text-white opacity-95 mb-14">
        With Our Lighting Specialists.
      </p>
      
      {/* Button: Exact color matching and shape */}
      <Link 
        href="/contact" 
        className="group flex items-center gap-5 bg-[#EFE3D3] pl-10 pr-4 py-3 rounded-full transition-all hover:scale-105 duration-300"
      >
        <span className="text-black font-pop font-semibold text-[22px]">
          Our Story
        </span>
        
        {/* Arrow Container: Circle matching the screenshot */}
        <div className="bg-[#A39678] rounded-full w-14 h-14 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
      </Link>
    </section>
  );
}