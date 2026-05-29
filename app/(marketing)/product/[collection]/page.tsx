"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"

// Master untouched dataset imported cleanly
import { INDOOR_MODEL_DATABASE } from "@/content/data/indoorCategoryMap"

export default function CollectionPage() {
  const params = useParams()
  const collection = params.collection as string

  const [filters, setFilters] = useState({
    collection: "All",
    group: "All",
    dimming: "All"
  })

  // Dynamic parser optimized to pull exactly 1 representative product per sub-category row
  const products = useMemo(() => {
    const uniqueProducts: any[] = [];

    if (collection !== "indoor") return uniqueProducts;

    // Outer layer sweep over the main categories
    Object.entries(INDOOR_MODEL_DATABASE).forEach(([dbCategoryKey, subCategories]) => {
      
      // Inner layer sweep over sub-categories ("1", "2", "3"...)
      Object.entries(subCategories).forEach(([subCategoryKey, modelsList]) => {
        
        // CRITICAL FIX: Har ek nested sub-category group array se hum sirf pehla model [0] pick karenge
        const firstModelInSubCategory = modelsList[0];

        if (firstModelInSubCategory) {
          const cleanId = firstModelInSubCategory.toLowerCase().replace(/[^a-z0-9]/g, "-");
          const computedSeries = firstModelInSubCategory.split("-")[0] || "General";

          // Dynamic rule evaluations to assign dimming types parsed straight from keys
          let assignedDimming = "Non - Dimming";
          if (
            firstModelInSubCategory.includes("A") || 
            firstModelInSubCategory.includes("TR") || 
            dbCategoryKey.includes("IP54") || 
            dbCategoryKey.includes("Vision")
          ) {
            assignedDimming = "Dali";
          } else if (
            dbCategoryKey.includes("Magnetic") || 
            firstModelInSubCategory.startsWith("LMT") || 
            firstModelInSubCategory.startsWith("LRT")
          ) {
            assignedDimming = "DP";
          }

          // Push exactly ONE single item per dynamic sub-category group block sequence
          uniqueProducts.push({
            id: cleanId,
            title: firstModelInSubCategory, // Will output just "LLF-216" instead of generating duplicates for 217, 218, etc.
            image: `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(firstModelInSubCategory)}`,
            heroBannerImage: "/images/home/product/Indoor.jpeg",
            collection: "indoor",
            category: dbCategoryKey,
            group: dbCategoryKey, // Dynamic mapping to match multi-level categories filter selection
            dimming: assignedDimming,
            series: computedSeries,
            itemCount: modelsList.length,
          });
        }
      });
    });

    return uniqueProducts;
  }, [collection]);

  const COLLECTION_HERO_DATA = {
    indoor: {
      name: "Indoor Collection",
      image: "/images/home/product/Indoor.jpeg",
      description: "The Indoor Series focuses on refined illumination for interiors—delivering ambient, task, and accent lighting that blends seamlessly into modern architectural spaces.",
    },
    outdoor: {
      name: "Outdoor Collection",
      image: "/images/home/product/Outdoor.jpeg",
      description: "Designed to enhance exteriors, the Outdoor Series combines durability with design—offering weather-resistant lighting solutions that elevate facades, landscapes, and open spaces with precision illumination.",
    },
    artizan: {
      name: "Artizan Collection",
      image: "/images/home/product/Artizan.jpeg",
      description: "Artizan represents bespoke, design-led lighting—where craftsmanship meets technology to create statement fixtures that enhance aesthetic storytelling.",
    },
    astara: {
      name: "Astara Collection",
      image: "/images/home/product/Astara.jpeg",
      description: "Astara is LEDLUM’s precision-driven lighting range, built around sleek linear systems and high-performance fixtures for clean, contemporary visual experiences",
    },
    klewe: {
      name: "Klewe Collection",
      image: "/images/home/product/Klewe.jpeg",
      description: "Klewe focuses on sustainability—delivering solar-powered and energy-efficient lighting solutions that reduce consumption while maintaining high performance.",
    },
    volaris: {
      name: "Volaris Collection",
      image: "/images/home/product/Volaris.jpeg",
      description: "Volaris blends air movement with design offering premium fans that function as both performance driven appliances and elegant interior elements.",
    },
  }; 

  console.log("Total unique sub-category breakout items loaded:", products.length);
  const heroData = COLLECTION_HERO_DATA[collection as keyof typeof COLLECTION_HERO_DATA];

  return (
    <main className="relative bg-transparent min-h-screen">
      <Hero 
        heroBannerImage={heroData?.image}
      />

      <div className="mx-auto px-6 lg:px-12 pt-12">
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          products={products}
          collection={collection}
        />
      </div>

      <div className="relative mx-auto px-6 lg:px-12 py-12">
        <ProductGrid
          filters={filters}
          products={products}
          collection={collection}
        />
      </div>
    </main>
  )
}