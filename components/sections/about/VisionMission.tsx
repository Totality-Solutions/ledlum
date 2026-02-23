

import React from 'react';
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

interface ArrowCornerProps {
  className?: string;
}

interface ValueItemProps {
  label: string;
  className?: string;
  lineHeight: string;
  orientation: 'top' | 'bottom';
}

export default function VisionMission() {
  // Styles using your global CSS variables and architectural overrides
  const ourStyle = "block !text-[48px] md:!text-[72px] lg:!text-[84px] text-white opacity-90 font-pop font-medium mb-0 leading-[0.8] tracking-tighter ";
  const wordStyle = "block !text-[24px] md:!text-[32px] lg:!text-[40px] font-pop font-bold-300 leading-tight text-white tracking-tight ";
  const bodyStyle = "body !text-[13px] md:!text-[14px] lg:!text-[15px] !text-zinc-500 mt-6 leading-relaxed font-pop font-light max-w-[280px] md:max-w-[320px] ";
  const arrowStyle = "w-5 h-5 md:w-6 md:h-6 text-white mb-4";

  return (
    <Section className="relative bg-black text-white py-24 md:py-32 lg:py-52 overflow-hidden font-bai">
      {/* 1. GLOBAL BACKGROUND LAYER */}
      <div
        className="fixed inset-0 z-[9999] z-0 opacity-30 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center pointer-events-none
                   [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]"
        aria-hidden="true"
      />
      {/* 1. MISSION CIRCULAR IMAGE */}
      {/* <div className="absolute top-[20%] left-[-10%] md:left-[5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] z-0 pointer-events-none">
        <div 
          className="w-full h-full rounded-full opacity-90 blur-[30px]"
          style={{ 
            backgroundImage: `url('/images/about/mission2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            transform: 'scale(1.5)'
          }}
        />
      </div> */}


      {/* 1. MISSION CIRCULAR IMAGE */}
      <div className="absolute top-[20%] left-[-10%] md:left-[5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] z-0 pointer-events-none">
        <div
          /* opacity-20: Default for mobile 
             md:opacity-90: Reverts back to high opacity for tablets/desktops 
          */
          className="w-full h-full rounded-full blur-[30px] transition-opacity duration-700 opacity-20 md:opacity-90"
          style={{
            backgroundImage: `url('/images/about/mission2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            transform: 'scale(1.7)'
          }}
        />
      </div>

      {/* 2. WAVY LINE IMAGE */}
      <div
        className="absolute bottom-0 left-0 w-full h-[350px] z-0 pointer-events-none  "
        style={{
          backgroundImage: `url('/images/about/abstractline.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          maskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)'
        }}
      />

      <Container className="relative z-10 !max-w-none px-6 md:px-[10vw]">
        <div className="flex flex-col space-y-32 md:space-y-0 relative min-h-fit md:min-h-[850px]">

          {/* VISION - Top Right */}
          <div className="md:absolute md:top-0 md:right-0 flex flex-col items-center md:items-start text-center md:text-left">
            <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-45`} />
            <h2 className="font-pop">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Vision.</span>
            </h2>
            <p className={bodyStyle}>
              To support smarter, greener infrastructure through innovative LED solutions and expert service.
            </p>
          </div>

          {/* MISSION - Center Left */}
          <div className="md:absolute md:top-[40%] md:left-5 flex flex-col items-center md:items-start text-center md:text-left">
            <ArrowCorner className={`${arrowStyle} md:rotate-90 rotate-[135deg]`} />
            <h2 className="font-pop">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Mission.</span>
            </h2>
            <p className={bodyStyle}>
              To deliver lighting systems that enhance environments through efficiency and design excellence.
            </p>
          </div>

          {/* CORE VALUES - Bottom Right */}
          <div className="md:absolute md:bottom-[20%] md:right-0 flex flex-col items-center md:items-start text-center md:text-left">
            <ArrowCorner className={`${arrowStyle} md:-rotate-90 -rotate-[135deg]`} />
            <h2 className="font-pop">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Core Values.</span>
            </h2>
          </div>
        </div>

        {/* BOTTOM VALUE TICKERS */}
        <div className="relative w-full mt-32 md:mt-0 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 md:h-[180px] pt-10 border-white/10    ">
          <ValueItem label="Customer-first service" className="md:absolute md:left-0 md:bottom-0" lineHeight="h-16" orientation="bottom" />
          <ValueItem label="Engineering excellence" className="md:absolute md:left-[30%] md:top-0" lineHeight="h-16" orientation="top" />
          <ValueItem label="Energy efficiency & Sustainability" className="md:absolute md:left-[60%] md:bottom-0" lineHeight="h-16" orientation="bottom" />
          <ValueItem label="Customization & Flexibility" className="md:absolute md:right-0 md:top-0" lineHeight="h-16" orientation="top" />
        </div>
      </Container>
    </Section>
  );
}

function ArrowCorner({ className }: ArrowCornerProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ValueItem({ label, className, lineHeight, orientation }: ValueItemProps) {
  return (
    <div className={`flex flex-col items-center group transition-all duration-500 ${className}`}>
      {orientation === 'top' && (
        <>
          <span className="body-sm !text-[10px] md:!text-[11px] tracking-[0.2em] !text-zinc-500 mb-4 transition-colors text-center font-light max-w-[120px]">
            {label}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] transition-all" />
        </>
      )}
      <div className={`w-[1px] ${lineHeight} bg-gradient-to-b from-white/20 via-white/5 to-transparent from-white/40 transition-all`} />
      {orientation === 'bottom' && (
        <>
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] transition-all" />
          <span className="body-sm !text-[10px] md:!text-[11px] tracking-[0.2em] !text-zinc-500 mt-4 transition-colors text-center font-light max-w-[120px]">
            {label}
          </span>
        </>
      )}
    </div>
  );
}