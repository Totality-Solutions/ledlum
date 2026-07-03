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

const PROJECTS = [
  { id: 1, img: '/images/home/project/project1.jpeg' },
  { id: 2, img: '/images/home/project/project2.jpeg' },
  { id: 3, img: '/images/home/project/project3.jpeg' },
  { id: 4, img: '/images/home/project/project4.jpeg' },
  { id: 5, img: '/images/home/project/project5.jpeg' },
  { id: 6, img: '/images/home/project/project6.jpeg' },
  { id: 7, img: '/images/home/project/project7.jpeg' },
  { id: 8, img: '/images/home/project/project8.jpeg' },
  { id: 9, img: '/images/home/project/project9.jpeg' },
  { id: 10, img: '/images/home/project/project10.jpeg' },
  { id: 11, img: '/images/home/project/project11.jpeg' },
];

const OurProjectsSection = memo(function OurProjectsSection() {
  // Extract just the images for the carousel
  const carouselImages = PROJECTS.map((p) => p.img);

  return (
    <Section className="bg-[#0A0A0A] text-white py-12 lg:py-16 px-3 lg:px-14">
      <Container className="relative z-10 ">

        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
                          <Image 
                            src="/images/about/ledlumline.webp"
                            alt="background texture"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                          />
                          </div>
                          
                          {/* Header Row - Exactly as your original */}
                          <div className="flex flex-col-2 md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
                            <div className="flex flex-col">
                              <h2 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white">
                                Our.
                              </h2>
                              <p className="text-mob-h2 md:text-tab-h2 lg:text-desk-h3 font-pop font-semibold text-white ">
                                Projects.
                              </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-5">
                              <Link href="/project" className="hidden flex items-center gap-2 md:block text-body-sm lg:text-body font-pop font-regular text-white hover:text-white/70 transition-colors">
                                See how LEDLUM lives in real spaces
                                {/* <ArrowRight size={16} strokeWidth={2} className="inline ml-5 text-background" /> */}
                              </Link>
                              
                              <div className="flex items-center gap-6 text-white/60">
                                <a href="https://www.instagram.com/ledlumlighting/" className="hover:text-white transition-all hover:scale-110">
                                  <Instagram size={22} strokeWidth={1.5} />
                                </a>
                                {/* <a href="#" className="hover:text-white transition-all hover:scale-110">
                                  <MessageCircle size={22} strokeWidth={1.5} />
                                </a> */}
                                <a href="https://www.linkedin.com/company/95175675/admin/dashboard/" className="hover:text-white transition-all hover:scale-110">
                                  <Linkedin size={22} strokeWidth={1.5} />
                                </a>
                                <a href="https://www.facebook.com/ledlumlightingsolutions" className="hover:text-white transition-all hover:scale-110">
                                  <Facebook size={22} strokeWidth={1.5} />
                                </a>
                              </div>
                            </div>
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