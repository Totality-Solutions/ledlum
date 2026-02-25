"use client";
import React, { useState } from "react";
import { PRODUCT_DATABASE } from "@/content/data/products";
import ProductInnerHero from "@/components/sections/innerproduct/InnerProductHero";
import ProductInfoSection from "@/components/sections/innerproduct/ProductInfo";
import ProductShowcaseGallery from "@/components/sections/innerproduct/ProductShowcaseGallery";

export default function InnerProductPage() {
  const [activeId, setActiveId] = useState("llf-103");

  // 1. Get the current product based on state
  // Using type casting to ensure it matches your DB structure
  const product = PRODUCT_DATABASE[activeId as keyof typeof PRODUCT_DATABASE];

  // 2. Error Boundary
  if (!product) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      <ProductInnerHero data={product.hero} />
      
      <ProductInfoSection 
        config={product.config} 
        activeId={activeId} 
        onModelChange={setActiveId} 
        // Important: Pass the permutations for the logic engine to work
        permutations={product.permutations} 
        allModelIds={Object.keys(PRODUCT_DATABASE)} 
      />
      
      <ProductShowcaseGallery images={product.gallery} />
    </main>
  );
}