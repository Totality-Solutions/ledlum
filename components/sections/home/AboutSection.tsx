"use client";

import React from "react";
import Image from "@/components/common/SmartImage";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { cdnImg } from "@/lib/cdn";
import CTABtn from "@/components/layout/common/CTABtn";
import type { CmsContent } from "@/lib/cms/defaults";

export default function WhoWeAreSection({ content }: { content: CmsContent<"home.about"> }) {
  return (
    <Section className="relative min-h-[400px] overflow-hidden flex items-center">
      {/* Background Image Layer with Luminosity effect - Optimized */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || cdnImg("/images/home/home-bg2.webp")}
          alt="Background Texture"
          fill
          className="object-cover mix-blend-luminosity -z-10"
          loading="lazy"
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
              {content.title1}
            </h2>
            <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
              {content.title2}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            {/* Description Text - Balanced for Laptop width */}
            <p className="max-w-[750px] text-white lg:text-desk-section font-medium leading-[1.6] font-pop ">
              {content.body}
            </p>

            {/* "Our Story" CTA Button - Now using the CTABtn Component */}
            <CTABtn
              label={content.buttonLabel}
              href={content.buttonHref}
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