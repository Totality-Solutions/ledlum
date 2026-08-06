"use client"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ProductCard from "./ProductCard"
import { Container } from "@/components/layout/Container"
import { PRODUCT_IMAGES } from "@/content/data/productImages";
import { cdnImg } from "@/lib/cdn";

const PRODUCTS_PER_PAGE = 12;
const PAGE_WINDOW = 5;

export default function ProductGrid({ filters, products, collection }: any) {
  const router = useRouter()
  const pageStorageKey = `productGrid:${collection}:page`

  const [currentPage, setCurrentPageState] = useState<number>(() => {
    if (typeof window === "undefined") return 1
    const stored = Number(sessionStorage.getItem(pageStorageKey))
    return stored > 0 ? stored : 1
  })

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page)
    if (typeof window !== "undefined") {
      sessionStorage.setItem(pageStorageKey, String(page))
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      let matchCollection = false;
      if (filters.collection === "All") {
        matchCollection = true;
      } else if (filters.collection === "New Launch") {
        matchCollection = p.isNewLaunch === true;
      } else if (collection === "outdoor") {
        matchCollection = p.group === filters.collection;
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
  }, [filters, products, collection])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages])

  let windowStart = Math.max(1, currentPage - Math.floor(PAGE_WINDOW / 2))
  const windowEnd = Math.min(totalPages, windowStart + PAGE_WINDOW - 1)
  windowStart = Math.max(1, windowEnd - PAGE_WINDOW + 1)
  const visiblePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  )

  console.log("filteredProducts", filteredProducts)
  return (
    <Container className="relative">
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
            {paginatedProducts.map((product: any, index: number) => {
              const totalItemCount = filteredProducts.reduce((sum: number, item: any) => sum + item.itemCount, 0);
              console.log("totalItemCount", totalItemCount); // 5
              return (
              <ProductCard
                key={product.id}
                title={product.title}
                category={product.category}
                image={
                  PRODUCT_IMAGES[
                    product.title?.toUpperCase()
                  ]?.heroCarousel?.[0] ??
                  cdnImg("/images/fallback-product.webp")
                }
                itemCount={product.itemCount}
                isPriority={index < 4}
                onClick={() =>
                  router.push(
                    `/product/${collection}/${product.id}?model=${product.title.toLowerCase()}`
                  )
                }
              />
            )})}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 lg:mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-pop text-sm"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {visiblePages.map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full text-sm font-pop transition-colors ${
                      page === currentPage
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-pop text-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-white/60 text-center py-20 lg:py-32 uppercase text-body font-pop font-regular ">
          No products match these specific filters
        </div>
      )}
    </Container>
  )
}