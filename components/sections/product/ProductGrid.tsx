"use client"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import ProductCard from "./ProductCard"
import { Container } from "@/components/layout/Container"

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
    <Container className="relative">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
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
        <div className="text-white/60 text-center py-20 lg:py-32 uppercase text-body font-pop font-regular ">
          No products match these specific filters
        </div>
      )}
    </Container>
  )
}