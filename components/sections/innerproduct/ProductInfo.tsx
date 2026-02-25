"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";

interface ProductInfoProps {
  config: any;
  activeId: string;
  onModelChange: (id: string) => void;
  allModelIds: string[];
  permutations: any[]; 
}

export default function ProductInfoSection({ config, activeId, onModelChange, allModelIds, permutations = [] }: ProductInfoProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    setSelections({});
  }, [activeId]);

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
    setSelections((prev) => {
      if (prev[category] === value) {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      }
      return { ...prev, [category]: value };
    });
  };

  // Logic: Enable download if at least one config is selected
  const hasSelection = Object.keys(selections).length > 0;

  return (
    <Section className="w-full bg-black md:px-[50px] font-pop">
      <div className="max-w-[1420px] mx-auto">

        <h1 className="text-white text-4xl font-medium mb-12">Product Configuration</h1>
        
{/* 1. Model Selection Grid */}
<div className="mb-10">
  <p className="text-[#acacac] text-2xl font-normal tracking-wide">Model Spectrum :</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {allModelIds.map((id) => {
      const isActive = activeId.toLowerCase() === id.toLowerCase();
      return (
        <div 
          key={id} 
          onClick={() => onModelChange(id)}
          className={`h-[86px] flex items-center px-6 rounded-[12px] cursor-pointer transition-all border ${
            isActive 
              ? "bg-white border-white" 
              : "bg-transparent border-white/10 hover:border-white/30"
          }`}
        >
          {/* Radio-style Circle */}
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
            isActive ? "border-[#4A61AD]" : "border-white/20"
          }`}>
            {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#4A61AD]" />}
          </div>

          {/* Model ID */}
          <span className={`text-lg font-normal uppercase flex-1 ${isActive ? "text-black" : "text-[#888888]"}`}>
            {id}
          </span>

          {/* Vertical Divider */}
          <div className={`h-10 w-[1px] mx-4 ${isActive ? "bg-black/10" : "bg-white/10"}`} />

          {/* Product Image */}
          <div className="relative w-12 h-12">
             <Image 
               src={`https://placehold.co/100x100?text=${id}`} // Apne path ke hisaab se change kar lena
               alt={id} 
               fill 
               unoptimized 
               className="object-contain" 
             />
          </div>
        </div>
      );
    })}
  </div>
</div>

        <div className="flex flex-col border-t border-white/10">
          
          {/* TOP SECTION HEADING */}
          <div className="mt-10 mb-2">
            <h3 className="text-[#acacac] text-2xl font-normal tracking-wide">
              Core Configuration
            </h3>
          </div>

          <ConfigRow 
            label="Voltage :" 
            options={config.voltage || []} 
            selected={selections.voltage}
            onSelect={(val: string) => handleSelect("voltage", val)}
            isDisabled={(val: string) => checkIsDisabled("voltage", val)}
          />

          <ConfigRow 
            label="Dimensions :" 
            options={config.dimensions || []} 
            selected={selections.dimensions}
            onSelect={(val: string) => handleSelect("dimensions", val)}
            isDisabled={(val: string) => checkIsDisabled("dimensions", val)}
          />

          <ConfigRow 
            label="Watts :" 
            options={config.watts || []} 
            selected={selections.watts}
            onSelect={(val: string) => handleSelect("watts", val)}
            isDisabled={(val: string) => checkIsDisabled("watts", val)}
          />

          {/* CCT Row */}
          <div className="py-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center gap-6">
            <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg">CCT :</span>
            <div className="flex flex-wrap gap-3">
              {(config.cct || []).map((item: any, idx: number) => {
                const disabled = checkIsDisabled("cct", item.label);
                const active = selections.cct === item.label;
                return (
                  <button 
                    key={idx} 
                    disabled={disabled}
                    onClick={() => handleSelect("cct", item.label)}
                    className={`h-[50px] pl-6 pr-2 py-2 rounded-full border transition-all flex items-center gap-4 
                    ${disabled ? "opacity-30 cursor-not-allowed grayscale pointer-events-none border-white/5" : "cursor-pointer"}
                    ${active ? "bg-[#DBDCDD] border-[#DBDCDD]" : "border-white/20 hover:border-white"}`}
                  >
                    <span className={active ? "text-black font-medium" : "text-[#EBEBEB]"}>{item.label}</span>
                    <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM SECTION HEADING */}
          <div className="mt-14 mb-4">
            <h3 className="text-[#acacac] text-2xl font-normal tracking-wide">
              Technical Specifications & Finish
            </h3>
          </div>

          {/* FIRST GRID: Physical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-white/10">
            <ConfigColumn 
              label="Body Color :" 
              options={config.bodyColors || []} 
              selected={selections.bodyColor}
              onSelect={(val: string) => handleSelect("bodyColor", val)}
              isDisabled={(val: string) => checkIsDisabled("bodyColor", val)}
              isColorType={true}
            />

            <ConfigColumn 
              label="Beam Angle :" 
              options={config.beamAngles || []} 
              selected={selections.beamAngles}
              onSelect={(val: string) => handleSelect("beamAngles", val)}
              isDisabled={(val: string) => checkIsDisabled("beamAngles", val)}
            />

            <ConfigColumn label="IP Rating :" options={config.ipRating || []} selected={config.ipRating?.[0]} />
            <ConfigColumn label="Cutout Size :" options={config.cutoutSizes || []} selected={config.cutoutSizes?.[0]} />
          </div>

          {/* SECOND GRID: Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-white/10">
            <ConfigColumn 
              label="LED Chip :" 
              options={config.ledChip || []} 
              selected={selections.ledChip}
              onSelect={(val: string) => handleSelect("ledChip", val)}
              isDisabled={(val: string) => checkIsDisabled("ledChip", val)}
            />

            <ConfigColumn 
              label="Luminous :" 
              options={config.luminous || []} 
              selected={selections.luminous}
              onSelect={(val: string) => handleSelect("luminous", val)}
              isDisabled={(val: string) => checkIsDisabled("luminous", val)}
            />

            <ConfigColumn 
              label="CRI :" 
              options={config.cri || []} 
              selected={selections.cri}
              onSelect={(val: string) => handleSelect("cri", val)}
              isDisabled={(val: string) => checkIsDisabled("cri", val)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-sm font-light italic uppercase tracking-tighter">
              Product ID: {activeId}
            </p>
            <p className="text-[#96865D] text-lg font-medium uppercase">
              {selections.watts || "---"} / {selections.luminous || "---"} / {selections.cri ? `CRI${selections.cri}` : "---"} / {selections.cct || "---"} 
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setSelections({})}
              className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-all"
            >
              Reset Selection
            </button>
            <button 
              disabled={!hasSelection}
              className={`px-10 py-4 rounded-full transition-all font-medium ${
                hasSelection 
                ? "bg-[#96865D] text-white hover:bg-[#85764d]" 
                : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"
              }`}
            >
              Download Tech Pack
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

const ConfigRow = ({ label, options, selected, onSelect, isDisabled }: any) => (
  <div className="py-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center gap-6">
    <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg font-normal">{label}</span>
    <div className="flex flex-wrap gap-3">
      {options.map((opt: string) => {
        const disabled = isDisabled(opt);
        const active = selected === opt;
        return (
          <button 
            key={opt} 
            disabled={disabled}
            onClick={() => onSelect(opt)}
            className={`h-[50px] px-8 py-2 rounded-full border transition-all flex items-center text-lg
              ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"}
              ${active ? "bg-[#DBDCDD] text-black font-medium border-[#DBDCDD]" : "text-[#EBEBEB]/50"}
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const ConfigColumn = ({ label, options = [], selected, onSelect, isDisabled, isColorType }: any) => (
  <div className="flex flex-col gap-4">
    <span className="text-[#EBEBEB] text-lg">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: any) => {
        const val = typeof opt === 'string' ? opt : opt.label;
        const colorHex = typeof opt === 'string' ? opt.toLowerCase() : opt.hex;
        const disabled = isDisabled ? isDisabled(val) : false;
        const active = selected === val;

        return (
          <button 
            key={val} 
            disabled={disabled}
            onClick={() => onSelect && onSelect(val)}
            className={`h-[45px] transition-all flex items-center justify-center border
              ${isColorType ? "w-12 rounded-full p-[2px]" : "px-6 rounded-full text-md"}
              ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer"}
              ${active && isColorType ? "border-white border-4 scale-110" : "border-white/20 hover:border-white"}
              ${active && !isColorType ? "bg-[#DBDCDD] border-[#DBDCDD]" : ""}
            `}
            title={val}
          >
            {isColorType ? (
                <div 
                  className="w-full h-full rounded-full" 
                  style={{ backgroundColor: colorHex }} 
                />
            ) : (
                <span className={active ? "text-black font-medium" : "text-[#EBEBEB]/50"}>{val}</span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);