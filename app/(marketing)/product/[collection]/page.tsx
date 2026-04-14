"use client"

import { useParams } from "next/navigation"
import { useState, useMemo } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"

import { PRODUCT_DATABASE } from "@/content/data/products"

export default function CollectionPage() {

  const params = useParams()
  const collection = params.collection as string

  const [filters, setFilters] = useState({
    collection: "All",
    group: "All",
    dimming: "All"
  })

// Inside CollectionPage component
const products = useMemo(() => {
  const seenSeries = new Set();
  const uniqueProducts: any[] = [];

  Object.entries(PRODUCT_DATABASE).forEach(([id, product]: [string, any]) => {
    if (product.collection === collection) {
      if (!seenSeries.has(product.series)) {
        seenSeries.add(product.series);

        uniqueProducts.push({
          id,
          title: product.hero.name,
          image: product.hero.image,

          // ✅ ADD THIS
          heroBannerImage: product.bannerImage,

          collection: product.collection,
          category: product.category,
          group: product.group,
          dimming: product.dimming,
          series: product.series,
        });
      }
    }
  });

  return uniqueProducts;
}, [collection]);

const COLLECTION_HERO_DATA = {
  indoor: {
    name: "Indoor Collection",
    image: "/images/home/product/Indoor.jpeg",
  },
  outdoor: {
    name: "Outdoor Collection",
    image: "/images/home/product/Outdoor.jpeg",
  },
  artizan: {
    name: "Artizan Collection",
    image: "/images/home/product/Artizan.jpeg",
  },
  astara: {
    name: "Astara Collection",
    image: "/images/home/product/Astara.jpeg",
  },
  klewe: {
    name: "Klewe Collection",
    image: "/images/home/product/Klewe.jpeg",
  },
  volaris: {
    name: "Volaris Collection",
    image: "/images/home/product/Volaris.jpeg",
  },
};

console.log("products", collection)
const heroData = COLLECTION_HERO_DATA[collection as keyof typeof COLLECTION_HERO_DATA];

  return (
    <main className="relative bg-transparent min-h-screen">

      <Hero 
        heroBannerImage={heroData?.image}
      />

      <div className="">

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