

"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import type { CmsContent } from "@/lib/cms/defaults";
import { ChevronUp } from "@/lib/icons";

export default function Journey({ content }: { content: CmsContent<"about.journey"> }) {
  // undefined = nobody has interacted yet. In that state the first step is
  // shown open on mobile (via max-md: classes, so it's right on first paint
  // with no flash) and nothing is open on desktop.
  const [hoveredIndex, setHoveredIndex] = useState<number | null | undefined>(undefined);

  const steps = content.steps || [];

  return (
    <Section className="bg-black text-white overflow-hidden">
      <Container className="">

        {/* HEADER SECTION */}
        <div className="mb-16">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              {content.title1}
            </h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
              {content.title2}
            </p>
          </div>

        {/* TIMELINE CONTAINER - Restored gap-4 and gap-6 */}
        <div className="flex flex-col w-full gap-4 md:gap-6">
          {steps.map((step, i) => {
            const isActive = hoveredIndex === i;
            const isMobileDefault = hoveredIndex === undefined && i === 0;

            return (
            <div
              key={i}
              // Hover only for a real mouse: a tap also fires pointerenter, and
              // its pointerleave would close the step the tap just opened.
              onPointerEnter={(e) => e.pointerType === "mouse" && setHoveredIndex(i)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setHoveredIndex(null)}
              onClick={() => setHoveredIndex(isActive || isMobileDefault ? null : i)}
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
                  isActive ? "text-logo scale-105" : isMobileDefault ? "text-[#555555] max-md:text-logo max-md:scale-105" : "text-[#555555]"
                }`}>
                  {step.year}
                </span>
              </div>

              {/* VERTICAL LINE - No Dot */}
              <div className="relative z-10 flex flex-col">
                <div className={`w-[1px] h-full transition-all duration-700 ${
                  isActive ? "bg-logo" : isMobileDefault ? "bg-white/10 max-md:bg-logo" : "bg-white/10"
                }`} />
              </div>

              {/* CONTENT BLOCK */}
              <div className="relative z-10 flex-grow py-8 md:py-12 pl-6 md:pl-16 pr-4 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`text-desk-section font-pop font-medium text-[#555555] transition-colors duration-500  ${
                    isActive ? "text-white" : isMobileDefault ? "text-[#555555] max-md:text-white" : "text-[#555555]"
                  }`}>
                    {step.title}
                  </h3>

                  {/* Mobile only: shows the step can be opened / closed */}
                  <span
                    aria-hidden="true"
                    className={`md:hidden mt-1 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-500 ${
                      isActive || isMobileDefault ? "border-logo text-logo rotate-0" : "border-white/20 text-white/50 rotate-180"
                    }`}
                  >
                    <ChevronUp size={16} />
                  </span>
                </div>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : isMobileDefault
                        ? "grid-rows-[0fr] opacity-0 mt-0 max-md:grid-rows-[1fr] max-md:opacity-100 max-md:mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
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
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
