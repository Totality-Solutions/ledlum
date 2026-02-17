"use client";

import React from "react";

interface ProductInfoProps {
  name?: string;
  modelCode?: string;
  description?: string;
}

export const ProductInfoSection = ({
  name = "Light Name",
  modelCode = "AA 1 005 – Electric grey",
  description = "The prominent and distinguished design makes LEDLUM’s FourFive range one of the finest lighting solutions of the contemporary world. Its noiseless switching functionality and its advanced operation make it the most desired switch for every home.",
}: ProductInfoProps) => {
  return (
    <div className="w-full bg-black px-6 md:px-[60px] py-[50px] flex flex-col lg:flex-row justify-start items-start lg:items-end gap-12 lg:gap-[349px]">
      <div className="flex-1 flex flex-col justify-start items-start gap-6">
        
        {/* TOP BAR: Title & Download */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex justify-start items-center gap-2.5">
            <h1 className="text-white text-3xl md:text-[32px] font-semibold font-['Montserrat'] leading-tight">
              {name}
            </h1>
            <span className="text-[#EBEBEB] text-lg font-normal font-['Open Sans']">/</span>
            <span className="text-[#EBEBEB] text-lg font-normal font-['Open Sans'] opacity-80">
              {modelCode}
            </span>
          </div>

          {/* Download Brochure Button */}
          <button className="group pl-6 pr-1 py-1.5 bg-[#F3E7D8] rounded-full flex justify-start items-center gap-6 transition-all hover:bg-white">
            <span className="text-black text-lg font-normal font-['Poppins']">
              Download brochure
            </span>
            <div className="w-9 h-9 bg-[#96865D] group-hover:bg-black rounded-full flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
          </button>
        </div>

        {/* DESCRIPTION BLOCK */}
        <div className="max-w-[747px] flex flex-col justify-start items-start gap-2.5">
          <h3 className="text-[#EBEBEB] text-2xl font-semibold font-['Montserrat']">
            Description
          </h3>
          <p className="self-stretch text-[#EBEBEB] text-lg font-normal font-['Open Sans'] leading-7 opacity-90">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};