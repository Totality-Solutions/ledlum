// "use client"

// import { useParams } from "next/navigation"
// import { useMemo, useState, useEffect } from "react"

// import Hero from "@/components/sections/product/Hero"
// import ProductFilters from "@/components/sections/product/ProductFilters"
// import ProductGrid from "@/components/sections/product/ProductGrid"
// import ProductGridSkeleton from "@/components/sections/product/ProductGridSkeleton"
// import { getAllProductsForCatalog } from "@/lib/products"

// export default function CollectionPage() {
//   const params = useParams()
//   const collection = params.collection as string

//   const [dbProducts, setDbProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   const [filters, setFilters] = useState({
//     collection: "All",
//     group: "All",
//     dimming: "All"
//   })

//   useEffect(() => {
//     let cancelled = false

//     async function fetchLiveCatalogData() {
//       try {
//         setLoading(true)
//         const data = await getAllProductsForCatalog()
//         if (!cancelled && data) {
//           setDbProducts(data)
//         }
//       } catch (err) {
//         console.error("Catalog fetch error:", err)
//       } finally {
//         if (!cancelled) setLoading(false)
//       }
//     }

//     fetchLiveCatalogData()
//     return () => { cancelled = true }
//   }, [])

//   const products = useMemo(() => {
//     const familyMap = new Map<string, any>()

//     dbProducts.forEach((item: any) => {
//       if (item.collection !== collection) return
//       const familyKey = item.family || `${item.group_name}-fallback`

//       if (familyMap.has(familyKey)) {
//         const existing = familyMap.get(familyKey)
//         existing.itemCount += 1
//         if (item.product_type?.toLowerCase() === "new") {
//           existing.isNewLaunch = true
//         }
//         return
//       }

//       const firstModelCode = String(item.model || "").trim()
//       const cleanId = firstModelCode.toLowerCase().replace(/[^a-z0-9]/g, "-")

//       let assignedDimming = "Non - Dimming"
//       const categoryString = String(item.category || "")
//       if (
//         firstModelCode.includes("A") ||
//         firstModelCode.includes("TR") ||
//         categoryString.includes("IP54") ||
//         categoryString.includes("Vision")
//       ) {
//         assignedDimming = "Dali"
//       } else if (
//         categoryString.includes("Magnetic") ||
//         firstModelCode.startsWith("LMT") ||
//         firstModelCode.startsWith("LRT")
//       ) {
//         assignedDimming = "DP"
//       }

//       const isNewLaunch = item.product_type?.toLowerCase() === "new"
//       const fallbackPlaceholderImage = `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(firstModelCode)}`

//       familyMap.set(familyKey, {
//         id: cleanId,
//         title: firstModelCode,
//         image: item.hero_image || fallbackPlaceholderImage,
//         heroBannerImage: item.collection === "outdoor" ? "/images/home/product/Outdoor.jpeg" : "/images/home/product/Indoor.jpeg",
//         collection: item.collection || "indoor",
//         isNewLaunch,
//         category: item.category || item.group_name || "General",
//         group: item.group_name || "General",
//         family: familyKey,
//         dimming: assignedDimming,
//         series: firstModelCode.split("-")[0] || "General",
//         itemCount: 1,
//       })
//     })

//     return Array.from(familyMap.values())
//   }, [collection, dbProducts])

//   const COLLECTION_HERO_DATA: Record<string, { name: string; image: string; description: string }> = {
//     indoor: {
//       name: "Indoor Collection",
//       image: "/images/home/product/Indoor.jpeg",
//       description: "The Indoor Series focuses on refined illumination for interiors—delivering ambient, task, and accent lighting that blends seamlessly into modern architectural spaces.",
//     },
//     outdoor: {
//       name: "Outdoor Collection",
//       image: "/images/home/product/Outdoor.jpeg",
//       description: "The Outdoor Collection delivers rugged, weather-resistant lighting solutions—from bollards and wall lites to floodlights and underground fixtures—built for durability and architectural elegance.",
//     },
//   }

//   const heroData = COLLECTION_HERO_DATA[collection] || {
//     name: `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`,
//     image: "/images/home/product/Indoor.jpeg",
//     description: `Explore our ${collection} lighting collection — designed for quality and performance.`,
//   }

//   if (loading) {
//     return (
//       <main className="relative bg-transparent min-h-screen">
//         <Hero heroBannerImage={heroData?.image} />
//         <ProductGridSkeleton />
//       </main>
//     )
//   }

//   return (
//     <main className="relative bg-transparent min-h-screen">
//       <Hero heroBannerImage={heroData?.image} />

//       <div className="mx-auto px-6 lg:px-12 pt-12">
//         <ProductFilters
//           filters={filters}
//           setFilters={setFilters}
//           products={products}
//           collection={collection}
//         />
//       </div>

//       <div className="relative mx-auto px-6 lg:px-12 py-12">
//         <ProductGrid
//           filters={filters}
//           products={products}
//           collection={collection}
//         />
//       </div>
//     </main>
//   )
// }




"use client"

import { useParams } from "next/navigation"
import { useMemo, useState, useEffect } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"
import ProductGridSkeleton from "@/components/sections/product/ProductGridSkeleton"
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

    dbProducts.forEach((item: any) => {
      if (item.collection !== collection) return
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
        heroBannerImage: item.collection === "outdoor" ? "/images/home/product/Outdoor.jpeg" : "/images/home/product/Indoor.jpeg",
        collection: item.collection || "indoor",
        isNewLaunch,
        category: item.category || item.group_name || "General",
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
    outdoor: {
      name: "Outdoor Collection",
      image: "/images/home/product/Outdoor.jpeg",
      description: "The Outdoor Collection delivers rugged, weather-resistant lighting solutions—from bollards and wall lites to floodlights and underground fixtures—built for durability and architectural elegance.",
    },
  }

  const heroData = COLLECTION_HERO_DATA[collection] || {
    name: `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`,
    image: "/images/home/product/Indoor.jpeg",
    description: `Explore our ${collection} lighting collection — designed for quality and performance.`,
  }

  if (loading) {
    return (
      <main className="relative bg-transparent min-h-screen">
        <Hero heroBannerImage={heroData?.image} />
        <ProductGridSkeleton />
      </main>
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
