"use client"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import ProductCard from "./ProductCard"

export default function ProductGrid({ filters, products, collection }: any) {
  const router = useRouter()
  const filteredProducts = useMemo(() => {

    return products.filter((p:any) => {
      const matchCollection =
        filters.collection === "All" ||
        p.collection === filters.collection.toLowerCase()

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
    <div className="relative">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          {filteredProducts.map((product:any) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              image={product.image}
              onClick={() => router.push(`/product/${collection}/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-white/40 text-center py-32 border border-white/5 rounded-[30px] uppercase text-xs tracking-[0.2em]">
          No products match these specific filters
        </div>
      )}
    </div>
  )
}