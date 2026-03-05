"use client"
import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection
}: any) {

  const [showGroupDropdown, setShowGroupDropdown] = useState(false)
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false)

  const groupRef = useRef<HTMLDivElement>(null)
  const dimmingRef = useRef<HTMLDivElement>(null)

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

  /* COLLECTION TABS (ORIGINAL LOGIC) */
  const categories = useMemo(() => {

    if (!collection) return ["All"]

    const base = collection.charAt(0).toUpperCase() + collection.slice(1)

    return ["All", base, "Tracks", "Sensors"]

  }, [collection])

  /* DISPLAY LABELS (UI ONLY) */
  const labelMap: any = {
    All: "All",
    Tracks: "Tracks / Magnetic Tracks",
    Sensors: "Sensors"
  }

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
    <div className="w-full px-4 md:px-20 sticky top-0 z-[50]">
      {/* COLLECTION TABS */}
      <div className="flex gap-10 items-center border-b border-white/10 overflow-x-auto no-scrollbar">
        {categories.map((tab: string) => {
          const label = labelMap[tab] || tab.toUpperCase()
          return (
            <button
              key={tab}
              onClick={() => updateFilters({ collection: tab })}
              // Removed pb-2 from here and moved it to a consistent internal padding 
              // to ensure the underline sits exactly on the container's bottom border
              className={`body transition-all px-2 whitespace-nowrap pt-6 pb-6 relative uppercase ${
                filters.collection === tab
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {label}            
              {filters.collection === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  // bottom-0 aligns it exactly with the parent button's bottom edge
                  // h-[2px] makes it thick enough to clearly sit "on" the line
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white z-20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* DROPDOWNS */}
      <AnimatePresence>
        {isSubFilterVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col md:flex-row justify-between items-center py-4 gap-6 relative"
          >

            {/* GROUP DROPDOWN */}
            <div className="relative w-full md:w-auto" ref={groupRef}>
              <button
                onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                className={`
                  flex items-center justify-between gap-6 px-6 h-12 rounded-[8px] text-[14px] font-medium transition-all duration-300 w-full md:w-fit
                  ${
                    showGroupDropdown
                      ? "bg-white text-black shadow-xl"
                      : "bg-transparent border-b border-white/20 text-white hover:bg-white hover:text-black"
                  }
                `}
              >
                <span className="tracking-wider body ">
                  {filters.group === "All" ? "Product Groups" : filters.group}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    showGroupDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showGroupDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-full md:min-w-[300px] bg-[#111111] border border-white/10 rounded-[8px] shadow-2xl z-[9999] overflow-hidden"
                  >
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {groups.map((g: string) => (
                        <button
                          key={g}
                          onClick={() => {
                            updateFilters({ group: g })
                            setShowGroupDropdown(false)
                          }}
                          className="group w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-white hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                        >
                          <span className="text-[15px]">{g}</span>
                          <ArrowRight
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                          />
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
                className={`
                  flex items-center justify-between gap-6 px-6 h-12 rounded-[8px] text-[14px] font-medium transition-all duration-300 w-full md:w-fit
                  ${
                    showDimmingDropdown
                      ? "bg-white text-black shadow-xl"
                      : "bg-transparent border-b border-white/20 text-white hover:bg-white hover:text-black"
                  }
                `}
              >
                <span className="tracking-wider body">
                  {filters.dimming === "All"
                    ? "Dimming Method"
                    : filters.dimming}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    showDimmingDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showDimmingDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] right-0 w-full md:min-w-[220px] bg-[#111111] border border-white/10 rounded-[8px] shadow-2xl z-[9999] overflow-hidden"
                  >

                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {dimmings.map((d: string) => (
                        <button
                          key={d}
                          onClick={() => {
                            updateFilters({ dimming: d })
                            setShowDimmingDropdown(false)
                          }}
                          className="group w-full flex items-center justify-between px-6 py-4 text-left text-white/70 hover:text-white hover:bg-[#1A1A1A] border-b border-white/5 last:border-0 transition-all"
                        >
                          <span className="text-[15px]">{d}</span>
                          <ArrowRight
                            size={16}
                            className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                          />
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