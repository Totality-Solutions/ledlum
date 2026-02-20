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
      {/* 1. Optimized Fixed Background */}
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <Image
          src={bgImage}
          alt="Background Texture"
          fill
          priority
          className="object-cover opacity-20 will-change-transform"
          sizes="100vw"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      <div className="relative">
        <Hero />
        
        {/* 2. Sticky Filters - Optimized */}
        <div className="lg:relative z-50 bg-black/60 backdrop-blur-sm border-b border-white/5 will-change-transform">
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