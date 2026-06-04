"use client"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import ProductCard from "./ProductCard"
import { Container } from "@/components/layout/Container"
import { PRODUCT_IMAGES } from "@/content/data/productImages";

export default function ProductGrid({ filters, products, collection }: any) {
  const router = useRouter()
  
  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      
      // ✅ FIXED FILTER LOGIC BLOCK:
      // If "All" is active, return everything.
      // If "New Launch" tab is selected, evaluate the boolean flag.
      // Otherwise, filter by specific category mapping name string logic.
      let matchCollection = false;
      if (filters.collection === "All") {
        matchCollection = true;
      } else if (filters.collection === "New Launch") {
        matchCollection = p.isNewLaunch === true;
      } else {
        matchCollection = p.collection === filters.collection.toLowerCase();
      }

      const matchGroup =
        filters.group === "All" ||
        p.group === filters.group

      const matchDimming =
        filters.dimming === "All" ||
        p.dimming === filters.dimming

      return matchCollection && matchGroup && matchDimming
    })
  }, [filters, products])

  return (
    <Container className="relative">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              image={
                PRODUCT_IMAGES[
                  product.title?.toUpperCase()
                ]?.heroCarousel?.[0] ??
                "/images/fallback-product.webp"
              }
              itemCount={product.itemCount}
              onClick={() =>
                router.push(
                  `/product/${collection}/${product.id}?model=${product.title.toLowerCase()}`
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-white/60 text-center py-20 lg:py-32 uppercase text-body font-pop font-regular ">
          No products match these specific filters
        </div>
      )}
    </Container>
  )
}