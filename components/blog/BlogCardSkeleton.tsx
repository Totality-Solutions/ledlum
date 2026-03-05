import React from 'react';

export default function BlogCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border border-white/5 rounded-[32px] p-4">
      {/* Image skeleton */}
      <div className="relative flex-grow overflow-hidden rounded-[24px] bg-black mb-5 min-h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
      </div>
      
      {/* Text skeleton */}
      <div className="flex-shrink-0 px-2 pb-2">
        <div className="flex items-center justify-between mb-3">
          {/* Category title skeleton */}
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
          
          {/* Arrow skeleton */}
          <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-700 rounded animate-pulse w-5/6" />
        </div>
      </div>
    </div>
  );
}
