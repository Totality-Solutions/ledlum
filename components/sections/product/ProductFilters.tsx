"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductFilters({ onFilterChange }: any) {
  const [filters, setFilters] = useState({ category: "All", group: "All", dimming: "All" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [showDimmingDropdown, setShowDimmingDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const categories = ["All", "INDOOR", "OUTDOOR", "TRACKS/ MAGNETIC TRACKS", "SENSORS"];
  const groups = ["All", "Led Cob Concealed", "Led Smd Concealed", "Premium Series"];
  const dimmings = ["All", "Non - Dimming", "Paste Cut - Out", "Dali", "DP"];

  const updateFilters = (newVal: any) => {
    const updated = { ...filters, ...newVal };
    if (newVal.category === "All") {
      updated.group = "All";
      updated.dimming = "All";
    }
    setFilters(updated);
    onFilterChange(updated);
  };

  const isSubFilterVisible = filters.category !== "All";

  // Mobile Menu Logic (Portal)
  const MobileMenu = (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: "circOut" }} className="fixed inset-0 z-[9999] bg-black flex flex-col w-full h-screen">
          <div className="p-6 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-white text-lg font-medium">Filters</span>
              <button onClick={() => updateFilters({ category: "All", group: "All", dimming: "All" })} className="text-[10px] uppercase tracking-widest text-red-500 font-bold border border-red-500/30 px-2 py-1 rounded">Clear All</button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-32">
            <div className="mb-10">
              <label className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 block">Collection</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button key={cat} onClick={() => updateFilters({ category: cat })} className={`w-full text-left py-4 text-xl border-b border-white/5 flex justify-between items-center ${filters.category === cat ? 'text-red-500' : 'text-gray-300'}`}>
                    {cat} {filters.category === cat && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence>
              {isSubFilterVisible && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mb-10">
                    <label className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 block">Product Group</label>
                    <div className="flex flex-wrap gap-2">
                      {groups.map(g => (
                        <button key={g} onClick={() => updateFilters({ group: g })} className={`px-5 py-2.5 rounded-full text-xs border ${filters.group === g ? 'bg-white text-black font-bold' : 'border-white/10 text-gray-400'}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-10">
                    <label className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 block">Dimming Method</label>
                    <div className="flex flex-wrap gap-2">
                      {dimmings.map(d => (
                        <button key={d} onClick={() => updateFilters({ dimming: d })} className={`px-5 py-2.5 rounded-full text-xs border ${filters.dimming === d ? 'bg-white text-black font-bold' : 'border-white/10 text-gray-400'}`}>{d}</button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-10 left-0 w-full px-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-red-600 text-white font-bold py-5 rounded-xl uppercase tracking-widest shadow-2xl">Apply & Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full border-b border-white/10 px-4 md:px-20 sticky top-0 z-40 bg-black">      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="flex gap-10 h-[60px] items-center border-b border-white/5 overflow-x-auto no-scrollbar">
          {categories.map((tab) => (
            <button key={tab} onClick={() => updateFilters({ category: tab })} className={`text-[12px] tracking-[0.2em] h-full border-b-2 transition-all px-2 ${filters.category === tab ? "border-white text-white font-semibold" : "border-transparent text-white/40"}`}>{tab}</button>
          ))}
        </div>
        
        {/* DESKTOP DROPDOWN ROW - Key fix here: overflow-visible */}
        <motion.div animate={{ height: isSubFilterVisible ? "auto" : 0, opacity: isSubFilterVisible ? 1 : 0 }} className="overflow-visible">
          <div className="flex justify-between items-center py-6 gap-4 relative z-50">
            <div className="relative">
              <button onClick={() => setShowGroupDropdown(!showGroupDropdown)} className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium w-[240px] flex justify-between items-center relative z-[60]">
                {filters.group === "All" ? "Product Groups" : filters.group} <span>↓</span>
              </button>
              {showGroupDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#111111] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-[70]">
                  {groups.map(g => (
                    <button key={g} onClick={() => { updateFilters({ group: g }); setShowGroupDropdown(false); }} className="w-full text-left px-5 py-3 text-xs text-white/70 hover:bg-white/5 border-b border-white/5 last:border-0">{g}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setShowDimmingDropdown(!showDimmingDropdown)} className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium w-[200px] flex justify-between items-center relative z-[60]">
                {filters.dimming === "All" ? "Dimming Method" : filters.dimming} <span>↓</span>
              </button>
              {showDimmingDropdown && (
                <div className="absolute top-full right-0 mt-2 w-full bg-[#111111] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-[70]">
                  {dimmings.map(d => (
                    <button key={d} onClick={() => { updateFilters({ dimming: d }); setShowDimmingDropdown(false); }} className="w-full text-left px-5 py-3 text-xs text-white/70 hover:bg-white/5 border-b border-white/5 last:border-0">{d}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center h-[75px] px-3">
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-widest text-base uppercase">{filters.category}</span>
          {(filters.group !== "All" || filters.dimming !== "All") && (
            <span className="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5">
              {filters.group !== "All" ? filters.group : ""}
              {filters.group !== "All" && filters.dimming !== "All" ? " | " : ""}
              {filters.dimming !== "All" ? filters.dimming : ""}
            </span>
          )}
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="w-11 h-11 bg-[#1a1a1a] rounded-full flex flex-col items-center justify-center gap-1 border border-white/5">
          <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
          <div className="w-5 h-[1.5px] bg-white rounded-full"></div>
        </button>
      </div>

      {mounted && createPortal(MobileMenu, document.body)}
    </div>
  );
}