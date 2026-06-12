"use client"

import { useParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"
import { getAllProductsForCatalog } from "@/lib/products"

export default function CollectionPage() {
  const params = useParams()
  const collection = params.collection as string

  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [filters, setFilters] = useState({
    collection: "All",
    group: "All",
    dimming: "All"
  })

  useEffect(() => {
    let cancelled = false

    async function fetchLiveCatalogData() {
      try {
        setLoading(true)
        const data = await getAllProductsForCatalog()
        if (!cancelled && data) {
          setDbProducts(data)
        }
      } catch (err) {
        console.error("Catalog fetch error:", err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchLiveCatalogData()
    return () => { cancelled = true }
  }, [])

  const products = useMemo(() => {
    const familyMap = new Map<string, any>()

    if (collection !== "indoor") return []

    dbProducts.forEach((item: any) => {
      const familyKey = item.family || `${item.group_name}-fallback`

      if (familyMap.has(familyKey)) {
        const existing = familyMap.get(familyKey)
        existing.itemCount += 1
        if (item.product_type?.toLowerCase() === "new") {
          existing.isNewLaunch = true
        }
        return
      }

      const firstModelCode = String(item.model || "").trim()
      const cleanId = firstModelCode.toLowerCase().replace(/[^a-z0-9]/g, "-")

      let assignedDimming = "Non - Dimming"
      const categoryString = String(item.category || "")
      if (
        firstModelCode.includes("A") ||
        firstModelCode.includes("TR") ||
        categoryString.includes("IP54") ||
        categoryString.includes("Vision")
      ) {
        assignedDimming = "Dali"
      } else if (
        categoryString.includes("Magnetic") ||
        firstModelCode.startsWith("LMT") ||
        firstModelCode.startsWith("LRT")
      ) {
        assignedDimming = "DP"
      }

      const isNewLaunch = item.product_type?.toLowerCase() === "new"
      const fallbackPlaceholderImage = `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(firstModelCode)}`

      familyMap.set(familyKey, {
        id: cleanId,
        title: firstModelCode,
        image: item.hero_image || fallbackPlaceholderImage,
        heroBannerImage: "/images/home/product/Indoor.jpeg",
        collection: item.collection || "indoor",
        isNewLaunch,
        category: item.category,
        group: item.group_name || "General",
        family: familyKey,
        dimming: assignedDimming,
        series: firstModelCode.split("-")[0] || "General",
        itemCount: 1,
      })
    })

    return Array.from(familyMap.values())
  }, [collection, dbProducts])

  const COLLECTION_HERO_DATA: Record<string, { name: string; image: string; description: string }> = {
    indoor: {
      name: "Indoor Collection",
      image: "/images/home/product/Indoor.jpeg",
      description: "The Indoor Series focuses on refined illumination for interiors—delivering ambient, task, and accent lighting that blends seamlessly into modern architectural spaces.",
    },
  }

  const heroData = COLLECTION_HERO_DATA[collection]

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-t-white border-white/10 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="relative bg-transparent min-h-screen">
      <Hero heroBannerImage={heroData?.image} />

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
