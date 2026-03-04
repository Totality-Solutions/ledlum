"use client"

import { useMemo, useState } from "react"

export default function ProductFilters({
  filters,
  setFilters,
  products = [],
  collection
}: any) {

  const [showGroupDropdown, setShowGroupDropdown] = useState(false)
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false)

  /* COLLECTION TABS */

  const categories = useMemo(() => {

    if (!collection) return ["All"]

    const base =
      collection.charAt(0).toUpperCase() + collection.slice(1)

    return ["All", base, "Tracks", "Sensors"]

  }, [collection])

  /* GROUP OPTIONS */

  const groups = useMemo(() => {

    const set = new Set<string>()

    products.forEach((p:any) => {
      if (p.group) set.add(p.group)
    })

    return ["All", ...Array.from(set)]

  }, [products])

  /* DIMMING OPTIONS */

  const dimmings = useMemo(() => {

    const set = new Set<string>()

    products.forEach((p:any) => {
      if (p.dimming) set.add(p.dimming)
    })

    return ["All", ...Array.from(set)]

  }, [products])

  /* UPDATE FILTERS */

  const updateFilters = (newVal:any) => {

    const updated = { ...filters, ...newVal }

    if (newVal.collection === "All") {
      updated.group = "All"
      updated.dimming = "All"
    }

    setFilters(updated)

  }

  const isSubFilterVisible = filters.collection !== "All"

  return (

    <div className="w-full px-4 md:px-20 sticky top-0 z-[200] bg-black">

      {/* COLLECTION TABS */}

      <div className="flex gap-10 py-4 items-center border-b border-white/5">

        {categories.map((tab:string) => (

          <button
            key={tab}
            onClick={() => updateFilters({ collection: tab })}
            className={`text-[12px] tracking-[0.2em] border-b-2 transition-all px-2 ${
              filters.collection === tab
                ? "border-white text-white font-semibold"
                : "border-transparent text-white/40"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* DROPDOWNS */}

      {isSubFilterVisible && (

        <div className="flex justify-between items-center py-6 gap-4 relative">

          {/* GROUP */}

          <div className="relative">

            <button
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium w-[240px] flex justify-between items-center"
            >
              {filters.group === "All" ? "Product Groups" : filters.group}
              ↓
            </button>

            {showGroupDropdown && (

              <div className="absolute top-full left-0 mt-2 w-full bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999]">

                {groups.map((g:string) => (

                  <button
                    key={g}
                    onClick={() => {
                      updateFilters({ group: g })
                      setShowGroupDropdown(false)
                    }}
                    className="w-full text-left px-5 py-3 text-xs text-white/70 hover:bg-white/5 border-b border-white/5 last:border-0"
                  >
                    {g}
                  </button>

                ))}

              </div>

            )}

          </div>

          {/* DIMMING */}

          <div className="relative">

            <button
              onClick={() => setShowDimmingDropdown(!showDimmingDropdown)}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium w-[200px] flex justify-between items-center"
            >
              {filters.dimming === "All"
                ? "Dimming Method"
                : filters.dimming}
              ↓
            </button>

            {showDimmingDropdown && (

              <div className="absolute top-full right-0 mt-2 w-full bg-[#111111] border border-white/10 rounded-lg shadow-2xl z-[9999]">

                {dimmings.map((d:string) => (

                  <button
                    key={d}
                    onClick={() => {
                      updateFilters({ dimming: d })
                      setShowDimmingDropdown(false)
                    }}
                    className="w-full text-left px-5 py-3 text-xs text-white/70 hover:bg-white/5 border-b border-white/5 last:border-0"
                  >
                    {d}
                  </button>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  )
}