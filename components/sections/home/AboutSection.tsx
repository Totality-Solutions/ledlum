"use client";

import React from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import BgImg from '@/public/images/home/home-bg2.png';
import CTABtn from "@/components/layout/common/CTABtn"; // Adjust this path based on your folder structure

export default function WhoWeAreSection() {
  return (
    <Section className="relative min-h-[400px] overflow-hidden flex items-center">
      {/* Background Image Layer with Luminosity effect - Optimized */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={BgImg}
          alt="Background Texture"
          fill
          className="object-cover mix-blend-luminosity -z-10"
          priority
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
        {/* Color Overlay Layer (rgba(161, 147, 110, 0.50)) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(161, 147, 110, 0.50)' }}
        />
      </div>

      {/* Laptop Optimized Container: max-w-[1280px] */}
      <Container className="relative z-20 ">
        <div className="flex flex-col gap-5">

          {/* Title Header - Optimized Typography */}
          <div className="">
            <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
              Who.
            </h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
              We Are.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            {/* Description Text - Balanced for Laptop width */}
            <p className="max-w-[750px] text-white lg:text-desk-section font-medium leading-[1.6] font-pop ">
              Founded in 2005, LedLum creates LED lighting that transforms spaces into experiences. We
              combine design, technology, and efficiency to illuminate interiors, exteriors, and landscapes
              with precision and style.
              Our solutions are crafted to enhance every corner, highlight architectural beauty, and create
              moods that resonate. With every project, we redefine how light interacts with space, turning
              vision into reality.
            </p>

            {/* "Our Story" CTA Button - Now using the CTABtn Component */}
            <CTABtn
              label="Our Story"
              href="/our-story" // Or use onClick={() => ...}
              size="md"
              btnBg="#F3E7D8"
              circleBg="#96865D"
              btnHoverBg="#ffffff"
            />
          </div>

        </div>
      </Container>
    </Section>
  );
}