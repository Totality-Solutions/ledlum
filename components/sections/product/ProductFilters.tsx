"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown, ArrowRight, X, Check } from "lucide-react"

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection
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
      // 1. Lock the body height to exactly the viewport height
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      // 2. Prevent mobile touch-scrolling of the background
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

  /* CLICK OUTSIDE (Desktop) */
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
    if (!collection) return ["All"]
    const base = collection.charAt(0).toUpperCase() + collection.slice(1)
    return ["All", base, "Tracks", "Sensors"]
  }, [collection])

  const labelMap: any = {
    All: "All",
    Tracks: "Tracks / Magnetic Tracks",
    Sensors: "Sensors"
  }

  const groups = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => { if (p.group) set.add(p.group) })
    return ["All", ...Array.from(set)]
  }, [products])

  const dimmings = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => { if (p.dimming) set.add(p.dimming) })
    return ["All", ...Array.from(set)]
  }, [products])

  const updateFilters = (newVal: any) => {
    const updated = { ...filters, ...newVal }
    if (newVal.collection === "All") {
      updated.group = "All"
      updated.dimming = "All"
    }
    setFilters(updated)
  }

  const isSubFilterVisible = filters.collection !== "All"

  // FULL SCREEN MOBILE DRAWER PORTAL
  const MobileMenu = (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }} 
          transition={{ type: 'tween', duration: 0.4, ease: "circOut" }} 
          // fixed inset-0 ensures it is anchored to the viewport, not the document
          className="fixed inset-0 z-[9999] bg-black flex flex-col w-screen h-screen overflow-hidden"
        >
          {/* Mobile Header */}
          <div className="p-6 flex justify-between items-center border-b border-white/5 bg-[#050505] flex-shrink-0">
              <span className="text-white text-lg font-medium">Filters</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateFilters({ collection: "All", group: "All", dimming: "All" })} 
                className="text-[10px] uppercase  text-red-500 font-bold border border-red-500/30 px-2 py-1 rounded"
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

          {/* Mobile Content (Internal Scroll Only) */}
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-40 no-scrollbar">
            <div className="mb-10">
              <label className="text-gray-500 body uppercase tracking-widest mb-4 block">Collection</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => updateFilters({ collection: cat })} 
                    className={`w-full text-left py-4 body-sm border-b border-white/5 flex justify-between items-center uppercase tracking-tight ${filters.collection === cat ? 'text-white' : 'text-gray-500'}`}
                  >
                    {labelMap[cat] || cat} 
                    {filters.collection === cat && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {isSubFilterVisible && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mb-10">
                    <label className="text-gray-500 body uppercase  mb-4 block">Product Group</label>
                    <div className="flex flex-wrap gap-2">
                      {groups.map(g => (
                        <button 
                          key={g} 
                          onClick={() => updateFilters({ group: g })} 
                          className={`px-4 py-2 rounded-full body-sm border transition-all ${filters.group === g ? 'bg-white text-black font-bold' : 'border-white/10 text-gray-400'}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-10">
                    <label className="text-gray-500 body uppercase  mb-4 block">Dimming Method</label>
                    <div className="flex flex-wrap gap-2">
                      {dimmings.map(d => (
                        <button 
                          key={d} 
                          onClick={() => updateFilters({ dimming: d })} 
                          className={`px-4 py-2 rounded-full body-sm border transition-all ${filters.dimming === d ? 'bg-white text-black font-bold' : 'border-white/10 text-gray-400'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fixed Footer */}
          <div className="absolute bottom-0 left-0 w-full px-6 py-4 bg-black flex-shrink-0 justify-center">
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full bg-white text-black font-bold py-2 px-2 rounded-[12px] uppercase "
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full px-4 md:px-20 sticky top-0 z-[50]">
      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex gap-10 items-center border-b border-white/10 overflow-x-auto no-scrollbar ">
        {categories.map((tab: string) => {
          const label = labelMap[tab] || tab.toUpperCase()
          return (
            <button
              key={tab}
              onClick={() => updateFilters({ collection: tab })}
              className={`body transition-all px-2 whitespace-nowrap pt-6 pb-6 relative uppercase ${
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
      <AnimatePresence>
        {isSubFilterVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden md:flex flex-col md:flex-row justify-between items-center py-4 gap-6 relative"
          >
            <div className="relative w-full md:w-auto" ref={groupRef}>
              <button
                onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                className={`flex items-center justify-between gap-6 px-6 h-12 rounded-[8px] text-[14px] font-medium transition-all duration-300 w-full md:w-fit ${showGroupDropdown ? "bg-white text-black shadow-xl" : "bg-transparent border-b border-white/20 text-white hover:bg-white hover:text-black"}`}
              >
                <span className="tracking-wider body ">
                  {filters.group === "All" ? "Product Groups" : filters.group}
                </span>
                <ArrowDown size={18} className={`transition-transform duration-300 ${showGroupDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showGroupDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-full md:min-w-[300px] bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999] overflow-hidden"
                  >
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {groups.map((g: string) => (
                        <button
                          key={g}
                          onClick={() => { updateFilters({ group: g }); setShowGroupDropdown(false); }}
                          className="group w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-white hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                        >
                          <span className="text-[15px]">{g}</span>
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative w-full md:w-auto" ref={dimmingRef}>
              <button
                onClick={() => setShowDimmingDropdown(!showDimmingDropdown)}
                className={`flex items-center justify-between gap-6 px-6 h-12 rounded-[8px] text-[14px] font-medium transition-all duration-300 w-full md:w-fit ${showDimmingDropdown ? "bg-white text-black shadow-xl" : "bg-transparent border-b border-white/20 text-white hover:bg-white hover:text-black"}`}
              >
                <span className="tracking-wider body">
                  {filters.dimming === "All" ? "Dimming Method" : filters.dimming}
                </span>
                <ArrowDown size={18} className={`transition-transform duration-300 ${showDimmingDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showDimmingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] right-0 w-full md:min-w-[220px] bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999] overflow-hidden"
                  >
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {dimmings.map((d: string) => (
                        <button
                          key={d}
                          onClick={() => { updateFilters({ dimming: d }); setShowDimmingDropdown(false); }}
                          className="group w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-white hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                        >
                          <span className="text-[15px]">{d}</span>
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE TRIGGER */}
      <div className="md:hidden flex justify-between items-center h-[75px] px-1">
        <div className="flex flex-col">
          <span className="text-white font-bold text-base uppercase">{filters.collection}</span>
          {(filters.group !== "All" || filters.dimming !== "All") && (
            <span className="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5">
              {filters.group !== "All" ? filters.group : ""}
              {filters.group !== "All" && filters.dimming !== "All" ? " | " : ""}
              {filters.dimming !== "All" ? filters.dimming : ""}
            </span>
          )}
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="w-11 h-11 bg-[#1a1a1a] rounded-full flex flex-col items-center justify-center gap-1 border border-white/5"
        >
          <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
          <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
        </button>
      </div>

      {mounted && createPortal(MobileMenu, document.body)}
    </div>
  )
}