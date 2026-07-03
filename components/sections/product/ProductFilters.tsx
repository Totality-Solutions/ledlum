"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowRight, X } from "@/lib/icons"
import Section from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection,
}: any) {
  const [showGroupDropdown, setShowGroupDropdown] = useState(false)
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const groupRef = useRef<HTMLDivElement>(null)
  const dimmingRef = useRef<HTMLDivElement>(null)

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
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
    
    return ["All", ...Array.from(set)]
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
                onClick={() => updateFilters({ collection: "All", group: "All", dimming: "All" })} 
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
        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex gap-10 items-center border-b border-white/10 overflow-x-auto custom-scrollbar">
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

        {/* DESKTOP DROPDOWNS */}
        <div className="hidden lg:flex flex-col md:flex-row justify-between items-center py-4 relative custom-scrollbar">
          <div className="relative w-full md:w-auto" ref={groupRef}>
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
                  className="absolute top-[calc(100%+8px)] left-0 w-full md:min-w-[340px] bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999] overflow-hidden"
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