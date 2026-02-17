"use client";
import { useState } from 'react';
import Image from 'next/image';
import Hero from "@/components/sections/product/Hero";
import ProductFilters from "@/components/sections/product/ProductFilters";
import ProductGrid from "@/components/sections/product/ProductGrid";
import bgImage from "@/public/images/product/product-bg.png"; 

export default function ProductPage() {
  const [filters, setFilters] = useState({ category: "INDOOR", group: "All", dimming: "All" });

  return (
    <main className="relative min-h-screen">
      {/* 1. Fixed Background (Z: -10) */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-black">
        <Image
          src={bgImage}
          alt="Background Texture"
          fill
          priority
          className="object-cover opacity-30 transition-opacity duration-1000"
          sizes="100vw"
        />
      </div>

      <div className="relative">
        <Hero />
        
        {/* 2. Sticky Filters (Z: 40) 
            Lifts the filter bar above the grid, but stays below the Header (usually z-50) 
        */}
        <div className="lg:relative z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
          <ProductFilters onFilterChange={setFilters} />
        </div>
        
        {/* 3. Product Grid (Z: 0) */}
        <div className="relative z-0 max-w-[1440px] mx-auto px-6 lg:px-20 py-12">
          <ProductGrid filters={filters} />
        </div>
      </div>
    </main>
  );
}