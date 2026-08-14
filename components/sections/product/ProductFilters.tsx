"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowRight, Search, X } from "@/lib/icons"
import Section from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { PRODUCT_IMAGES } from "@/content/data/productImages"
import { cdnImg } from "@/lib/cdn"

const MAX_SEARCH_RESULTS = 8

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong className="text-white font-semibold">{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection,
}: any) {
  const router = useRouter()
  const [showGroupDropdown, setShowGroupDropdown] = useState(false)
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const groupRef = useRef<HTMLDivElement>(null)
  const dimmingRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.height = 'auto'
      document.body.style.touchAction = 'auto'
    }
    
    return () => { 
      document.body.style.overflow = 'unset' 
      document.body.style.height = 'auto'
    }
  }, [isMobileMenuOpen])

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setShowGroupDropdown(false)
      }
      if (dimmingRef.current && !dimmingRef.current.contains(event.target as Node)) {
        setShowDimmingDropdown(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ✅ LIVE SEARCH RESULTS: matches title/category/group plus the full spec blob
  const searchQuery = (filters.search || "").trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (!searchQuery) return []
    return products
      .filter((p: any) =>
        p.title?.toLowerCase().includes(searchQuery) ||
        p.category?.toLowerCase().includes(searchQuery) ||
        p.group?.toLowerCase().includes(searchQuery) ||
        (p.searchText || "").includes(searchQuery)
      )
      .slice(0, MAX_SEARCH_RESULTS)
  }, [products, searchQuery])

  // A search hit is often on a specific variant buried inside a family/group card
  // (e.g. searching "LLF-217" while the card's headline model is "LLF-216") — surface
  // whichever actual model matched, not just the family's representative model.
  const getMatchedModel = (item: any, query: string) => {
    const match = (item.models || []).find((m: string) => m.toLowerCase().includes(query))
    return match || item.title
  }

  const goToProduct = (item: any, model: string) => {
    setShowSearchResults(false)
    router.push(`/product/${collection}/${item.id}?model=${model.toLowerCase()}`)
  }

  const categories = useMemo(() => {
    const base = ["All", "New Launch"]
    if (collection === "outdoor") {
      const groupSet = new Set<string>()
      products.forEach((p: any) => { if (p.group && p.group !== "General") groupSet.add(p.group) })
      return [...base,  "Tracks", "Sensors"]
    }
    return [...base, "Tracks", "Sensors"]
  }, [collection, products])

  const labelMap: any = useMemo(() => {
    const map: any = { All: "All", "New Launch": "New Launch" }
    if (collection === "outdoor") {
      products.forEach((p: any) => { if (p.group) map[p.group] = p.group })
    } else {
      map.Tracks = "Tracks / Magnetic Tracks"
      map.Sensors = "Sensors"
    }
    return map
  }, [collection, products])

  // ✅ DYNAMICALLY FILTERED GROUPS DROPDOWN: 
  const groups = useMemo(() => {
    const set = new Set<string>()
    
    products.forEach((p: any) => {
      if (filters.collection === "New Launch") {
        if (p.isNewLaunch && p.group) set.add(p.group)
      } else {
        if (p.group) set.add(p.group)
      }
    })
    
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [products, filters.collection])

  const dimmings = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => { if (p.dimming) set.add(p.dimming) })
    return ["All", ...Array.from(set)]
  }, [products])

  // ✅ FIXED RESET MATRIX: Only resets dropdowns if the active collection tab explicitly changes
  const updateFilters = (newVal: any) => {
    setFilters((prev: any) => {
      const updated = { ...prev, ...newVal }
      
      if (newVal.collection && newVal.collection !== prev.collection) {
        updated.group = "All"
        updated.dimming = "All"
      }
      
      return updated
    })
  }

  // FULL SCREEN MOBILE DRAWER PORTAL
  const MobileMenu = (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }} 
          transition={{ type: 'tween', duration: 0.4, ease: "circOut" }} 
          className="fixed inset-0 z-[9999] bg-black flex flex-col w-screen h-screen overflow-hidden"
        >
          {/* Mobile Header */}
          <div className="p-6 flex justify-between items-center border-b border-white/5 bg-[#050505] flex-shrink-0">
            <span className="text-white text-body font-pop font-regular">Filters</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateFilters({ collection: "All", group: "All", dimming: "All", search: "" })}
                className="text-body-xs font-pop font-regular text-red-500 border border-red-500/30 px-2 py-1 rounded"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10 custom-scrollbar">
            <div className="mb-4 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                value={filters.search || ""}
                onChange={(e) => updateFilters({ search: e.target.value })}
                placeholder="Search products..."
                className="w-full h-12 pl-11 pr-9 rounded-[8px] bg-[#0A0A0A] border border-white/10 text-white text-body-sm font-pop font-regular placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              {filters.search && (
                <button
                  onClick={() => updateFilters({ search: "" })}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* LIVE SEARCH RESULTS (Google-style typeahead) */}
            {searchQuery && (
              <div className="mb-10 rounded-lg border border-white/10 bg-[#0A0A0A] overflow-hidden">
                {searchResults.length > 0 ? (
                  searchResults.map((item: any) => {
                    const thumb =
                      item.image ??
                      PRODUCT_IMAGES[item.title?.toUpperCase()]?.heroCarousel?.[0] ??
                      cdnImg("/images/fallback-product.webp")
                    const matchedModel = getMatchedModel(item, searchQuery)
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setIsMobileMenuOpen(false); goToProduct(item, matchedModel) }}
                        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                      >
                        <Image src={thumb} alt={item.title} width={40} height={40} className="w-10 h-10 rounded-md object-contain bg-black/40 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-body-sm text-white font-regular font-pop uppercase truncate">
                            Model: {highlightMatch(matchedModel, searchQuery)}
                          </p>
                          <p className="text-body-xxs text-white/40 uppercase tracking-wide truncate">
                            {item.category || item.group}
                          </p>
                        </div>
                      </button>
                    )
                  })
                ) : (
                  <div className="px-4 py-6 text-center text-body-sm text-white/40 font-pop">
                    No results for &ldquo;{filters.search}&rdquo;
                  </div>
                )}
              </div>
            )}

            <div className="mb-10">
              <label className="text-white text-body-sm font-pop font-regular uppercase tracking-wide mb-4 block">Collection</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => updateFilters({ collection: cat })} 
                    className={`w-full text-left py-4 text-body-sm font-pop border-b border-white/5 flex justify-between items-center uppercase tracking-tight ${filters.collection === cat ? 'text-white' : 'text-gray-500'}`}
                  >
                    {labelMap[cat] || cat} 
                    {filters.collection === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="text-white font-body-sm uppercase font-pop font-regular mb-4 block">Product Group</label>
              <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {groups.map(g => (
                  <button 
                    key={g} 
                    onClick={() => updateFilters({ group: g })} 
                    className={`w-full text-left py-3 text-body-xs font-pop border-b border-white/5 uppercase tracking-tight flex justify-between items-center ${filters.group === g ? 'text-white font-medium' : 'text-gray-500'}`}
                  >
                    {g}
                    {filters.group === g && <div className="w-1 h-1 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="absolute bottom-0 left-0 w-full px-6 py-4 bg-black flex-shrink-0 justify-center">
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full bg-white text-black font-pop text-body-sm font-medium py-2 px-2 rounded-[12px] uppercase"
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Section className="w-full !py-0 sticky top-0 z-[50]">
      <Container>
        {/* DESKTOP NAVIGATION + SEARCH/FILTER (top right) */}
        <div className="hidden lg:flex items-center justify-between gap-6 border-b border-white/10">
          <div className="flex gap-10 items-center overflow-x-auto custom-scrollbar">
          {categories.map((tab: string) => {
            const label = labelMap[tab] || tab.toUpperCase()
            return (
              <button
                key={tab}
                onClick={() => updateFilters({ collection: tab })}
                className={`text-body font-pop font-regular transition-all px-2 whitespace-nowrap pt-6 pb-6 relative uppercase ${
                  filters.collection === tab ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {label}            
                {filters.collection === tab && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white z-20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* DESKTOP SEARCH + GROUP FILTER */}
        <div className="flex flex-row items-center gap-4 py-4 relative custom-scrollbar flex-shrink-0">
          <div className="relative w-full max-w-[280px]" ref={searchRef}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
            <input
              type="text"
              value={filters.search || ""}
              onChange={(e) => { updateFilters({ search: e.target.value }); setShowSearchResults(true) }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search products..."
              className="relative w-full h-12 pl-11 pr-9 rounded-[8px] bg-transparent border-b border-white/20 text-white text-body font-pop font-regular placeholder:text-white/40 focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black/40 transition-all duration-300"
            />
            {filters.search && (
              <button
                onClick={() => { updateFilters({ search: "" }); setShowSearchResults(false) }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white z-10"
              >
                <X size={14} />
              </button>
            )}

            {/* LIVE SEARCH RESULTS (Google-style typeahead) */}
            <AnimatePresence>
              {showSearchResults && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[380px] bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999] overflow-hidden"
                >
                  {searchResults.length > 0 ? (
                    <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                      {searchResults.map((item: any) => {
                        const thumb =
                          PRODUCT_IMAGES[item.title?.toUpperCase()]?.heroCarousel?.[0] ??
                          cdnImg("/images/fallback-product.webp")
                        const matchedModel = getMatchedModel(item, searchQuery)
                        return (
                          <button
                            key={item.id}
                            onClick={() => goToProduct(item, matchedModel)}
                            className="group w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                          >
                            <Image
                              src={thumb}
                              alt={item.title}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-md object-contain bg-black/40 flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-body-sm text-white font-regular font-pop uppercase truncate">
                                Model: {highlightMatch(matchedModel, searchQuery)}
                              </p>
                              <p className="text-body-xxs text-white/40 uppercase tracking-wide truncate">
                                {item.category || item.group}
                              </p>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 flex-shrink-0 text-white/60" />
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-body-sm text-white/40 font-pop">
                      No results for &ldquo;{filters.search}&rdquo;
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-auto" ref={groupRef}>
            <button
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
              className={`flex items-center justify-between gap-6 px-6 h-12 rounded-[8px] text-[14px] font-medium transition-all duration-300 w-full md:max-w-[400px] truncate ${showGroupDropdown ? "bg-white text-black shadow-xl" : "bg-transparent border-b border-white/20 text-white hover:bg-white hover:text-black"}`}
            >
              <span className="text-body font-pop font-regular block truncate">
                {filters.group === "All" ? "Product Groups" : filters.group}
              </span>
              <ArrowDown size={18} className={`transition-transform duration-300 flex-shrink-0 ${showGroupDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showGroupDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[calc(100%+8px)] right-0 w-full md:min-w-[340px] bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999] overflow-hidden"
                >
                  <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {groups.map((g: string) => (
                      <button
                        key={g}
                        onClick={() => { updateFilters({ group: g }); setShowGroupDropdown(false); }}
                        className="group w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-white hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                      >
                        <span className="text-body-sm text-white font-regular font-pop block pr-4">{g}</span>
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="lg:hidden flex justify-between items-center max-h-[150px] py-4">
          <div className="flex flex-col pr-4 overflow-hidden">
            <span className="text-white font-medium text-body-sm font-pop uppercase truncate">{filters.collection}</span>
            {(filters.group !== "All") && (
              <span className="text-gray-500 text-body-xxs uppercase tracking-widest mt-0.5 block truncate">
                {filters.group}
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="w-11 h-11 bg-[#1a1a1a] rounded-full flex flex-col items-center justify-center gap-1 border border-white/5 flex-shrink-0"
          >
            <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
            <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
          </button>
        </div>

        {mounted && createPortal(MobileMenu, document.body)}
      </Container>
    </Section>
  )
}