import React from 'react';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  date?: string; 
  isFeatured?: boolean; 
}

export default function BlogCard({ title, category, description, image, date, isFeatured }: BlogCardProps) {
  
  const formattedDate = React.useMemo(() => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }, [date]);

  return (
    <div className={`group cursor-pointer flex flex-col h-full ${isFeatured ? 'lg:col-span-2' : 'col-span-1'} 
      bg-card border border-white/5 rounded-[32px] p-4 transition-all duration-500 hover:bg-[#141414] hover:border-white/10`}>
      
      {/* 1. Image Container - Kept your original flex-grow */}
      <div className="relative flex-grow overflow-hidden rounded-[24px] bg-black mb-5 min-h-[220px]">
        <Image 
          src={image || "/images/placeholder.jpg"} 
          alt={title || "Blog Insight"} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
      </div>
      
      {/* 2. Text Section - Added flex and flex-col to allow mt-auto to work */}
      <div className="flex-shrink-0 px-2 pb-2 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-pop text-white text-body-md font-semibold ">
              {title}
          </h4>

          {/* Golden Arrow */}
          <div className="w-8 h-8 rounded-full bg-[#9a8c66] flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#b4a47a]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>

        {/* Title Section */}
        {/* <h3 className="font-pop text-white text-[1.25rem] font-bold mb-2 line-clamp-1 group-hover:text-[#CFC08E] transition-colors">
          {category}
        </h3> */}

        {/* Description */}
        <p className="text-body font-pop font-regular text-zinc-400 line-clamp-2 mb-4">
          {description}
        </p>

        {/* 3. Date Section - Bottom Right */}
        <div className="flex justify-end pt-2">
          <span className="font-pop text-[10px] uppercase tracking-[0.2em] text-[#9a8c66] font-medium">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}