

"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

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
    <Section className="bg-black text-white overflow-hidden">
      <Container className="">
        
        {/* HEADER SECTION */}
        <div className="mb-16">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              Our
            </h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
              Journey
            </p>
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
              {/* <div 
                className={`absolute inset-0 z-0 bg-white/[0.04] transition-opacity duration-500 rounded-2xl ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`} 
              /> */}

              {/* YEAR BLOCK */}
              <div className="relative z-10 w-24 sm:w-28 md:w-40 lg:w-48 flex-shrink-0 text-right py-8 md:py-12 pr-6 md:pr-12">
                <span className={`font-bai text-desk-outer font-bold transition-all duration-500 block  ${
                  hoveredIndex === i ? "text-logo scale-105" : "text-[#555555]"
                }`}>
                  {step.year}
                </span>
              </div>

              {/* VERTICAL LINE - No Dot */}
              <div className="relative z-10 flex flex-col">
                <div className={`w-[1px] h-full transition-all duration-700 ${
                  hoveredIndex === i ? "bg-logo" : "bg-white/10"
                }`} />
              </div>

              {/* CONTENT BLOCK */}
              <div className="relative z-10 flex-grow py-8 md:py-12 pl-6 md:pl-16 pr-4 flex flex-col justify-center">
                <h3 className={`text-desk-section font-pop font-medium text-[#555555] transition-colors duration-500  ${
                  hoveredIndex === i ? "text-white" : "text-[#555555]"
                }`}>
                  {step.title}
                </h3>

                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    hoveredIndex === i ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-body font-pop font-regular leading-relaxed ">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}