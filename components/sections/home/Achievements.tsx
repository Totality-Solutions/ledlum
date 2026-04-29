
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { PopupForm } from "@/components/common/PopupForm";
import BgImg from "@/public/images/home/home-bg4.webp";

interface Props {
  onTriggerForm: () => void;
}

const ACHIEVEMENTS = [
  { id: "01", value: "23+", label: "YEARS OF EXPERIENCE", image: "/images/home/achievment1.png" },
  { id: "02", value: "400+", label: "PARTNERS", image: "/images/home/achievment2.webp" },
  { id: "03", value: "1,100+", label: "PRODUCTS", image: "/images/home/achievment3.webp" },
  { id: "04", value: "30,000+", label: "BURNING HOURS", image: "/images/home/achievment4.webp" },
];

export default function Achievements({ onTriggerForm }: Props) {
  const [activeId, setActiveId] = useState(ACHIEVEMENTS[0].id);
  const [showForm, setShowForm] = useState(false);
  const hasTriggered = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Check if intersecting AND if we haven't triggered it yet
      if (entry.isIntersecting && !hasTriggered.current) {
        onTriggerForm();
        hasTriggered.current = true; // Set flag to true so it never fires again
      }
    },
    { threshold: 0.5 }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);
  
  return () => {
    if (sectionRef.current) observer.unobserve(sectionRef.current);
    observer.disconnect();
  };
}, [onTriggerForm]); // Added onTriggerForm to dependency array for best practice

  return (
    <Section ref={sectionRef} className="relative pt-12 lg:py-20 bg-cover bg-top bg-no-repeat overflow-visible min-h-screen">
      <Image src={BgImg} alt="Background" fill priority className="object-cover -z-[20]" />
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
        <Image src="/images/about/ledlumline.webp" alt="background" fill className="object-cover object-center" />
      </div>

      <Container className="relative z-10">
        <div className="md:mb-20 mb-5">
          <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">Our.</h2>
          <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white">Achievements.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
          {/* LEFT SIDE: IMAGE PREVIEW */}
          <div className="relative w-[320px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl hidden lg:block border border-white/10 sticky top-32">
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeId === item.id ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <Image src={item.image} alt={item.label} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: ACCORDION */}
          <div className="flex-1 w-full flex flex-col">
            {ACHIEVEMENTS.map((stat) => {
              const isActive = activeId === stat.id;
              return (
                <div
                  key={stat.id}
                  onMouseEnter={() => setActiveId(stat.id)}
                  className={`relative border-b border-white/20 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden flex flex-col h-auto py-6 md:py-8 lg:py-0 ${isActive ? "lg:h-[190px]" : "lg:h-[80px]"}`}
                >
                  <div className={`hidden lg:block transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "flex-grow" : "h-0"}`} />
                  <div className="block lg:hidden px-4">
                    <span className="text-desk-h3 md:text-desk-h1 font-bai text-logo leading-none">{stat.value}</span>
                    <span className="block text-tab-h3 md:text-desk-h3 font-pop tracking-[0.06em] md:tracking-[0.2em] uppercase mt-4 text-white">{stat.label}</span>
                  </div>
                  <div className={`hidden lg:block w-full px-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "relative pb-3 translate-y-0" : "absolute top-10 left-0 translate-y-0"}`}>
                    <div className="flex flex-col">
                      <span className={`text-desk-h1 font-bai font-semibold uppercase transition-all duration-700 ${isActive ? "text-logo opacity-100" : "text-logo/30 opacity-40"}`}>{stat.value}</span>
                      <span className={`text-desk-h3 font-semibold font-pop uppercase transition-all duration-700 ${isActive ? "text-white opacity-100 mt-2 h-auto block" : "text-white/0 opacity-0 h-0 overflow-hidden"}`}>{stat.label}</span>
                    </div>
                  </div>
                  <div className={`hidden lg:block absolute bottom-0 left-0 h-[1.5px] bg-logo transition-all duration-1000 z-10 ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}