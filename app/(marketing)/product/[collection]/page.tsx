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

  const products = useMemo(() => {

    return Object.entries(PRODUCT_DATABASE)
      .filter(([_, product]) => product.collection === collection)
      .map(([id, product]) => ({
        id,
        title: product.hero.name,
        image: product.hero.image,
        collection: product.collection,
        category: product.category,
        group: product.group,
        dimming: product.dimming
      }))

  }, [collection])

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

      <div className="relative mx-auto px-6 lg:px-20 py-12">

        <ProductGrid
          filters={filters}
          products={products}
          collection={collection}
        />

      </div>

    </main>
  )
}