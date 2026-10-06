"use client"

import { useMemo, useState, useEffect } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"
import ProductGridSkeleton from "@/components/sections/product/ProductGridSkeleton"
import { getAllProductsForCatalog } from "@/lib/products"
import { cdnImg } from "@/lib/cdn"

// Client half of /product/[collection] — the server page passes the banner
// from Admin → Product collections.
export default function CollectionClient({
  collection,
  bannerImage,
}: {
  collection: string
  bannerImage?: string
}) {

  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [filters, setFilters] = useState({
    collection: "All",
    group: "All",
    dimming: "All",
    search: "",
  })

  useEffect(() => {
    let cancelled = false

    async function fetchLiveCatalogData() {
      try {
        setLoading(true)
        const data = await getAllProductsForCatalog(collection)
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
  }, [collection])

  const products = useMemo(() => {
    const familyMap = new Map<string, any>()

    // Flattens every searchable field on a raw product row into one lowercase
    // blob, so search can match on spec data the card itself doesn't display.
    const buildSearchText = (item: any) => {
      const parts = [
        item.model,
        item.category,
        item.group_name,
        item.family,
        item.watts,
        item.dimensions,
        item.cutout_size,
        item.beam_angle,
        item.ip_rating,
        item.led_chip,
        item.luminous,
        item.cri,
        item.product_type,
        item.hero_description,
        ...(item.body_colors || []),
        ...(item.cct || []),
        ...Object.values(item.extra_specs || {}),
      ]
      return parts.filter(Boolean).join(" ").toLowerCase()
    }

    dbProducts.forEach((item: any) => {
      if (item.collection !== collection) return
      // Only group under a shared card when the source data actually says
      // these rows are the same product (family set, e.g. from an explicit
      // "Family" column in the source excel). Without that, fall back to the
      // model itself — one card per model — instead of the category, which
      // would otherwise merge every unrelated product in a category together
      // (this is what caused all 21 Volaris downrod fans to show as one card).
      const modelCode = String(item.model || "").trim()
      const familyKey = item.family || `model-${modelCode}`

      if (familyMap.has(familyKey)) {
        const existing = familyMap.get(familyKey)
        existing.itemCount += 1
        existing.searchText += " " + buildSearchText(item)
        if (modelCode) existing.models.push(modelCode)
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

      familyMap.set(familyKey, {
        id: cleanId,
        title: firstModelCode,
        image: item.hero_image || null,
        heroBannerImage: item.collection === "outdoor" ? "/images/home/product/Outdoor.jpeg" : "/images/home/product/Indoor.jpeg",
        collection: item.collection || "indoor",
        isNewLaunch,
        category: item.category || item.group_name || "General",
        group: item.group_name || "General",
        family: familyKey,
        dimming: assignedDimming,
        series: firstModelCode.split("-")[0] || "General",
        itemCount: 1,
        searchText: buildSearchText(item),
        models: [firstModelCode],
      })
    })

    return Array.from(familyMap.values())
  }, [collection, dbProducts])

  const heroImage = bannerImage || cdnImg("/images/home/product/Indoor.jpeg")

  if (loading) {
    return (
      <main className="relative bg-transparent min-h-screen">
        <Hero heroBannerImage={heroImage} />
        <ProductGridSkeleton />
      </main>
    )
  }

  return (
    <main className="relative bg-transparent min-h-screen">
      <Hero heroBannerImage={heroImage} />

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
