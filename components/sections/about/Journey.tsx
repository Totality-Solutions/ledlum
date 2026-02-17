"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export default function Journey() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    { 
      year: "1989", 
      title: "The Beginning", 
      desc: "Establishing the foundation of specialized lighting expertise with a focus on technical precision." 
    },
    { 
      year: "2007", 
      title: "ABBA Lighting is Born", 
      desc: "Sumeet founded ABBA Lighting, offering end-to-end LED lighting solutions tailored for mid to high-end spaces." 
    },
    { 
      year: "2017", 
      title: "Enter Ledlum Lighting", 
      desc: "Expanding the portfolio with cutting-edge architectural designs and high-performance fixtures." 
    },
    { 
      year: "2020", 
      title: "Artizan by Ledlum", 
      desc: "Launching a curated collection focusing on aesthetic appeal and artisanal craftsmanship in lighting." 
    },
    { 
      year: "2022", 
      title: "Astara by Ledlum", 
      desc: "Introducing innovative smart lighting solutions for modern living environments." 
    },
    { 
      year: "2023", 
      title: "Volaris by Ledlum", 
      desc: "Reaching new heights in sustainable, high-efficiency lighting for global markets." 
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-32 lg:py-40 overflow-hidden">
      <Container>
        {/* HEADER SECTION */}
        <div className="mb-12 md:mb-24 px-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] font-bai">
            Our <br /><span className="font-bold text-white">Journey</span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="max-w-6xl flex flex-col gap-1 md:gap-2">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              // UX: Improved touch interaction for mobile
              onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              className="relative flex items-stretch group cursor-pointer transition-all duration-500 px-2 sm:px-6 lg:px-8"
            >
              {/* HOVER BACKGROUND */}
              <div className={`absolute inset-0 z-0 bg-[#fefce8]/[0.06] transition-opacity duration-500 rounded-lg md:rounded-xl ${
                hoveredIndex === i ? "opacity-100" : "opacity-0"
              }`} />

              {/* YEAR BLOCK - Fluid width based on screen size */}
              <div className="relative z-10 w-16 sm:w-24 md:w-40 lg:w-48 flex-shrink-0 text-right py-8 md:py-12 pr-4 sm:pr-8 md:pr-14">
                <span className={`text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bai transition-all duration-500 block leading-none ${
                  hoveredIndex === i ? "text-yellow-100 scale-105" : "text-zinc-800 font-light"
                }`}>
                  {step.year}
                </span>
              </div>

              {/* SEGMENTED LINE */}
              <div className="relative z-10 flex flex-col">
                <div className={`w-[1px] h-full transition-all duration-700 ${
                  hoveredIndex === i ? "bg-yellow-100/40" : "bg-white/10"
                }`} />
              </div>

              {/* CONTENT BLOCK - Dynamic padding for better readability */}
              <div className="relative z-10 flex-grow py-8 md:py-12 pl-5 sm:pl-10 md:pl-16 pr-2 sm:pr-4">
                <h3 className={`font-bai text-base sm:text-xl md:text-3xl lg:text-4xl transition-colors duration-500 tracking-tight leading-tight ${
                  hoveredIndex === i ? "text-white" : "text-zinc-600"
                }`}>
                  {step.title}
                </h3>

                {/* DESCRIPTION - Max height optimized for mobile flow */}
                <div 
                  className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    hoveredIndex === i ? "max-h-[500px] opacity-100 mt-3 md:mt-8" : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  <p className="font-pop text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed max-w-2xl font-light">
                    <span className={`block transition-transform duration-700 ease-out ${
                      hoveredIndex === i ? "translate-y-0" : "translate-y-4"
                    }`}>
                      {step.desc}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}