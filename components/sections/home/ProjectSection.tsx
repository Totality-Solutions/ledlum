"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Instagram, Linkedin, Facebook, ArrowRight } from "@/lib/icons";

// 1. Import your Carousel component
import InfiniteCarousel from "@/components/layout/common/InfiniteCarousel"; 

import MarqueeFlow from "@/components/layout/common/MarqueeFlow";

import { cdnImg } from "@/lib/cdn";

import type { CmsContent } from "@/lib/cms/defaults";

const OurProjectsSection = memo(function OurProjectsSection({
  content,
  social,
}: {
  content: CmsContent<"projects">;
  social: { instagram: string; linkedin: string; facebook: string };
}) {
  const PROJECTS = (content.images || []).filter((p) => p.image).map((p, i) => ({ id: i + 1, img: p.image }));
  // Extract just the images for the carousel
  const carouselImages = PROJECTS.map((p) => p.img);

  return (
    <Section className="bg-[#0A0A0A] text-white py-12 lg:py-16 px-3 lg:px-14">
      <Container className="relative z-10 ">

        {/* <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
                          <Image 
                            src={cdnImg("/images/about/ledlumline.webp")}
                            alt="background texture"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                          />
                          </div> */}
                          
                          {/* Header Row - Exactly as your original */}
                          <div className="flex flex-col-2 md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
                            <div className="flex flex-col">
                              <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
                                {content.title1}
                              </h2>
                              <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
                                {content.title2}
                              </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-5">
                              
                              
                              <div className="flex items-center justify-end w-full gap-6 text-white/60">
                                <a href={social.instagram} className="hover:text-white transition-all hover:scale-110">
                                  <Instagram size={22} strokeWidth={1.5} />
                                </a>
                                {/* <a href="#" className="hover:text-white transition-all hover:scale-110">
                                  <MessageCircle size={22} strokeWidth={1.5} />
                                </a> */}
                                <a href={social.linkedin} className="hover:text-white transition-all hover:scale-110">
                                  <Linkedin size={22} strokeWidth={1.5} />
                                </a>
                                <a href={social.facebook} className="hover:text-white transition-all hover:scale-110">
                                  <Facebook size={22} strokeWidth={1.5} />
                                </a>
                              </div>
<Link href="/project" className=" flex items-center gap-2 md:block text-[12px] lg:text-body font-pop font-regular text-white hover:text-white/70 transition-colors">
                                {content.exploreLabel}
                                <ArrowRight size={20} strokeWidth={2} className="inline text-background" />
                                {/* <ArrowRight size={16} strokeWidth={2} className="inline ml-5 text-background" /> */}
                              </Link>                            </div>
                          </div>

        {/* 2. MOBILE & TABLET VIEW: Uses your InfiniteCarousel */}
        {/* 2. MOBILE & TABLET VIEW */}
{/* <div className="lg:hidden">
  <div className="mx-auto w-full max-w-[350px] md:max-w-[500px]">
    <InfiniteCarousel 
      className="w-full aspect-[1/1] rounded-[25px] overflow-hidden shadow-xl" 
      images={carouselImages} 
      interval={4000} 
    />
  </div>
</div> */}

        {/* 3. DESKTOP VIEW: Your original Gallery Grid */}
        <div className="">
          <MarqueeFlow
                    items={PROJECTS}
                    gap={20}
                    speed={3000}
                    
                    renderItem={(project) => (
                      <div 
                        key={project.id}
                        className="relative aspect-3/4 w-full rounded-[25px] overflow-hidden group cursor-pointer shadow-2xl"
                      >
                        <Image 
                          src={project.img} 
                          alt="Our Projects"
                          fill
                         className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-[16px]" 
                style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }} 
                sizes="(max-width: 300px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}
                  />
          
        </div>
        
      </Container>
    </Section>
  );
});

export default OurProjectsSection;