"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import { ExcelFile } from "./ExcelFile";

interface ProductInfoProps {
  config: any;
  activeId: string;
  onModelChange: (id: string) => void;
  allModelIds: string[];
  modelFamilies: {
    familyName: string;
    models: string[];
  }[];
  permutations?: any[];
}

// ─── Shared ModelCard ──────────────────────────────────────────────────────────
const ModelCard = ({
  id,
  isActive,
  onClick,
}: {
  id: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`
      h-fit flex items-center px-5 py-2  rounded-[12px] cursor-pointer
      transition-all duration-200 border w-full
      ${isActive
        ? "bg-white border-white"
        : "bg-[#0A0A0A] border-white/10 hover:border-white/30"}
    `}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 shrink-0 ${isActive ? "border-[#4A61AD]" : "border-white/20"}`}>
      {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#4A61AD]" />}
    </div>
    <span className={`text-sm font-normal uppercase flex-1 truncate ${isActive ? "text-black" : "text-[#888888]"}`}>
      {id}
    </span>
    <div className={`h-10 w-[1px] mx-3 shrink-0 ${isActive ? "bg-black/10" : "bg-white/10"}`} />
    <div className="relative w-10 h-10 shrink-0">
      <Image src={`https://placehold.co/100x100?text=${id}`} alt={id} fill className="object-contain" />
    </div>
  </div>
);

// ─── Carousel Arrow ────────────────────────────────────────────────────────────
const CarouselArrow = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Previous models" : "Next models"}
    className={`
      flex items-center justify-center w-10 h-10 rounded-full border
      transition-all duration-200 shrink-0
      ${disabled
        ? "border-white/10 text-white/20 cursor-not-allowed"
        : "border-white/20 text-white hover:border-white hover:bg-white/5 active:scale-95"}
    `}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  </button>
);

// ─── View Toggle ───────────────────────────────────────────────────────────────
const ViewToggle = ({
  view,
  onChange,
}: {
  view: "carousel" | "grid";
  onChange: (v: "carousel" | "grid") => void;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-white/40 text-[10px] uppercase tracking-widest select-none">View</span>
    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-[3px] gap-[3px]">
      {(["carousel", "grid"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`
            flex items-center gap-1.5 px-3 py-[5px] rounded-full
            text-[10px] uppercase tracking-wider font-medium transition-all duration-200
            ${view === mode ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/70"}
          `}
        >
          {mode === "grid" ? (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
              <rect x="0" y="0" width="4.5" height="4.5" rx="1" />
              <rect x="6.5" y="0" width="4.5" height="4.5" rx="1" />
              <rect x="0" y="6.5" width="4.5" height="4.5" rx="1" />
              <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" />
            </svg>
          ) : (
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="0.7" width="8" height="9.6" rx="1" />
              <path d="M0.7 3.5v4" />
              <path d="M12.3 3.5v4" />
            </svg>
          )}
          {mode}
        </button>
      ))}
    </div>
  </div>
);

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ProductInfoSection({
  config,
  activeId,
  onModelChange,
  allModelIds,
  modelFamilies,
  permutations = [],
}: ProductInfoProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<string[]>([]);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Desktop view toggle
  const [desktopView, setDesktopView] = useState<"carousel" | "grid">("carousel");

  // Carousel
  const VISIBLE = 4;
  const [offset, setOffset] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < allModelIds.length;

  // Grid "load more" expand
  const GRID_INITIAL = 4;
  const [gridExpanded, setGridExpanded] = useState(false);
  const hasMore = allModelIds.length > GRID_INITIAL;
  const visibleGridIds = gridExpanded ? allModelIds : allModelIds.slice(0, GRID_INITIAL);

  // Mobile dropdown open/close
  const [mobileDropOpen, setMobileDropOpen] = useState(false);

  const ANIMATION_DURATION = 2000;

  // Sync carousel window when activeId changes
  useEffect(() => {
    if (desktopView !== "carousel") return;
    const idx = allModelIds.findIndex(id => id.toLowerCase() === activeId.toLowerCase());
    if (idx < offset) setOffset(idx);
    else if (idx >= offset + VISIBLE) setOffset(Math.max(0, idx - VISIBLE + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, desktopView]);

  // Reset config selections on model change
  useEffect(() => {
    setSelections({});
    setError("");
    setTouched([]);
    setMobileDropOpen(false);
  }, [activeId]);

  // Click outside: download menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Required fields / validation ────────────────────────────────────────────
  const requiredFields = [
    "voltage", "dimensions", "watts", "cct",
    "bodyColor", "beamAngles", "ledChip", "luminous", "cri",
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
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: value };
    });
    setTouched((prev) => prev.filter((f) => f !== category));
  };

  const validateForm = () => {
    const missing = requiredFields.filter((f) => !selections[f]);
    if (missing.length > 0) {
      setTouched(missing);
      setError(`Please complete the selection for: ${missing.join(", ")}`);
      const el = document.getElementById(`field-${missing[0]}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsDownloadMenuOpen(false);
      return false;
    }
    return true;
  };

  // ── Downloads ────────────────────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (!validateForm()) return;
    setIsDownloading(true);
    const { PdfFile } = await import("./Pdf");
    const start = Date.now();
    try {
      await PdfFile({ selections, activeId, ipRating: config.ipRating?.[0] || "IP20", cutout: config.cutoutSizes?.[0] || "N/A" });
      await new Promise((r) => setTimeout(r, Math.max(0, ANIMATION_DURATION - (Date.now() - start))));
      setIsDownloadMenuOpen(false);
    } catch {
      setError("PDF Generation failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (!validateForm()) return;
    setIsDownloading(true);
    const start = Date.now();
    try {
      await ExcelFile({ selections, activeId, ipRating: config.ipRating?.[0] || "IP20", cutout: config.cutoutSizes?.[0] || "N/A" });
      await new Promise((r) => setTimeout(r, Math.max(0, ANIMATION_DURATION - (Date.now() - start))));
      setIsDownloadMenuOpen(false);
    } catch {
      setError("Excel Generation failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  const resetAll = () => { setSelections({}); setError(""); setTouched([]); };

  useEffect(() => {
  const autoSelections: Record<string, string> = {};

  if (config.voltage?.length === 1) {
    autoSelections.voltage = config.voltage[0];
  }

  if (config.dimensions?.length === 1) {
    autoSelections.dimensions = config.dimensions[0];
  }

  if (config.watts?.length === 1) {
    autoSelections.watts = config.watts[0];
  }

  if (config.bodyColors?.length === 1) {
    autoSelections.bodyColor = config.bodyColors[0];
  }

  if (config.beamAngles?.length === 1) {
    autoSelections.beamAngles = config.beamAngles[0];
  }

  if (config.ledChip?.length === 1) {
    autoSelections.ledChip = config.ledChip[0];
  }

  if (config.luminous?.length === 1) {
    autoSelections.luminous = config.luminous[0];
  }

  if (config.cri?.length === 1) {
    autoSelections.cri = config.cri[0];
  }

  if (config.cct?.length === 1) {
    autoSelections.cct = config.cct[0].label;
  }

  setSelections(autoSelections);
}, [config]);

  // ── Config fields ────────────────────────────────────────────────────────────
  const allConfigFields = [
    { key: "voltage",     id: "field-voltage",     label: "Voltage :",     options: config.voltage     || [], type: "standard" },
    { key: "dimensions",  id: "field-dimensions",  label: "Dimensions :",  options: config.dimensions  || [], type: "standard" },
    { key: "watts",       id: "field-watts",       label: "Watts :",       options: config.watts       || [], type: "standard" },
    { key: "cct",         id: "field-cct",         label: "CCT :",         options: config.cct         || [], type: "cct"      },
    { key: "bodyColor",   id: "field-bodyColor",   label: "Body Color :",  options: config.bodyColors  || [], type: "color"    },
    { key: "beamAngles",  id: "field-beamAngles",  label: "Beam Angle :",  options: config.beamAngles  || [], type: "standard" },
    { key: "ipRating",    id: "field-ipRating",    label: "IP Rating :",   options: config.ipRating    || [], type: "static"   },
    { key: "cutoutSizes", id: "field-cutoutSizes", label: "Cutout Size :", options: config.cutoutSizes || [], type: "static"   },
    { key: "ledChip",     id: "field-ledChip",     label: "LED Chip :",    options: config.ledChip     || [], type: "standard" },
    { key: "luminous",    id: "field-luminous",    label: "Luminous :",    options: config.luminous    || [], type: "standard" },
    { key: "cri",         id: "field-cri",         label: "CRI :",         options: config.cri         || [], type: "standard" },
  ];

  const rowFields = allConfigFields.filter((f) => f.options.length > 2);
  const colFields = allConfigFields.filter((f) => f.options.length <= 2 && f.options.length > 0);

  const renderField = (field: any, layout: "row" | "col") => {
    const isError = touched.includes(field.key);
    const selected = field.type === "static" ? field.options[0] : selections[field.key];
    const onSelect = field.type === "static" ? undefined : (val: string) => handleSelect(field.key, val);
    const isDisabled = field.type === "static" ? () => false : (val: string) => checkIsDisabled(field.key, val);

    if (layout === "row") {
      if (field.type === "cct") {
        return (
          <div key={field.key} id={field.id} className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 transition-all ${isError ? "border-red-500 bg-red-500/5" : "border-white/10"}`}>
            <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg font-normal">{field.label}</span>
            <div className="flex flex-wrap gap-3">
              {field.options.map((item: any, idx: number) => {
                const val = item.label;
                const disabled = isDisabled(val);
                const active = selected === val;
                return (
                  <button key={idx} disabled={disabled} onClick={() => onSelect && onSelect(val)}
                    className={`h-fit pl-6 pr-2 py-1 rounded-full border transition-all flex items-center gap-4 ${disabled ? "opacity-30 cursor-not-allowed grayscale pointer-events-none border-white/5" : "cursor-pointer"} ${active ? "bg-content border-content" : "border-white/20 hover:border-white"}`}>
                    <span className={active ? "text-black font-medium" : "text-[#EBEBEB]"}>{val}</span>
                    <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      }
      return <ConfigRow key={field.key} id={field.id} label={field.label} options={field.options} selected={selected} onSelect={onSelect} isDisabled={isDisabled} isError={isError} isColorType={field.type === "color"} />;
    } else {
      return <ConfigColumn key={field.key} id={field.id} label={field.label} options={field.options} selected={selected} onSelect={onSelect} isDisabled={isDisabled} isError={isError} isColorType={field.type === "color"} isCctType={field.type === "cct"} />;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <Section className="w-full bg-black md:px-[50px] font-pop">
      <div>
        <h1 className="text-mob-h1 md:text-tab-h1 lg:text-desk-h2 font-pop font-medium text-white mb-12">
          Product Configuration
        </h1>

        {/* ── STICKY HEADER ─────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-[100] bg-black pt-6 pb-6 mb-10 -mx-4 px-4 md:-mx-[50px] md:px-[50px] border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-6">
            <p className="text-white/70 text-body-md font-regular uppercase">Model Spectrum</p>

            {/* ── MOBILE & TABLET: dropdown — toggles open/closed on click ── */}
            <div className="lg:hidden relative">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setMobileDropOpen((prev) => !prev)}
                className={`w-full h-[70px] flex items-center px-6 rounded-[12px] bg-[#0A0A0A] border transition-all active:scale-[0.98] ${mobileDropOpen ? "border-white" : "border-white/20"}`}
              >
                <div className="w-4 h-4 rounded-full border-2 border-[#4A61AD] flex items-center justify-center mr-4">
                  <div className="w-2 h-2 rounded-full bg-[#4A61AD]" />
                </div>
                <span className="flex-1 text-left uppercase font-medium text-white">{activeId}</span>
                <motion.div animate={{ rotate: mobileDropOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-white/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {mobileDropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 10 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-[#0A0A0A] border border-white/20 rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[110]"
                  >
                    <div className="flex flex-col max-h-[400px] overflow-y-auto p-5 gap-1 custom-scrollbar">
                      {allModelIds.map((id) => (
                        <ModelCard
                          key={id} id={id}
                          isActive={activeId.toLowerCase() === id.toLowerCase()}
                          onClick={() => {
                            onModelChange(id);
                            setMobileDropOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── DESKTOP ────────────────────────────────────────────────────── */}
            <div className="hidden lg:flex lg:flex-col gap-4">

              {/* View toggle — top right */}
              <div className="flex justify-end">
                <ViewToggle
                  view={desktopView}
                  onChange={(v) => {
                    setDesktopView(v);
                    setOffset(0);
                    setGridExpanded(false);
                  }}
                />
              </div>

              {/* ── CAROUSEL ─────────────────────────────────────────────────── */}
              {desktopView === "carousel" && (
                <div className="flex items-center gap-4">
                  <CarouselArrow direction="left" onClick={() => setOffset((p) => Math.max(0, p - 1))} disabled={!canPrev} />
                  <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${VISIBLE}, minmax(0, 1fr))` }}>
                    {allModelIds.slice(offset, offset + VISIBLE).map((id) => (
                      <ModelCard
                        key={id} id={id}
                        isActive={activeId.toLowerCase() === id.toLowerCase()}
                        onClick={() => onModelChange(id)}
                      />
                    ))}
                  </div>
                  <CarouselArrow direction="right" onClick={() => setOffset((p) => p + 1)} disabled={!canNext} />
                </div>
              )}

              {/* ── GRID VIEW ────────────────────────────────────────────────── */}
              {desktopView === "grid" && (
                <div className="flex flex-col gap-3">
                  {/* Always-visible first 4 */}
                  <div className="grid grid-cols-4 gap-4">
                    {allModelIds.slice(0, GRID_INITIAL).map((id) => (
                      <ModelCard
                        key={id} id={id}
                        isActive={activeId.toLowerCase() === id.toLowerCase()}
                        onClick={() => onModelChange(id)}
                      />
                    ))}
                  </div>

                  {/* Expanded models — same grid layout, animated in */}
                  <AnimatePresence>
                    {gridExpanded && hasMore && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-4 gap-4 pt-1">
                          {allModelIds.slice(GRID_INITIAL).map((id) => (
                            <ModelCard
                              key={id} id={id}
                              isActive={activeId.toLowerCase() === id.toLowerCase()}
                              onClick={() => onModelChange(id)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Show more / Show less toggle button */}
                  {hasMore && (
                    <button
                      onClick={() => setGridExpanded((p) => !p)}
                      className="self-end flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest transition-all duration-200 mt-1 group"
                    >
                      <span>{gridExpanded ? "Show less" : `+${allModelIds.length - GRID_INITIAL} more models`}</span>
                      <motion.div
                        animate={{ rotate: gridExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/30 group-hover:text-white/60 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </motion.div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── CONFIG FIELDS ─────────────────────────────────────────────────── */}
        <div className="flex flex-col border-t border-white/10 pt-10">
          {rowFields.length > 0 && (
            <>
              <p className="text-white/70 text-body-md font-regular uppercase mb-4">Core Configuration</p>
              {rowFields.map((field) => renderField(field, "row"))}
            </>
          )}
          {colFields.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 border-b border-white/10">
              {colFields.map((field) => renderField(field, "col"))}
            </div>
          )}
          {error && <p className="text-red-500 mt-6 font-medium animate-pulse">{error}</p>}
        </div>

        {/* ── BOTTOM CONTROLS ───────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-6 pb-20">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-body font-regular uppercase tracking-tight">Product ID: {activeId}</p>
            <p className="text-logo text-lg font-medium uppercase">
              {selections.watts || "---"} / {selections.luminous || "---"} / {selections.cri ? `CRI${selections.cri}` : "---"} / {selections.cct || "---"}
            </p>
          </div>

          <div className="flex items-center gap-6 relative" ref={downloadMenuRef}>
            <button onClick={resetAll} className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-all mb-4">Reset Selection</button>

            <div className="flex flex-col items-center">
              <AnimatePresence>
                {isDownloadMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 flex flex-col gap-2 w-fit left-35 z-50"
                  >
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
                onClick={() => !isDownloading && setIsDownloadMenuOpen((p) => !p)}
                disabled={isDownloading}
                className="flex items-center justify-between gap-4 bg-logo hover:bg-[#85764d] text-white pl-4 pr-1 py-1 rounded-full transition-all max-w-[300px] group shadow-lg disabled:opacity-90 disabled:cursor-wait"
              >
                <span className="text-body font-regular">{isDownloading ? "Downloading....." : "Download Pack"}</span>
                <div className="relative bg-[#FAF3E0] p-2 rounded-full flex items-center justify-center">
                  <AnimatePresence>
                    {isDownloading && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(150,134,93,0.15)" strokeWidth="8" />
                        <motion.circle cx="50" cy="50" r="42" fill="transparent" stroke="#96865D" strokeWidth="8" strokeLinecap="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: ANIMATION_DURATION / 1000, ease: "linear" }} />
                      </svg>
                    )}
                  </AnimatePresence>
                  <div className="relative z-10">
                    <HiOutlineDownload className={`text-black text-xl transition-all duration-300 ${isDownloading ? "opacity-50 scale-75" : "group-hover:scale-110"}`} />
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

// ─── Config Field Components (unchanged) ───────────────────────────────────────

const ConfigRow = ({ id, label, options, selected, onSelect, isDisabled, isError, isColorType }: any) => (
  <div id={id} className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 transition-all ${isError ? "border-red-500 bg-red-500/5" : "border-white/10"}`}>
    <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg font-normal">{label}</span>
    <div className="flex flex-wrap gap-3">
      {options?.map((opt: any) => {
        const val = typeof opt === "string" ? opt : opt.label;
        const colorHex = typeof opt === "string" ? opt.toLowerCase() : opt.hex;
        const disabled = isDisabled ? isDisabled(val) : false;
        const active = selected === val;
        return (
          <button key={val} disabled={disabled} onClick={() => onSelect && onSelect(val)}
            className={`transition-all flex items-center justify-center border ${isColorType ? "w-12 h-12 rounded-full p-[2px]" : "h-[50px] px-8 py-2 rounded-full text-lg"} ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"} ${active && isColorType ? "ring-4 ring-white scale-110 shadow-lg" : ""} ${active && !isColorType ? "bg-content text-black font-medium border-content" : "text-[#EBEBEB]/50"}`}
            title={val}>
            {isColorType ? <div className="w-full h-full rounded-full" style={{ backgroundColor: colorHex }} /> : val}
          </button>
        );
      })}
    </div>
  </div>
);

const ConfigColumn = ({ id, label, options = [], selected, onSelect, isDisabled, isColorType, isCctType, isError }: any) => (
  <div id={id} className={`flex flex-col gap-4 rounded-xl transition-all ${isError ? "ring-2 ring-red-500 bg-red-500/5" : ""}`}>
    <span className="text-[#EBEBEB] text-body">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: any) => {
        const val = typeof opt === "string" ? opt : opt.label;
        const colorHex = typeof opt === "string" ? opt.toLowerCase() : (opt.hex || opt.color);
        const disabled = isDisabled ? isDisabled(val) : false;
        const active = selected === val;
        if (isCctType) {
          return (
            <button key={val} disabled={disabled} onClick={() => onSelect && onSelect(val)}
              className={`h-fit pl-4 pr-1 rounded-full border transition-all flex items-center gap-3 ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"} ${active ? "bg-content border-content text-black" : "text-[#EBEBEB]"}`}
              title={val}>
              <span className={active ? "text-black font-medium" : "text-[#EBEBEB]"}>{val}</span>
              <div className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: colorHex }} />
            </button>
          );
        }
        return (
          <button key={val} disabled={disabled} onClick={() => onSelect && onSelect(val)}
            className={` transition-all py-1 flex items-center justify-center border ${isColorType ? "w-8 h-8 rounded-full p-[3px]" : "px-6 rounded-full text-md"} ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"} ${active && isColorType ? "ring-2 ring-white scale-110 shadow-lg" : ""} ${active && !isColorType ? "bg-content border-content" : ""}`}
            title={val}>
            {isColorType
              ? <div className="w-full h-full rounded-full" style={{ backgroundColor: colorHex }} />
              : <span className={active ? "text-black font-medium" : "text-[#EBEBEB]/50"}>{val}</span>}
          </button>
        );
      })}
    </div>
  </div>
);