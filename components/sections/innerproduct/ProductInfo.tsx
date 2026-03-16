"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import { PdfFile } from "./Pdf";
import { ExcelFile } from "./ExcelFile";

interface ProductInfoProps {
  config: any;
  activeId: string;
  onModelChange: (id: string) => void;
  allModelIds: string[];
  permutations: any[];
}

export default function ProductInfoSection({ config, activeId, onModelChange, allModelIds, permutations = [] }: ProductInfoProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const ANIMATION_DURATION = 2000; // 2 seconds for a premium feel

  useEffect(() => {
    setSelections({});
    setError("");
    setTouched([]);
    setIsMenuOpen(false);
  }, [activeId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const requiredFields = [
    "voltage",
    "dimensions",
    "watts",
    "cct",
    "bodyColor",
    "beamAngles",
    "ledChip",
    "luminous",
    "cri"
  ];

  const checkIsDisabled = (category: string, value: string): boolean => {
    if (!permutations || permutations.length === 0) return false;
    return !permutations.some((p: any) => {
      if (p[category] !== value) return false;
      return Object.entries(selections).every(([key, selectedVal]) => {
        if (!selectedVal || key === category) return true;
        if (!(key in p)) return true;
        return p[key] === selectedVal;
      });
    });
  };

  const handleSelect = (category: string, value: string) => {
    setError("");
    setSelections((prev) => {
      if (prev[category] === value) {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      }
      return { ...prev, [category]: value };
    });
    setTouched((prev) => prev.filter((f) => f !== category));
  };

  const validateForm = () => {
    const missing = requiredFields.filter(field => !selections[field]);
    if (missing.length > 0) {
      setTouched(missing);
      setError(`Please complete the selection for: ${missing.join(", ")}`);
      const firstId = `field-${missing[0]}`;
      const element = document.getElementById(firstId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setIsMenuOpen(false);
      return false;
    }
    return true;
  };

  const handleDownloadPDF = async () => {
    if (!validateForm()) return;
    setIsDownloading(true);
    const startTime = Date.now();

    try {
      // Start PDF generation
      await PdfFile({ 
        selections, 
        activeId, 
        ipRating: config.ipRating?.[0] || "IP20",
        cutout: config.cutoutSizes?.[0] || "N/A"
      });

      // Sync timing so animation finishes before state resets
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, ANIMATION_DURATION - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setIsMenuOpen(false);
    } catch (err) {
      setError("PDF Generation failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  const ModelOption = ({ id, activeId, onClick }: { id: string, activeId: string, onClick: (id: string) => void }) => {
  const isActive = activeId.toLowerCase() === id.toLowerCase();
  return (
    <div 
      onClick={() => onClick(id)} 
      className={`h-[60px] md:h-[90px] flex items-center px-6 rounded-[12px] cursor-pointer transition-all border shrink-0 ${
        isActive 
          ? "bg-white border-white" 
          : "bg-[#0A0A0A] border-white/10 hover:border-white/30"
      }`}
    >
      <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
        isActive ? "border-[#4A61AD]" : "border-white/20"
      }`}>
        {isActive && <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#4A61AD]" />}
      </div>
      
      <span className={`text-sm md:text-lg font-normal uppercase flex-1 ${
        isActive ? "text-black" : "text-[#888888]"
      }`}>
        {id}
      </span>
      
      <div className={`h-8 md:h-10 w-[1px] mx-4 ${
        isActive ? "bg-black/10" : "bg-white/10"
      }`} />
      
      <div className="relative w-8 h-8 md:w-12 md:h-12">
        <Image 
          src={`https://placehold.co/100x100?text=${id}`} 
          alt={id} 
          fill  
          className="object-contain" 
        />
      </div>
    </div>
  );
};

  const handleDownloadExcel = async () => {
    if (!validateForm()) return;
    setIsDownloading(true);
    const startTime = Date.now();

    try {
      await ExcelFile({
        selections,
        activeId,
        ipRating: config.ipRating?.[0] || "IP20",
        cutout: config.cutoutSizes?.[0] || "N/A"
      });

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, ANIMATION_DURATION - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setIsMenuOpen(false);
    } catch (err) {
      setError("Excel Generation failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  const resetAll = () => {
    setSelections({});
    setError("");
    setTouched([]);
  };

  return (
    <Section className="w-full bg-black md:px-[50px] font-pop">
      <div className="">
        <h1 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white mb-12">Product Configuration</h1>

        {/* STICKY WRAPPER */}
<div className="sticky top-0 z-[100] bg-black pt-6 pb-6 mb-10 -mx-4 px-4 md:-mx-[50px] md:px-[50px] border-b border-white/10 shadow-2xl">
  <div className="flex flex-col gap-4">
    <p className="text-white/70 text-body font-regular uppercase text-xs tracking-widest">
      Model Spectrum
    </p>

    {/* MOBILE & TABLET VIEW: Dropdown Overlay (Visible < lg) */}
    <div className="lg:hidden relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-full h-[70px] flex items-center px-6 rounded-[12px] bg-[#0A0A0A] border transition-all active:scale-[0.98] ${
          isMenuOpen ? "border-white" : "border-white/20"
        }`}
      >
        <div className="w-4 h-4 rounded-full border-2 border-[#4A61AD] flex items-center justify-center mr-4">
          <div className="w-2 h-2 rounded-full bg-[#4A61AD]" />
        </div>
        <span className="flex-1 text-left uppercase font-medium text-white">
          {activeId}
        </span>
        <motion.div 
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          className="text-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      </button>

      {/* The Dropdown Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Invisible Backdrop to close on outside click */}
            <div 
              className="fixed inset-0 z-[-1]" 
              onClick={() => setIsMenuOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-[#0A0A0A] border border-white/20 rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[110]"
            >
              <div className="flex flex-col max-h-[400px] overflow-y-auto p-2 gap-1 custom-scrollbar">
                {allModelIds.map((id) => (
                  <ModelOption 
                    key={id} 
                    id={id} 
                    activeId={activeId} 
                    onClick={(newId) => {
                      onModelChange(newId);
                      setIsMenuOpen(false);
                    }} 
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

    {/* DESKTOP VIEW: Original Grid (Hidden < lg) */}
    <div className="hidden lg:grid grid-cols-4 gap-5">
      {allModelIds.map((id) => (
        <ModelOption 
          key={id} 
          id={id} 
          activeId={activeId} 
          onClick={onModelChange} 
        />
      ))}
    </div>
  </div>
</div>

        <div className="flex flex-col border-t border-white/10 pt-10">
          <p className="text-white/70 text-body font-regular uppercase mb-4">Core Configuration</p>
          <ConfigRow id="field-voltage" label="Voltage :" options={config.voltage || []} selected={selections.voltage} onSelect={(val: string) => handleSelect("voltage", val)} isDisabled={(val: string) => checkIsDisabled("voltage", val)} isError={touched.includes("voltage")} />
          <ConfigRow id="field-dimensions" label="Dimensions :" options={config.dimensions || []} selected={selections.dimensions} onSelect={(val: string) => handleSelect("dimensions", val)} isDisabled={(val: string) => checkIsDisabled("dimensions", val)} isError={touched.includes("dimensions")} />
          <ConfigRow id="field-watts" label="Watts :" options={config.watts || []} selected={selections.watts} onSelect={(val: string) => handleSelect("watts", val)} isDisabled={(val: string) => checkIsDisabled("watts", val)} isError={touched.includes("watts")} />

          <div id="field-cct" className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 transition-all ${touched.includes("cct") ? "border-red-500 bg-red-500/5" : "border-white/10"}`}>
            <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg">CCT :</span>
            <div className="flex flex-wrap gap-3">
              {(config.cct || []).map((item: any, idx: number) => {
                const disabled = checkIsDisabled("cct", item.label);
                const active = selections.cct === item.label;
                return (
                  <button key={idx} disabled={disabled} onClick={() => handleSelect("cct", item.label)} className={`h-[50px] pl-6 pr-2 py-2 rounded-full border transition-all flex items-center gap-4 ${disabled ? "opacity-30 cursor-not-allowed grayscale pointer-events-none border-white/5" : "cursor-pointer"} ${active ? "bg-content border-content" : "border-white/20 hover:border-white"}`}>
                    <span className={active ? "text-black font-medium" : "text-[#EBEBEB]"}>{item.label}</span>
                    <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-14 mb-4">
            <h3 className="text-white/70 text-body font-regular uppercase">Technical Specifications & Finish</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-white/10">
            <ConfigColumn id="field-bodyColor" label="Body Color :" options={config.bodyColors || []} selected={selections.bodyColor} onSelect={(val: string) => handleSelect("bodyColor", val)} isDisabled={(val: string) => checkIsDisabled("bodyColor", val)} isColorType={true} isError={touched.includes("bodyColor")} />
            <ConfigColumn id="field-beamAngles" label="Beam Angle :" options={config.beamAngles || []} selected={selections.beamAngles} onSelect={(val: string) => handleSelect("beamAngles", val)} isDisabled={(val: string) => checkIsDisabled("beamAngles", val)} isError={touched.includes("beamAngles")} />
            <ConfigColumn label="IP Rating :" options={config.ipRating || []} selected={config.ipRating?.[0]} />
            <ConfigColumn label="Cutout Size :" options={config.cutoutSizes || []} selected={config.cutoutSizes?.[0]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-white/10">
            <ConfigColumn id="field-ledChip" label="LED Chip :" options={config.ledChip || []} selected={selections.ledChip} onSelect={(val: string) => handleSelect("ledChip", val)} isDisabled={(val: string) => checkIsDisabled("ledChip", val)} isError={touched.includes("ledChip")} />
            <ConfigColumn id="field-luminous" label="Luminous :" options={config.luminous || []} selected={selections.luminous} onSelect={(val: string) => handleSelect("luminous", val)} isDisabled={(val: string) => checkIsDisabled("luminous", val)} isError={touched.includes("luminous")} />
            <ConfigColumn id="field-cri" label="CRI :" options={config.cri || []} selected={selections.cri} onSelect={(val: string) => handleSelect("cri", val)} isDisabled={(val: string) => checkIsDisabled("cri", val)} isError={touched.includes("cri")} />
          </div>

          {error && <p className="text-red-500 mt-6 font-medium animate-pulse">{error}</p>}
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-6 pb-20">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-body font-regular uppercase tracking-tight">Product ID: {activeId}</p>
            <p className="text-logo text-lg font-medium uppercase">
              {selections.watts || "---"} / {selections.luminous || "---"} / {selections.cri ? `CRI${selections.cri}` : "---"} / {selections.cct || "---"}
            </p>
          </div>

          <div className="flex items-center gap-6 relative" ref={menuRef}>
            <button onClick={resetAll} className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-all mb-4">Reset Selection</button>

            <div className="flex flex-col items-center">
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full mt-4 flex flex-col gap-2 w-fit left-35 z-50">
                    <button onClick={handleDownloadExcel} className="flex items-center justify-between gap-2 bg-logo hover:bg-[#85764d] text-white pl-4 pr-1 py-1 rounded-full transition-all w-fit shadow-xl">
                      <span className="text-body font-regular">Sheet Data</span>
                      <div className="bg-[#FAF3E0] p-2 rounded-full flex items-center justify-center">
                        <HiOutlineDownload className="text-black text-lg" />
                      </div>
                    </button>
                    <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center justify-between gap-2 bg-logo hover:bg-[#85764d] text-white pl-4 pr-1 py-1 rounded-full transition-all w-fit shadow-xl">
                      <span className="text-body font-regular">{isDownloading ? "Generating..." : "PDF Tech Pack"}</span>
                      <div className="bg-[#FAF3E0] p-2 rounded-full flex items-center justify-center">
                        <HiOutlineDownload className="text-black text-lg" />
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => !isDownloading && setIsMenuOpen(!isMenuOpen)}
                disabled={isDownloading}
                className="flex items-center justify-between gap-4 bg-logo hover:bg-[#85764d] text-white pl-4 pr-1 py-1 rounded-full transition-all max-w-[300px] group shadow-lg disabled:opacity-90 disabled:cursor-wait"
              >
                <span className="text-body font-regular">
                  {isDownloading ? "Downloading....." : "Download Pack"}
                </span>

                <div className="relative bg-[#FAF3E0] p-2 rounded-full flex items-center justify-center">
                  <AnimatePresence>
                    {isDownloading && (
                      <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="transparent"
                          stroke="rgba(150, 134, 93, 0.15)"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="transparent"
                          stroke="#96865D"
                          strokeWidth="8"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: ANIMATION_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      </svg>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    <HiOutlineDownload 
                      className={`text-black text-xl transition-all duration-300 ${
                        isDownloading ? "opacity-50 scale-75" : "group-hover:scale-110"
                      }`} 
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const ConfigRow = ({ id, label, options, selected, onSelect, isDisabled, isError }: any) => (
  <div id={id} className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 transition-all ${isError ? "border-red-500 bg-red-500/5" : "border-white/10"}`}>
    <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg font-normal">{label}</span>
    <div className="flex flex-wrap gap-3">
      {options?.map((opt: string) => (
        <button key={opt} disabled={isDisabled(opt)} onClick={() => onSelect(opt)} className={`h-[50px] px-8 py-2 rounded-full border transition-all flex items-center text-lg ${isDisabled(opt) ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"} ${selected === opt ? "bg-content text-black font-medium border-content" : "text-[#EBEBEB]/50"}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const ConfigColumn = ({ id, label, options = [], selected, onSelect, isDisabled, isColorType, isError }: any) => (
  <div id={id} className={`flex flex-col gap-4 p-3 rounded-xl transition-all ${isError ? "ring-2 ring-red-500 bg-red-500/5" : ""}`}>
    <span className="text-[#EBEBEB] text-body">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: any) => {
        const val = typeof opt === 'string' ? opt : opt.label;
        const colorHex = typeof opt === 'string' ? opt.toLowerCase() : opt.hex;
        const disabled = isDisabled ? isDisabled(val) : false;
        const active = selected === val;
        return (
          <button key={val} disabled={disabled} onClick={() => onSelect && onSelect(val)} className={`h-[45px] transition-all flex items-center justify-center border ${isColorType ? "w-12 rounded-full p-[2px]" : "px-6 rounded-full text-md"} ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"} ${active && isColorType ? "ring-4 ring-white scale-110 shadow-lg" : ""} ${active && !isColorType ? "bg-content border-content" : ""}`} title={val}>
            {isColorType ? <div className="w-full h-full rounded-full" style={{ backgroundColor: colorHex }} /> : <span className={active ? "text-black font-medium" : "text-[#EBEBEB]/50"}>{val}</span>}
          </button>
        );
      })}
    </div>
  </div>
);