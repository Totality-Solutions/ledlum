
"use client";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paramName?: string; // NEW: Allows different URL parameters
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  paramName = "page" // Default is still "page"
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, page.toString()); // Sets the specific parameter
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  // Logic to show only 2 numbers
  let startPage = Math.max(1, currentPage);
  if (startPage + 1 > totalPages) {
    startPage = Math.max(1, totalPages - 1);
  }
  const pagesToShow = [startPage, startPage + 1].filter(p => p <= totalPages);

  return (
    <div className="flex items-center justify-center gap-4 mt-16 relative z-10 font-bai">
      {/* Left Arrow */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-zinc-500 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      {/* 2 Page Numbers */}
      <div className="flex items-center gap-2">
        {pagesToShow.map((pageNum) => (
          <button
            key={pageNum}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-all flex items-center justify-center ${
              pageNum === currentPage 
                ? 'bg-white/5 text-white/70 ]' 
                : 'bg-transparent text-zinc-500 hover:text-zinc-300'
            }`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum.toString().padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        className="w-10 h-10 rounded-full border border-white/10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white disabled:opacity-10 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}