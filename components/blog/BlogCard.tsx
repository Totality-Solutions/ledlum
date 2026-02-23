import React from 'react';
import Image from 'next/image';

interface BlogCardProps {
  category: string;
  description: string;
  image: string;
  isFeatured?: boolean; 
}

export default function BlogCard({ category, description, image, isFeatured }: BlogCardProps) {
  return (
    <div className={`group cursor-pointer flex flex-col h-full ${isFeatured ? 'lg:col-span-2' : 'col-span-1'} 
      bg-[#0d0d0d] border border-white/5 rounded-[32px] p-4 transition-all duration-500 hover:bg-[#141414] hover:border-white/10`}>
      
      {/* 1. Image Container */}
      <div className="relative flex-grow overflow-hidden rounded-[24px] bg-black mb-5 min-h-[220px]">
        <Image 
          src={image} 
          alt={category} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
      </div>
      
      {/* 2. Text Section */}
      <div className="flex-shrink-0 px-2 pb-2">
        <div className="flex items-center justify-between mb-3">
          {/* Category Title using Poppins from your CSS */}
          <h4 className="font-pop text-white text-[15px] font-semibold  tracking-tight">
            {category}
          </h4>

          {/* White Arrow with Rounded Golden Background */}
          <div className="w-8 h-8 rounded-full bg-[#9a8c66] flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#b4a47a]">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>

        {/* Description using secondary font logic */}
        <p className="body-xs text-zinc-300 leading-relaxed line-clamp-2 ">
          {description}
        </p>
      </div>
    </div>
  );
}