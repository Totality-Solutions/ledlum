

"use client";

import React, { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import svgPaths from "@/components/layout/imports/svg-94g14nmwnx";

const REF_W = 1475.5;
const REF_H = 640;

function pct(x: number, of: number) {
  return `${((x / of) * 100).toFixed(4)}%`;
}

interface ValueLabelProps {
  label: string[];
  leftPx: number;
  topPx: number;
}

function ValueLabel({ label, leftPx, topPx }: ValueLabelProps) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ 
        left: pct(leftPx, REF_W), 
        top: pct(topPx, REF_H), 
        transform: "translateX(-50%)" 
      }}
    >
      {label.map((line, i) => (
        <p
          key={i}
          className="text-center whitespace-nowrap"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#dbdcdd",
            fontSize: "clamp(14px, 4vw, 16px)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

interface VerticalLineProps {
  leftPx: number;
  topPx: number;
  heightPx: number;
  direction?: "down" | "up";
}

function VerticalLine({ leftPx, topPx, heightPx, direction = "down" }: VerticalLineProps) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: pct(leftPx, REF_W),
        top: pct(topPx, REF_H),
        width: "1px",
        height: pct(heightPx, REF_H),
        transform: "translateX(-50%)" 
      }}
    >
      {direction === "up" && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] -mt-0.5 shrink-0" />
      )}
      <div
        className="w-full h-full"
        style={{
          background: direction === "down"
            ? "linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.05))"
            : "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.05))",
        }}
      />
      {direction === "down" && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] -mb-0.5 shrink-0" />
      )}
    </div>
  );
}

export default function CoreValues() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slides = [{ x: 169 }, { x: 424 }, { x: 814 }, { x: 1232 }];

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.x < -30 && activeIdx < slides.length - 1) setActiveIdx(activeIdx + 1);
    if (info.offset.x > 30 && activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  const CoreContent = ({ suffix }: { suffix: string }) => (
    <>
      <div
        className="absolute"
        style={{
          left: 0,
          top: pct(310, REF_H),
          width: "100%",
          height: pct(240, REF_H),
        }}
      >
        <div className="absolute inset-0" style={{ filter: "blur(18px)", opacity: 0.45 }}>
          <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1515.73 254.925">
            <path d={svgPaths.pd6d8900} fill={`url(#glow_grad_${suffix})`} />
            <defs>
              <linearGradient id={`glow_grad_${suffix}`} x1="1197.38" x2="1172.95" y1="24.9308" y2="266.411" gradientUnits="userSpaceOnUse">
                <stop stopColor="#222222" /><stop offset="0.26" stopColor="#ffffff" /><stop offset="1" stopColor="#FFD7A9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1515.73 254.925">
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="254.925" id={`wave_filter_${suffix}`} width="1515.73" x="0" y="4.76837e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /><feGaussianBlur result="effect1_foregroundBlur" stdDeviation="10" /><feTurbulence baseFrequency="0.999 0.999" numOctaves={3} seed={2430} type="fractalNoise" /><feDisplacementMap height="100%" in="effect1_foregroundBlur" result="displacedImage" scale={40} width="100%" xChannelSelector="R" yChannelSelector="G" /><feMerge result="effect2_texture"><feMergeNode in="displacedImage" /></feMerge>
            </filter>
            <linearGradient id={`wave_grad_${suffix}`} x1="1197.38" x2="1172.95" y1="24.9308" y2="266.411" gradientUnits="userSpaceOnUse">
              <stop stopColor="#222222" /><stop offset="0.259615" stopColor="white" /><stop offset="1" stopColor="#FFD7A9" />
            </linearGradient>
          </defs>
          <g filter={`url(#wave_filter_${suffix})`}><path d={svgPaths.pd6d8900} fill={`url(#wave_grad_${suffix})`} /></g>
        </svg>
      </div>

      <VerticalLine leftPx={424} topPx={358} heightPx={90} direction="up" />
      <VerticalLine leftPx={1232} topPx={350} heightPx={90} direction="up" />
      <VerticalLine leftPx={169} topPx={456} heightPx={90} direction="down" />
      <VerticalLine leftPx={814} topPx={388} heightPx={90} direction="down" />

      <ValueLabel label={["Design-led Innovation"]} leftPx={424} topPx={320} />
      <ValueLabel label={["Precision Engineering"]} leftPx={1232} topPx={285} />
      <ValueLabel label={["Performance Reliability"]} leftPx={169} topPx={560} />
      <ValueLabel label={["Architectural Harmony"]} leftPx={814} topPx={495} />
    </>
  );

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "transparent" }}>
      
      {/* --- MOBILE VIEW --- */}
      <div className="block md:hidden py-10">
        {/* Height increased slightly to 580px to accommodate bottom text */}
        <div className="relative w-full h-[580px] overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: -1500, right: 1500 }}
            onDragEnd={handleDragEnd}
            animate={{ 
              x: `calc(50vw - ${slides[activeIdx].x * 1.4}px)` 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="absolute top-0 left-0 h-full"
            style={{ width: `${REF_W}px` }}
          >
            {/* THE FIX:
              1. Removed complex style overrides.
              2. Added a -80px top margin to pull the "bottom" items up into view.
              3. Used origin-left to keep the horizontal math simple.
            */}
            <div className="relative w-full h-full scale-[1.4] origin-left -mt-20">
               <CoreContent suffix="mobile" />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === i ? "w-8 bg-white" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block w-full h-full xl:w-full xl:max-w-none">
        <div
          className="relative w-full"
          style={{ paddingBottom: `${((REF_H / REF_W) * 100).toFixed(4)}%` }}
        >
          <div className="absolute inset-0">
            <CoreContent suffix="desktop" />
          </div>
        </div>
      </div>

    </section>
  );
}