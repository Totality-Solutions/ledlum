// // components/blog/Pagination.tsx
// "use client";
// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react'; // Recommended for cleaner icons

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange?: (page: number) => void;
// }

// export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
//   return (
//     <div className="flex items-center justify-center gap-4 mt-16 relative z-10">
//       {/* Left Arrow */}
//       <button 
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft size={18} strokeWidth={1.5} />
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-2">
//         {[...Array(totalPages)].map((_, i) => {
//           const pageNum = i + 1;
//           const isActive = pageNum === currentPage;
          
//           return (
//             <button
//               key={pageNum}
//               className={`w-10 h-10 rounded-full text-sm font-medium transition-all flex items-center justify-center ${
//                 isActive 
//                   ? 'bg-zinc-700 text-white' 
//                   : 'bg-transparent text-zinc-500 hover:text-zinc-300'
//               }`}
//               onClick={() => onPageChange?.(pageNum)}
//             >
//               {pageNum.toString().padStart(2, '0')}
//             </button>
//           );
//         })}
//       </div>

//       {/* Right Arrow */}
//       <button 
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white disabled:opacity-30"
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRight size={18} strokeWidth={1.5} />
//       </button>
//     </div>
//   );
// }



// "use client";
// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   queryParam?: string; // Add this
// }

// export default function Pagination({ currentPage, totalPages, queryParam = 'page' }: PaginationProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set(queryParam, page.toString());
//     router.push(`/blog?${params.toString()}`, { scroll: false });
//   };

//   if (totalPages <= 1) return null; // Don't show if only 1 page exists

//   return (
//     <div className="flex items-center justify-center gap-4 mt-16 relative z-10">
//       <button 
//         onClick={() => handlePageChange(currentPage - 1)}
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-zinc-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft size={18} strokeWidth={1.5} />
//       </button>

//       <div className="flex items-center gap-2">
//         {[...Array(totalPages)].map((_, i) => {
//           const pageNum = i + 1;
//           return (
//             <button
//               key={pageNum}
//               className={`w-10 h-10 rounded-full text-sm font-medium transition-all flex items-center justify-center ${
//                 pageNum === currentPage ? 'bg-[#c5a36e] text-black' : 'bg-transparent text-zinc-500 hover:text-zinc-300'
//               }`}
//               onClick={() => handlePageChange(pageNum)}
//             >
//               {pageNum.toString().padStart(2, '0')}
//             </button>
//           );
//         })}
//       </div>

//       <button 
//         onClick={() => handlePageChange(currentPage + 1)}
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white disabled:opacity-30 disabled:cursor-not-allowed"
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRight size={18} strokeWidth={1.5} />
//       </button>
//     </div>
//   );
// }


// "use client";
// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   paramName?: string;
// }

// export default function Pagination({ 
//   currentPage, 
//   totalPages, 
//   paramName = "page" 
// }: PaginationProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set(paramName, page.toString());
//     router.push(`/blog?${params.toString()}`, { scroll: false });
//   };

//   if (totalPages <= 1) return null;

//   // STRICT LOGIC: Show First, Last, and only 2 items in the middle section
//   const getVisiblePages = (current: number, total: number) => {
//     const pages: (number | string)[] = [];

//     // 1. Always include Page 1
//     pages.push(1);

//     // 2. Add ellipsis if current is far from the start
//     if (current > 2) {
//       pages.push('...');
//     }

//     // 3. The "Middle 2": Current and Next (if not already 1 or Total)
//     if (current !== 1 && current !== total) {
//       pages.push(current);
//       // Only show the next number if it's not the last page
//       if (current + 1 < total) {
//         pages.push(current + 1);
//       }
//     } else if (current === 1 && total > 1) {
//       // If we are on page 1, show page 2 as the second middle-ish number
//       if (total > 2) pages.push(2);
//     }

//     // 4. Add ellipsis if the middle numbers are far from the end
//     if (current < total - 2) {
//       pages.push('...');
//     }

//     // 5. Always include Last Page (if total > 1)
//     if (total > 1 && !pages.includes(total)) {
//       pages.push(total);
//     }

//     return pages;
//   };

//   const pagesToShow = getVisiblePages(currentPage, totalPages);

//   return (
//     <div className="flex items-center justify-center gap-4 mt-16 relative z-10 font-bai">
//       {/* Left Arrow */}
//       <button 
//         onClick={() => handlePageChange(currentPage - 1)}
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all text-zinc-500 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft size={18} strokeWidth={1.5} />
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-2">
//         {pagesToShow.map((pageNum, index) => {
//           if (pageNum === '...') {
//             return (
//               <span key={`ellipsis-${index}`} className="text-zinc-600 text-sm font-medium px-1">
//                 ...
//               </span>
//             );
//           }
          
//           return (
//             <button
//               key={pageNum}
//               className={`w-10 h-10 rounded-full text-sm font-medium transition-all flex items-center justify-center cursor-pointer ${
//                 pageNum === currentPage 
//                   ? 'bg-[#AD9463] text-black shadow-[0_0_15px_rgba(173,148,99,0.3)]' 
//                   : 'bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
//               }`}
//               onClick={() => handlePageChange(pageNum as number)}
//             >
//               {pageNum.toString().padStart(2, '0')}
//             </button>
//           );
//         })}
//       </div>

//       {/* Right Arrow */}
//       <button 
//         onClick={() => handlePageChange(currentPage + 1)}
//         className="w-10 h-10 rounded-full border border-white/10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white disabled:opacity-10 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRight size={18} strokeWidth={1.5} />
//       </button>
//     </div>
//   );
// }




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
                ? 'bg-[#AD9463] text-black shadow-[0_0_15px_rgba(173,148,99,0.3)]' 
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