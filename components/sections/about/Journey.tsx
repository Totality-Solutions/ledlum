

"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export default function Journey() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    { year: "1989", title: "The Beginning", desc: "Establishing the foundation of specialized lighting expertise." },
    { year: "2007", title: "ABBA Lighting is Born", desc: "Sumeet founded ABBA Lighting for mid to high-end spaces." },
    { year: "2017", title: "Enter Ledlum Lighting", desc: "Expanding with architectural designs and high-performance fixtures." },
    { year: "2020", title: "Artizan by Ledlum", desc: "Launching a curated collection focusing on artisanal craftsmanship." },
    { year: "2022", title: "Astara by Ledlum", desc: "Introducing innovative smart lighting solutions." },
    { year: "2023", title: "Volaris by Ledlum", desc: "Sustainable, high-efficiency lighting for global markets." }
  ];

  return (
    <section className="bg-black text-white py-20 md:py-32 overflow-hidden">
      <Container className="!max-w-none px-6 md:px-[5vw] lg:px-[74px]">
        
        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-24">
          <h2 className="desk-h1 !text-[2.5rem] md:!text-[var(--text-desk-h1)] text-white leading-[1.1] font-pop">
            <span className="block opacity-50 !font-extralight mb-1 font-pop font-bold">Our </span>
            <span className="block font-pop">Journey</span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER - Restored gap-4 and gap-6 */}
        <div className="flex flex-col w-full gap-4 md:gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              className="relative flex items-stretch group cursor-pointer transition-all duration-500 w-full"
            >
              {/* HOVER BACKGROUND */}
              <div 
                className={`absolute inset-0 z-0 bg-white/[0.04] transition-opacity duration-500 rounded-2xl ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`} 
              />

              {/* YEAR BLOCK */}
              <div className="relative z-10 w-24 sm:w-28 md:w-40 lg:w-48 flex-shrink-0 text-right py-8 md:py-12 pr-6 md:pr-12">
                <span className={`desk-h3 !text-[36px] md:!text-[var(--text-desk-h3)] transition-all duration-500 block leading-none ${
                  hoveredIndex === i ? "text-white scale-105" : "text-zinc-800"
                }`}>
                  {step.year}
                </span>
              </div>

              {/* VERTICAL LINE - No Dot */}
              <div className="relative z-10 flex flex-col">
                <div className={`w-[1px] h-full transition-all duration-700 ${
                  hoveredIndex === i ? "bg-white/40" : "bg-white/10"
                }`} />
              </div>

              {/* CONTENT BLOCK */}
              <div className="relative z-10 flex-grow py-8 md:py-12 pl-6 md:pl-16 pr-4 flex flex-col justify-center">
                <h3 className={`desk-h3 !text-[24px] md:!text-[var(--text-desk-h3)] transition-colors duration-500 tracking-tight leading-tight ${
                  hoveredIndex === i ? "text-white" : "text-zinc-600"
                }`}>
                  {step.title}
                </h3>

                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    hoveredIndex === i ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="body !text-[16px] md:!text-[var(--text-body)] !text-zinc-400 leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}