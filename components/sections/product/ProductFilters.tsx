"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection
}: any) {
  const [showGroupDropdown, setShowGroupDropdown] = useState(false)
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false)

  // Refs for "Click Outside" logic
  const groupRef = useRef<HTMLDivElement>(null)
  const dimmingRef = useRef<HTMLDivElement>(null)

  // Handle clicking outside to close dropdowns
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

  /* COLLECTION TABS */
  const categories = useMemo(() => {
    if (!collection) return ["All"]
    const base = collection.charAt(0).toUpperCase() + collection.slice(1)
    return ["All", base, "Tracks", "Sensors"]
  }, [collection])

  /* GROUP OPTIONS */
  const groups = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => {
      if (p.group) set.add(p.group)
    })
    return ["All", ...Array.from(set)]
  }, [products])

  /* DIMMING OPTIONS */
  const dimmings = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => {
      if (p.dimming) set.add(p.dimming)
    })
    return ["All", ...Array.from(set)]
  }, [products])

  /* UPDATE FILTERS */
  const updateFilters = (newVal: any) => {
    const updated = { ...filters, ...newVal }
    if (newVal.collection === "All") {
      updated.group = "All"
      updated.dimming = "All"
    }
    setFilters(updated)
  }

  const isSubFilterVisible = filters.collection !== "All"

  return (
    <div className="w-full px-4 md:px-20 sticky top-0 z-[50] bg-black">
      {/* COLLECTION TABS */}
      <div className="flex gap-10 py-4 items-center border-b border-white/5 overflow-x-auto no-scrollbar">
        {categories.map((tab: string) => (
          <button
            key={tab}
            onClick={() => updateFilters({ collection: tab })}
            className={`body font-pop border-b-2 transition-all px-2 whitespace-nowrap pb-1 ${
              filters.collection === tab
                ? "border-white text-white font-semibold"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DROPDOWNS */}
      <AnimatePresence>
        {isSubFilterVisible && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col md:flex-row justify-between items-center py-6 gap-6 relative"
          >
            {/* GROUP DROPDOWN */}
            <div className="relative w-full md:w-auto" ref={groupRef}>
              <button
                onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                className="bg-white text-black px-6 h-12 rounded-[12px] body-sm font-pop w-full md:w-[220px] flex justify-between items-center shadow-lg transition-transform active:scale-95"
              >
                <span className="truncate pr-2">
                  {filters.group === "All" ? "Product Groups" : filters.group}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${showGroupDropdown ? "rotate-180" : ""}`} 
                />
              </button>

              <AnimatePresence>
                {showGroupDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
                  >
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {groups.map((g: string) => (
                        <button
                          key={g}
                          onClick={() => {
                            updateFilters({ group: g })
                            setShowGroupDropdown(false)
                          }}
                          className="w-full text-left px-6 py-4 body-sm text-white/70 hover:text-white hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors"
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DIMMING DROPDOWN */}
            <div className="relative w-full md:w-auto" ref={dimmingRef}>
              <button
                onClick={() => setShowDimmingDropdown(!showDimmingDropdown)}
                className="bg-white text-black px-6 h-12 rounded-[12px] body-sm font-pop w-full md:w-[220px] flex justify-between items-center shadow-lg transition-transform active:scale-95"
              >
                <span className="truncate pr-2">
                  {filters.dimming === "All" ? "Dimming Method" : filters.dimming}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${showDimmingDropdown ? "rotate-180" : ""}`} 
                />
              </button>

              <AnimatePresence>
                {showDimmingDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] right-0 w-full bg-[#111111]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl z-[9999] overflow-hidden"
                  >
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {dimmings.map((d: string) => (
                        <button
                          key={d}
                          onClick={() => {
                            updateFilters({ dimming: d })
                            setShowDimmingDropdown(false)
                          }}
                          className="w-full text-left px-6 py-4 body-sm text-white/70 hover:text-white hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors"
                        >
                          {d}
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
    </div>
  )
}