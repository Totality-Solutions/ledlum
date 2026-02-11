"use client";

import React from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  MessageCircle 
} from "lucide-react";
import productImg1 from "@/public/images/home/product-1.png";
import productImg2 from "@/public/images/home/product-2.png";
import Arrival1 from "@/public/images/home/new-arrival.png";


const PROJECTS = [
  { id: 1, img: productImg1 },
  { id: 2, img: productImg2 },
  { id: 3, img: Arrival1 },
  { id: 4, img: productImg1 },
];

export default function OurProjectsSection() {
  return (
    <Section className="bg-[#0A0A0A] text-white py-16 md:py-24 overflow-hidden">
      {/* Laptop Optimized Container: max-w-[1280px] */}
      <Container className="max-w-[1280px] 2xl:max-w-[1600px] w-full px-6 lg:px-10">
        
        {/* Header Row - Optimized Scaling */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <div className="flex flex-col">
            <h2 className="text-white text-[2.5rem] lg:text-[3.5rem] font-semibold leading-tight font-bai">
              Our.
            </h2>
            <p className="text-white text-[1.5rem] lg:text-[2rem] font-medium leading-tight font-bai opacity-80">
              Projects.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-5">
            <p className="text-[0.875rem] lg:text-[1rem] text-white/60 font-pop tracking-wide">
              See how LEDLUM lives in real spaces.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-6 text-white/30">
              <a href="#" className="hover:text-white transition-all hover:scale-110">
                <Instagram size={22} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-white transition-all hover:scale-110">
                <MessageCircle size={22} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-white transition-all hover:scale-110">
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-white transition-all hover:scale-110">
                <Facebook size={22} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Project Gallery Grid - Standardized to match Arrival/Bestseller geometry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="relative aspect-[3/4] rounded-[25px] lg:rounded-[25px] overflow-hidden group cursor-pointer shadow-2xl"
            >
              <Image 
                src={project.img} 
                alt="Our Projects"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                unoptimized
              />
              {/* Subtle Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        
      </Container>
    </Section>
  );
}