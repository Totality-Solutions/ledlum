

"use client";
import React from 'react';
import Image from 'next/image';
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CoreValues from './CoreValues';

interface ArrowCornerProps {
  className?: string;
}

export default function VisionMission() {
  const ourStyle = "block text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white ";
  const wordStyle = "block text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white -mt-2 ";
  const bodyStyle = "text-body font-regular leading-relaxed font-pop text-zinc-500 max-w-[280px] md:max-w-[320px] ";
  const arrowStyle = "w-5 h-5 md:w-8 md:h-8 text-white mb-2";

  return (
    <Section className="relative bg-black text-white overflow-hidden ">
      <Container>
        {/* 1. GLOBAL BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)'
          }}>
          <Image
            src="/images/about/ledlumline.png"
            alt="background texture"
            fill
            className="object-cover"
          />
        </div>

        {/* 2. MISSION CIRCULAR IMAGE */}
        <div className="absolute top-[20%] left-[-10%] md:left-[5%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] z-0 pointer-events-none ">
          <div className={`relative w-full h-full rounded-full blur-[30px] transition-opacity duration-700 opacity-20 md:opacity-40  lg:opacity-50 overflow-hidden 
        
        /* 4. Large Screens (min-width: 1440px) */
  [@media(min-width:1440px)]:opacity-100 
  [@media(min-width:1440px)]:opacity-100 
  
  /* 5. Ultra-Wide / 4K (min-width: 1920px) */
  [@media(min-width:1920px)]:opacity-100  
  [@media(min-width:1920px)]:opacity-100 
        
        `}
            style={{
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
              maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
              transform: 'scale(1.7)'
            }}>
            <Image
              src="/images/about/mission2.png"
              alt="Mission background"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Text Container keeps its own padding for content alignment */}
        <Container className="relative z-10 !max-w-none px-6 md:px-[10vw]">
          <div className="flex flex-col space-y-32 md:space-y-0 relative min-h-fit md:min-h-[1000px]">

            {/* VISION */}
            <div className="md:absolute md:top-0 md:right-0 flex flex-col items-center md:items-end text-center md:text-right">
              <div style={{ rotate: '183deg', }}>

                <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-45 `} />
              </div>

              <h2 className="font-pop">
                <span className={ourStyle}>Our.</span>
                <span className={wordStyle}>Vision.</span>
              </h2>
              <p className={bodyStyle}>
To redefine architectural lighting through refined design, advanced technology, and meaningful spatial impact.
              </p>
            </div>

            {/* MISSION */}
            <div className="md:absolute md:top-[40%] md:left-5 flex flex-col items-center md:items-start text-center md:text-left md:mt-[10%] md:left-[-54px] ">
              <ArrowCorner className={`${arrowStyle} md:rotate-90 rotate-[135deg]`} />
              <h2 className="font-pop">
                <span className={ourStyle}>Our.</span>
                <span className={wordStyle}>Mission.</span>
              </h2>
              <p className={bodyStyle}>
To collaborate with architects and designers in delivering lighting systems that balance aesthetics, performance, and longevity.
              </p>
            </div>

            {/* CORE VALUES */}
            <div className="md:absolute md:bottom-[8%] md:right-0 flex flex-col items-center md:items-start text-center md:text-left">
              <div style={{ rotate: '275deg', translate: '115px', }}> <ArrowCorner className={`${arrowStyle} md:-rotate-90 -rotate-[135deg]`} /></div>

              <h2 className="font-pop">
                <span className={ourStyle}>Our.</span>
                <span className={wordStyle}>Core Values.</span>
              </h2>
            </div>
          </div>
        </Container>

        {/* This wrapper now forces full width by resetting internal section padding */}
        {/* <div className="relative z-10 w-full block">
        <CoreValues />
      </div> */}
      </Container>
      {/* This wrapper now forces full width by resetting internal section padding */}
      <div className="relative z-10 w-full block">
        <CoreValues />
      </div>
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




