"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

import CTABtn from "@/components/layout/common/CTABtn";
import Section from "@/components/layout/Section";

interface HeroProps {
  data: {
    category: string;
    name: string;
    description: string;
    image: string;
  };
}

const ProductInnerHero = ({ data }: HeroProps) => {

  const params = useParams();
  const collection = params.collection as string;

  return (
    <Section className="w-full min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-[1440px] min-h-[705px] bg-[#101010] rounded-[25px] overflow-hidden flex flex-col lg:flex-row items-center p-8 lg:p-0">

        {/* BACK BUTTON */}
        <Link
          href={`/product/${collection}`}
          className="absolute top-8 left-8 z-20 flex items-center gap-3 group text-[#DBDCDD]"
        >
          <div className="w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white text-lg">←</span>
          </div>

          <span className="text-body-xs font-pop tracking-wide opacity-80 group-hover:opacity-100">
            Back to Product
          </span>
        </Link>

        {/* LEFT SIDE IMAGE */}
        <div className="relative w-full lg:w-1/2 h-[50vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center p-4 mt-12 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full bg-[#1A1A1A] rounded-[18px] overflow-hidden flex items-center justify-center"
          >
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-16 lg:pr-24 py-12">
          
          <div className="flex flex-col gap-2 mb-8">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#96865D] text-mobile-h1 lg:text-[28px] font-medium font-pop"
            >
              {data.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white text-4xl lg:text-[64px] font-bold font-bai uppercase leading-[0.9] tracking-tighter"
            >
              {data.name}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-[512px] mb-12"
          >
            <h3 className="text-[#EBEBEB] text-lg font-pop font-medium mb-3">
              Product Overview :
            </h3>

            <p className="text-[#EBEBEB]/60 text-base lg:text-lg leading-relaxed font-pop">
              {data.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CTABtn
              label="Request Quote"
              size="md"
              btnBg="#F3E7D8"
              circleBg="#96865D"
              textColor="#101010"
              className="font-pop"
            />
          </motion.div>

        </div>

      </div>
    </Section>
  );
};

export default ProductInnerHero;