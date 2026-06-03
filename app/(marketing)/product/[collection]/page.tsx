"use client"

import { useParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase" // Adjust the path to your Supabase client configuration instance

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"

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

  // 1. LIVE DATA CONNECTOR FETCH LAYER
  useEffect(() => {
    async function fetchLiveCatalogData() {
      try {
        setLoading(true)
        
        // Pull down your entire dataset dynamically straight from your live production cluster
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("model");

        if (error) {
          console.error("Supabase catalog sync error:", error)
          return
        }

        if (data) {
          setDbProducts(data)
        }
      } catch (err) {
        console.error("Uncaught exception processing database payload:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLiveCatalogData()
  }, [])

  // Updated Data Normalizer: Now grouping strictly by UNIQUE FAMILY strings
  const products = useMemo(() => {
    const uniqueProductsMap = new Map<string, any>()

    if (collection !== "indoor") return []

    dbProducts.forEach((item: any) => {
      // 1. CRITICAL CHANGE: Group by 'family' column instead of 'group_name'
      const familyKey = item.family || `${item.group_name}-fallback`

      // If this family block already has a representative item, increment its child item count
      if (uniqueProductsMap.has(familyKey)) {
        const existingRecord = uniqueProductsMap.get(familyKey)
        existingRecord.itemCount += 1
        return
      }

      // Compute formatting tags for the first representative of this family
      const firstModelCode = String(item.model || "").trim()
      const cleanId = firstModelCode.toLowerCase().replace(/[^a-z0-9]/g, "-")
      const computedSeries = firstModelCode.split("-")[0] || "General"

      // Dynamic rule evaluations to assign dimming types parsed from codes and category fields
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

      const displayCollection = item.collection || "indoor"
      const fallbackPlaceholderImage = `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(firstModelCode)}`

      // Push exactly ONE single item per dynamic Family sequence block
      uniqueProductsMap.set(familyKey, {
        id: cleanId,
        title: firstModelCode, 
        image: item.hero_image || fallbackPlaceholderImage,
        heroBannerImage: "/images/home/product/Indoor.jpeg",
        collection: displayCollection,
        isNewLaunch: !!item.is_new_launch, 
        category: item.category,
        
        // Keep group tracking for dropdown filtering consistency
        group: item.group_name || "General", 
        family: familyKey, // Pass family context onwards to grid routing
        
        dimming: assignedDimming,
        series: computedSeries,
        itemCount: 1, 
      })
    })

    return Array.from(uniqueProductsMap.values())
  }, [collection, dbProducts])

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
  }

  const heroData = COLLECTION_HERO_DATA[collection as keyof typeof COLLECTION_HERO_DATA]

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