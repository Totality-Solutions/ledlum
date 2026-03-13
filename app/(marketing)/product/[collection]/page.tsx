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
    // Only process products belonging to this collection
    if (product.collection === collection) {
      // If we haven't added this series yet, add the first instance found
      if (!seenSeries.has(product.series)) {
        seenSeries.add(product.series);
        uniqueProducts.push({
          id, // This ID will be used for the initial landing on the inner page
          title: product.hero.name,
          image: product.hero.image,
          collection: product.collection,
          category: product.category,
          group: product.group,
          dimming: product.dimming,
          series: product.series, // Keep track of the series
        });
      }
    }
  });

  return uniqueProducts;
}, [collection]);

  return (
    <main className="relative bg-transparent min-h-screen">

      <Hero />

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