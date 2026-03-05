"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import MarqueeFlow from "@/components/layout/common/MarqueeFlow";

// --- PARTNER DATA ---
// Replace the 'icon' strings with your actual SVG components or Image paths
const PARTNERS = [
  { id: 1, name: "Apple", icon: "" },
  { id: 2, name: "Google", icon: "G" },
  { id: 3, name: "Drive", icon: "△" },
  { id: 4, name: "VS Code", icon: "V" },
  { id: 5, name: "Framer", icon: "F" },
  { id: 6, name: "Edge", icon: "e" },
  { id: 7, name: "Figma", icon: "Fi" },
  { id: 8, name: "NextJS", icon: "N" },
];

export default function TrustedPartnersSection() {
  return (
      <Container className=" px-6 lg:px-10">
              {/* HEADING SECTION */}
              <div className="mb-12">
                <h2 className="desk-h2 text-white">
                  Our.
                </h2>
                <p className="desk-h3  -mt-2 text-white">
                  Trusted Partners.
                </p>
              </div>
      
              {/* MARQUEE FLOW CAROUSEL */}
              <MarqueeFlow
                items={PARTNERS}
                gap={20}
                speed={2000}
                mobileCount={1}
                renderItem={(partner) => (
                  <div 
                    className=" w-full md:w-auto h-[70px] lg:h-[90px] bg-[#5B5442] rounded-[45px] flex items-center justify-center transition-all duration-500 hover:bg-[#4a4435] group shadow-xl border border-white/5 cursor-pointer"
                  >
                    <div className="text-white text-2xl lg:text-3xl font-bold opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                      {partner.icon}
                    </div>
                  </div>
                )}
              />
            </Container>
  );
}