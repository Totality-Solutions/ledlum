import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border border-white/5 rounded-[32px] p-4">
      {/* Image skeleton */}
      <div className="relative flex-grow overflow-hidden rounded-[24px] bg-black mb-5 min-h-[220px]">
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      </div>
      
      {/* Text skeleton */}
      <div className="flex-shrink-0 px-2 pb-2">
        <div className="flex items-center justify-between mb-3">
          {/* Category title skeleton */}
          <div className="h-5 w-24 bg-zinc-800 rounded animate-pulse" />
          
          {/* Arrow skeleton */}
          <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
