// "use client";

// import React from "react";
// import Image from "next/image";
// import ImageSliderCard from "@/components/layout/common/InfiniteCarousel";
// import { Container } from "@/components/layout/Container";
// import Section from "@/components/layout/Section";
// import MarqueeFlow from "@/components/layout/common/MarqueeFlow";
// import TrustedPartnersSection from "./TrustedPartners";

// // --- ASSETS ---
// import productImg1 from "@/public/images/home/product-1.png";
// import productImg2 from "@/public/images/home/product-2.png";
// import Arrival1 from "@/public/images/home/new-arrival.png";
// import BgImg from '@/public/images/home/home-bg3.png'; // Using your existing background

// // --- DATA ---
// const LIGHTING_IMAGES = [productImg1, productImg2, Arrival1];

// const PARTNERS = [
//   { id: 1, name: "Apple", icon: "" },
//   { id: 2, name: "Google", icon: "G" },
//   { id: 3, name: "Drive", icon: "△" },
//   { id: 4, name: "VS Code", icon: "V" },
//   { id: 5, name: "Framer", icon: "F" },
//   { id: 6, name: "Edge", icon: "e" },
//   { id: 7, name: "Figma", icon: "Fi" },
//   { id: 8, name: "NextJS", icon: "N" },
// ];

// export default function CombinedLightingPartners() {
//   return (
//     <Section 
//       className="relative  flex flex-col gap-24 lg:gap-32 bg-cover bg-center bg-no-repeat will-change-transform"
//     >
//     <Image
//       src={BgImg}
//       alt="Background"
//       fill
//       priority
//       quality={100}
//       className="object-cover -z-[20]"
//     />
//     <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
//                       <Image 
//                         src="/images/about/ledlumline.png"
//                         alt="background texture"
//                         fill
//                         className="object-cover object-center"
//                       />
//           </div>
//       {/* PART 1: TRUSTED PARTNERS SECTION */}
//       <Container className="max-w-[1280px] 2xl:max-w-[1600px] ">
//         {/* HEADING SECTION */}
//         {/* <div className="mb-12">
//           <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
//             Our.
//           </h2>
//           <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
//             Trusted Partners.
//           </p>
//         </div> */}

//         {/* MARQUEE FLOW CAROUSEL */}
//         {/* <MarqueeFlow
//           items={PARTNERS}
//           gap={20}
//           speed={2000}
//           renderItem={(partner) => (
//             <div 
//               className="w-full h-[70px] lg:h-[90px] bg-[#5B5442] rounded-[45px] flex items-center justify-center transition-all duration-500 hover:bg-[#4a4435] group shadow-xl border border-white/5 cursor-pointer"
//             >
//               <div className="text-white text-2xl lg:text-3xl font-bold opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
//                 {partner.icon}
//               </div>
//             </div>
//           )}
//         /> */}
//       </Container>
//       {/* PART 2: LIGHTING SECTION */}
// <Container className="">
//   <div className=" mb-12">
//     <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
//       Lighting.
//     </h2>
//     <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
//       that defines the space.
//     </p>
//   </div>
  
//   {/* 1. Added max-w-2xl to limit the width 
//       2. Added aspect-video or aspect-square if you want it even shorter
//   */}
//   <div className="flex justify-center"> {/* Use justify-center if you want it in the middle */}
//     <ImageSliderCard 
//       images={LIGHTING_IMAGES} 
//       interval={5000} 
//       className="w-full aspect-video md:aspect-[12/4] " 
//     />
//   </div>
// </Container>
//     </Section>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageSliderCard from "@/components/layout/common/InfiniteCarousel";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

// --- ASSETS ---
import BgImg from '@/public/images/home/home-bg3.png';

// --- LIVE ASSETS (Unsplash Lighting Images) ---
const LIGHTING_IMAGES = [
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=2080&auto=format&fit=crop", 
];

// --- DATA ---
const BLOG_LINKS = [
  "/blog/redefining-ambience-mood",
  "/blogs/wooden-tier-lighting",
  "/blogs/modern-minimalist-trends",
];

const SLIDE_INTERVAL = 5000;

export default function CombinedLightingPartners() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync logic: Track which slide is active based on the interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIGHTING_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const handleSliderClick = () => {
    const targetLink = BLOG_LINKS[currentIndex];
    router.push(targetLink);
  };

  return (
    <Section 
      className="relative flex flex-col gap-24 lg:gap-32 bg-cover bg-center bg-no-repeat will-change-transform"
    >
      <Image
        src={BgImg}
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover -z-[20]"
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
        <Image 
          src="/images/about/ledlumline.png"
          alt="background texture"
          fill
          className="object-cover object-center"
        />
      </div>

      <Container className="max-w-[1280px] 2xl:max-w-[1600px] ">
        {/* Partners content placeholder */}
      </Container>

      <Container className="">
        <div className="mb-12">
          <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
            Blogs
          </h2>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
            that defines the space.
          </p>
        </div>
        
        <div className="flex justify-center"> 
          <div 
            onClick={handleSliderClick}
            className="w-full cursor-pointer relative group overflow-hidden rounded-[12px] md:rounded-[24px]"
          >
            <ImageSliderCard 
              images={LIGHTING_IMAGES as any} 
              interval={SLIDE_INTERVAL} 
              className="w-full aspect-video md:aspect-[12/4] transition-all duration-500 group-hover:scale-[1.01]" 
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

