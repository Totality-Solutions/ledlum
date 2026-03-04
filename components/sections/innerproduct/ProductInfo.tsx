// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Section from "@/components/layout/Section";
// import { jsPDF } from "jspdf";

// interface ProductInfoProps {
//   config: any;
//   activeId: string;
//   onModelChange: (id: string) => void;
//   allModelIds: string[];
//   permutations: any[]; 
// }

// export default function ProductInfoSection({ config, activeId, onModelChange, allModelIds, permutations = [] }: ProductInfoProps) {
//   const [selections, setSelections] = useState<Record<string, string>>({});
//   const [error, setError] = useState("");
//   const [touched, setTouched] = useState<string[]>([]);

//   useEffect(() => {
//     setSelections({});
//     setError("");
//     setTouched([]);
//   }, [activeId]);

//   const requiredFields = [
//     "voltage",
//     "dimensions",
//     "watts",
//     "cct",
//     "bodyColor",
//     "beamAngles",
//     "ledChip",
//     "luminous",
//     "cri"
//   ];

//   const checkIsDisabled = (category: string, value: string): boolean => {
//     if (!permutations || permutations.length === 0) return false;

//     return !permutations.some((p: any) => {
//       if (p[category] !== value) return false;

//       return Object.entries(selections).every(([key, selectedVal]) => {
//         if (!selectedVal || key === category) return true;
//         if (!(key in p)) return true; 
//         return p[key] === selectedVal;
//       });
//     });
//   };

//   const handleSelect = (category: string, value: string) => {
//     setError("");

//     setSelections((prev) => {
//       if (prev[category] === value) {
//         const newState = { ...prev };
//         delete newState[category];
//         return newState;
//       }
//       return { ...prev, [category]: value };
//     });

//     setTouched((prev) => prev.filter((f) => f !== category));
//   };

//   const handleDownload = () => {

//     const missing = requiredFields.filter(field => !selections[field]);

//     if (missing.length > 0) {
//       setTouched(missing);
//       setError(`Please select: ${missing.join(", ")}`);
//       return;
//     }

//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Product Configuration Tech Pack", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Product ID: ${activeId}`, 20, 40);

//     let y = 60;

//     Object.entries(selections).forEach(([key, value]) => {
//       doc.text(`${key.toUpperCase()} : ${value}`, 20, y);
//       y += 10;
//     });

//     doc.save(`${activeId}-tech-pack.pdf`);
//   };

//   const resetAll = () => {
//     setSelections({});
//     setError("");
//     setTouched([]);
//   };

//   const hasSelection = Object.keys(selections).length > 0;

//   return (
//     <Section className="w-full bg-black md:px-[50px] font-pop">
//       <div className="max-w-[1420px] mx-auto">

//         <h1 className="text-white text-4xl font-medium mb-12">Product Configuration</h1>
        
// <div className="mb-10">
//   <p className="text-[#acacac] text-2xl font-normal tracking-wide mb-4">Model Spectrum :</p>
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//     {allModelIds.map((id) => {
//       const isActive = activeId.toLowerCase() === id.toLowerCase();
//       return (
//         <div 
//           key={id} 
//           onClick={() => onModelChange(id)}
//           className={`h-[86px] flex items-center px-6 rounded-[12px] cursor-pointer transition-all border ${
//             isActive 
//               ? "bg-white border-white" 
//               : "bg-transparent border-white/10 hover:border-white/30"
//           }`}
//         >

//           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
//             isActive ? "border-[#4A61AD]" : "border-white/20"
//           }`}>
//             {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#4A61AD]" />}
//           </div>

//           <span className={`text-lg font-normal uppercase flex-1 ${isActive ? "text-black" : "text-[#888888]"}`}>
//             {id}
//           </span>

//           <div className={`h-10 w-[1px] mx-4 ${isActive ? "bg-black/10" : "bg-white/10"}`} />

//           <div className="relative w-12 h-12">
//              <Image 
//                src={`https://placehold.co/100x100?text=${id}`}
//                alt={id} 
//                fill 
//                unoptimized 
//                className="object-contain" 
//              />
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </div>

//         <div className="flex flex-col border-t border-white/10">
          
//           <div className="mt-10 mb-2">
//             <h3 className="text-[#acacac] text-2xl font-normal tracking-wide">
//               Core Configuration
//             </h3>
//           </div>

//           <ConfigRow 
//             label="Voltage :" 
//             options={config.voltage || []} 
//             selected={selections.voltage}
//             onSelect={(val: string) => handleSelect("voltage", val)}
//             isDisabled={(val: string) => checkIsDisabled("voltage", val)}
//             isError={touched.includes("voltage")}
//           />

//           <ConfigRow 
//             label="Dimensions :" 
//             options={config.dimensions || []} 
//             selected={selections.dimensions}
//             onSelect={(val: string) => handleSelect("dimensions", val)}
//             isDisabled={(val: string) => checkIsDisabled("dimensions", val)}
//             isError={touched.includes("dimensions")}
//           />

//           <ConfigRow 
//             label="Watts :" 
//             options={config.watts || []} 
//             selected={selections.watts}
//             onSelect={(val: string) => handleSelect("watts", val)}
//             isDisabled={(val: string) => checkIsDisabled("watts", val)}
//             isError={touched.includes("watts")}
//           />

//           <div className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 ${touched.includes("cct") ? "border-red-500" : "border-white/10"}`}>
//             <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg">CCT :</span>
//             <div className="flex flex-wrap gap-3">
//               {(config.cct || []).map((item: any, idx: number) => {
//                 const disabled = checkIsDisabled("cct", item.label);
//                 const active = selections.cct === item.label;
//                 return (
//                   <button 
//                     key={idx} 
//                     disabled={disabled}
//                     onClick={() => handleSelect("cct", item.label)}
//                     className={`h-[50px] pl-6 pr-2 py-2 rounded-full border transition-all flex items-center gap-4 
//                     ${disabled ? "opacity-30 cursor-not-allowed grayscale pointer-events-none border-white/5" : "cursor-pointer"}
//                     ${active ? "bg-[#DBDCDD] border-[#DBDCDD]" : "border-white/20 hover:border-white"}`}
//                   >
//                     <span className={active ? "text-black font-medium" : "text-[#EBEBEB]"}>{item.label}</span>
//                     <div className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="mt-14 mb-4">
//             <h3 className="text-[#acacac] text-2xl font-normal tracking-wide">
//               Technical Specifications & Finish
//             </h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-white/10">
//             <ConfigColumn 
//               label="Body Color :" 
//               options={config.bodyColors || []} 
//               selected={selections.bodyColor}
//               onSelect={(val: string) => handleSelect("bodyColor", val)}
//               isDisabled={(val: string) => checkIsDisabled("bodyColor", val)}
//               isColorType={true}
//               isError={touched.includes("bodyColor")}
//             />

//             <ConfigColumn 
//               label="Beam Angle :" 
//               options={config.beamAngles || []} 
//               selected={selections.beamAngles}
//               onSelect={(val: string) => handleSelect("beamAngles", val)}
//               isDisabled={(val: string) => checkIsDisabled("beamAngles", val)}
//               isError={touched.includes("beamAngles")}
//             />

//             <ConfigColumn label="IP Rating :" options={config.ipRating || []} selected={config.ipRating?.[0]} />
//             <ConfigColumn label="Cutout Size :" options={config.cutoutSizes || []} selected={config.cutoutSizes?.[0]} />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-white/10">
//             <ConfigColumn 
//               label="LED Chip :" 
//               options={config.ledChip || []} 
//               selected={selections.ledChip}
//               onSelect={(val: string) => handleSelect("ledChip", val)}
//               isDisabled={(val: string) => checkIsDisabled("ledChip", val)}
//               isError={touched.includes("ledChip")}
//             />

//             <ConfigColumn 
//               label="Luminous :" 
//               options={config.luminous || []} 
//               selected={selections.luminous}
//               onSelect={(val: string) => handleSelect("luminous", val)}
//               isDisabled={(val: string) => checkIsDisabled("luminous", val)}
//               isError={touched.includes("luminous")}
//             />

//             <ConfigColumn 
//               label="CRI :" 
//               options={config.cri || []} 
//               selected={selections.cri}
//               onSelect={(val: string) => handleSelect("cri", val)}
//               isDisabled={(val: string) => checkIsDisabled("cri", val)}
//               isError={touched.includes("cri")}
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 mt-6">{error}</p>
//           )}

//         </div>

//         <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex flex-col gap-1">
//             <p className="text-white/40 text-sm font-light italic uppercase tracking-tighter">
//               Product ID: {activeId}
//             </p>
//             <p className="text-[#96865D] text-lg font-medium uppercase">
//               {selections.watts || "---"} / {selections.luminous || "---"} / {selections.cri ? `CRI${selections.cri}` : "---"} / {selections.cct || "---"} 
//             </p>
//           </div>
          
//           <div className="flex gap-4">
//             <button 
//               onClick={resetAll}
//               className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-all"
//             >
//               Reset Selection
//             </button>
//             <button 
//               onClick={handleDownload}
//               className="px-10 py-4 rounded-full transition-all font-medium bg-[#96865D] text-white hover:bg-[#85764d]"
//             >
//               Download Tech Pack
//             </button>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

// const ConfigRow = ({ label, options, selected, onSelect, isDisabled, isError }: any) => (
//   <div className={`py-5 border-b flex flex-col lg:flex-row lg:items-center gap-6 ${isError ? "border-red-500" : "border-white/10"}`}>
//     <span className="w-full lg:w-[300px] text-[#EBEBEB] text-lg font-normal">{label}</span>
//     <div className="flex flex-wrap gap-3">
//       {options.map((opt: string) => {
//         const disabled = isDisabled(opt);
//         const active = selected === opt;
//         return (
//           <button 
//             key={opt} 
//             disabled={disabled}
//             onClick={() => onSelect(opt)}
//             className={`h-[50px] px-8 py-2 rounded-full border transition-all flex items-center text-lg
//               ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer border-white/20 hover:border-white"}
//               ${active ? "bg-[#DBDCDD] text-black font-medium border-[#DBDCDD]" : "text-[#EBEBEB]/50"}
//             `}
//           >
//             {opt}
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );

// const ConfigColumn = ({ label, options = [], selected, onSelect, isDisabled, isColorType, isError }: any) => (
//   <div className={`flex flex-col gap-4 ${isError ? "border border-red-500 p-3 rounded-xl" : ""}`}>
//     <span className="text-[#EBEBEB] text-lg">{label}</span>
//     <div className="flex flex-wrap gap-2">
//       {options.map((opt: any) => {
//         const val = typeof opt === 'string' ? opt : opt.label;
//         const colorHex = typeof opt === 'string' ? opt.toLowerCase() : opt.hex;
//         const disabled = isDisabled ? isDisabled(val) : false;
//         const active = selected === val;

//         return (
//           <button 
//             key={val} 
//             disabled={disabled}
//             onClick={() => onSelect && onSelect(val)}
//             className={`h-[45px] transition-all flex items-center justify-center border
//               ${isColorType ? "w-12 rounded-full p-[2px]" : "px-6 rounded-full text-md"}
//               ${disabled ? "opacity-30 cursor-not-allowed grayscale border-white/5" : "cursor-pointer"}
//               ${active && isColorType ? "border-white border-4 scale-110" : "border-white/20 hover:border-white"}
//               ${active && !isColorType ? "bg-[#DBDCDD] border-[#DBDCDD]" : ""}
//             `}
//             title={val}
//           >
//             {isColorType ? (
//                 <div 
//                   className="w-full h-full rounded-full" 
//                   style={{ backgroundColor: colorHex }} 
//                 />
//             ) : (
//                 <span className={active ? "text-black font-medium" : "text-[#EBEBEB]/50"}>{val}</span>
//             )}
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );






"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Section from "@/components/layout/Section";
import { jsPDF } from "jspdf";

// Local Assets - Ensure these exist in your public/images/product/ folder
import photometricLocal from "@/public/images/product/Light-angle.png"; 

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
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setSelections({});
    setError("");
    setTouched([]);
  }, [activeId]);

  // --- UTILITY: IMAGE TO BASE64 ---
  const getBase64FromUrl = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.setAttribute("crossOrigin", "anonymous"); 
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
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

  const checkIsDisabled = (category: string, value: string): boolean => {
    if (!permutations || permutations.length === 0) return false;
    return !permutations.some((p: any) => {
      if (p[category] !== value) return false;
      return Object.entries(selections).every(([key, selectedVal]) => {
        if (!selectedVal || key === category) return true;
        return p[key] === selectedVal;
      });
    });
  };

  // --- EXACT UI PDF GENERATION ---
  const handleDownload = async () => {
    const requiredFields = ["voltage", "dimensions", "watts", "cct", "bodyColor", "beamAngles", "ledChip", "luminous", "cri"];
    const missing = requiredFields.filter(field => !selections[field]);
    if (missing.length > 0) {
      setTouched(missing);
      setError(`Please select: ${missing.join(", ")}`);
      return;
    }

    setIsDownloading(true);
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      const navy: [number, number, number] = [28, 28, 85];
      const textGrey: [number, number, number] = [100, 100, 100];

      // 1. TOP HEADER (NAVY)
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, 0, pageWidth, 28, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("LEDLUM LIGHTS", 12, 12);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`SPECIFICATION SHEET — ${activeId}`, 12, 19);
      
      doc.setFontSize(11);
      doc.text("Recessed Downlight", pageWidth - 15, 12, { align: "right" });
      doc.setFontSize(8);
      doc.text(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), pageWidth - 15, 19, { align: "right" });

      // --- LEFT COLUMN ---
      const leftColX = 12;
      doc.setFillColor(230, 230, 230);
      doc.rect(leftColX, 35, 75, 75, 'F');
      try {
        const productImg = await getBase64FromUrl(`https://placehold.co/400x400/EEE/31343C?text=${activeId}`);
        doc.addImage(productImg, 'PNG', leftColX + 5, 40, 65, 65);
      } catch (e) {}

      doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
      doc.setFontSize(9);
      doc.text("Photometric Diagram", leftColX, 120);
      doc.setDrawColor(220, 220, 220);
      doc.rect(leftColX, 123, 75, 50);
      try {
        const photoBase = await getBase64FromUrl(photometricLocal.src);
        doc.addImage(photoBase, 'PNG', leftColX + 5, 128, 65, 40);
      } catch (e) {}

      doc.text("Selected Finish", leftColX, 185);
      doc.setFillColor(0, 0, 0); 
      doc.circle(leftColX + 3, 193, 3, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text(selections.bodyColor || "Matte Black", leftColX + 10, 194);

      // --- RIGHT COLUMN ---
      const rightColX = 100;
      doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
      doc.text("Led Cob — Surface downlight", rightColX, 40);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text(activeId, rightColX, 52);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
      doc.text("Surface Downlight, Adjustable Beam", rightColX, 60);

      // Navy Summary Bar
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(rightColX, 68, 98, 9, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      const summaryText = `${selections.watts} – ${selections.luminous} – ${selections.beamAngles} – CRI >${selections.cri} – IP20 – ${selections.cct}`;
      doc.text(summaryText, rightColX + 3, 74);

      // Quick Specs Grid
      doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
      let specY = 90;
      const quickSpecs = [
        ["Wattage", selections.watts, "CRI", `>${selections.cri}`],
        ["Lumens", selections.luminous, "Beam", selections.beamAngles],
        ["CCT", selections.cct, "IP Rating", "IP20"]
      ];

      quickSpecs.forEach(row => {
        doc.setFont("helvetica", "normal");
        doc.text(row[0], rightColX + 5, specY);
        doc.text(row[2], rightColX + 50, specY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(row[1], rightColX + 40, specY, { align: "right" });
        doc.text(row[3], rightColX + 85, specY, { align: "right" });
        doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
        specY += 7;
      });

      // Full Technical Table
      doc.setFontSize(9);
      doc.text("Full Technical Specifications", rightColX, 120);
      doc.setDrawColor(220, 220, 220);
      doc.line(rightColX, 123, pageWidth - 12, 123);

      let tableY = 130;
      const tableData = [
        ["Wattage", selections.watts],
        ["Lumens", selections.luminous],
        ["CRI", `>${selections.cri}`],
        ["CCT", selections.cct],
        ["Beam Angle", selections.beamAngles],
        ["IP Rating", "IP20"],
        ["Lifespan", "50,000 hours"],
        ["Warranty", "5 Years"]
      ];

      tableData.forEach((item, i) => {
        if (i % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(rightColX, tableY - 4.5, 98, 7, 'F');
        }
        doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
        doc.setFont("helvetica", "normal");
        doc.text(item[0], rightColX + 2, tableY);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(item[1], pageWidth - 15, tableY, { align: "right" });
        tableY += 7;
      });

      // FOOTER
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text("LEDLUM Lighting Pvt. Ltd.", 12, pageHeight - 5);
      doc.text("ledlumlights.com", pageWidth - 12, pageHeight - 5, { align: "right" });

      doc.save(`${activeId}-Specification.pdf`);
    } catch (err) {
      setError("PDF Generation failed.");
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
      <div className="max-w-[1420px] mx-auto text-white">
        <h1 className="text-4xl font-medium mb-12">Product Configuration</h1>
        
        {/* Model Selection */}
        <div className="mb-10">
          <p className="text-[#acacac] text-2xl mb-4">Model Spectrum :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allModelIds.map((id) => (
              <div key={id} onClick={() => onModelChange(id)} className={`h-[86px] flex items-center px-6 rounded-[12px] cursor-pointer transition-all border ${activeId === id ? "bg-white text-black border-white" : "bg-transparent border-white/10 text-[#888888]"}`}>
                <span className="text-lg uppercase flex-1 font-medium">{id}</span>
                <div className="relative w-12 h-12">
                   <Image src={`https://placehold.co/100x100?text=${id}`} alt={id} fill unoptimized className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Area */}
        <div className="flex flex-col border-t border-white/10">
          <ConfigRow label="Watts :" options={config.watts || []} selected={selections.watts} onSelect={(v: any) => handleSelect("watts", v)} isDisabled={(v: any) => checkIsDisabled("watts", v)} isError={touched.includes("watts")} />
          <ConfigRow label="Voltage :" options={config.voltage || []} selected={selections.voltage} onSelect={(v: any) => handleSelect("voltage", v)} isDisabled={(v: any) => checkIsDisabled("voltage", v)} isError={touched.includes("voltage")} />
          <ConfigRow label="Dimensions :" options={config.dimensions || []} selected={selections.dimensions} onSelect={(v: any) => handleSelect("dimensions", v)} isDisabled={(v: any) => checkIsDisabled("dimensions", v)} isError={touched.includes("dimensions")} />
          
          {/* CCT Row */}
          <div className={`py-5 border-b flex items-center gap-6 ${touched.includes("cct") ? "border-red-500" : "border-white/10"}`}>
            <span className="w-[300px] text-lg">CCT :</span>
            <div className="flex gap-3">
              {(config.cct || []).map((item: any, idx: number) => (
                <button key={idx} disabled={checkIsDisabled("cct", item.label)} onClick={() => handleSelect("cct", item.label)} className={`h-[50px] px-6 rounded-full border flex items-center gap-3 ${selections.cct === item.label ? "bg-white text-black" : "border-white/20 text-white/50"}`}>
                   <span>{item.label}</span>
                   <div className="w-6 h-6 rounded-full border border-black/10" style={{ backgroundColor: item.color }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 mb-4"><h3 className="text-[#acacac] text-2xl font-normal">Technical Specifications & Finish</h3></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-white/10">
            <ConfigColumn label="Body Color :" options={config.bodyColors || []} selected={selections.bodyColor} onSelect={(v: any) => handleSelect("bodyColor", v)} isDisabled={(v: any) => checkIsDisabled("bodyColor", v)} isColorType={true} isError={touched.includes("bodyColor")} />
            <ConfigColumn label="Beam Angle :" options={config.beamAngles || []} selected={selections.beamAngles} onSelect={(v: any) => handleSelect("beamAngles", v)} isDisabled={(v: any) => checkIsDisabled("beamAngles", v)} isError={touched.includes("beamAngles")} />
            <ConfigColumn label="IP Rating :" options={config.ipRating || []} selected={config.ipRating?.[0]} />
            <ConfigColumn label="Cutout Size :" options={config.cutoutSizes || []} selected={config.cutoutSizes?.[0]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-white/10">
            <ConfigColumn label="LED Chip :" options={config.ledChip || []} selected={selections.ledChip} onSelect={(v: any) => handleSelect("ledChip", v)} isDisabled={(v: any) => checkIsDisabled("ledChip", v)} isError={touched.includes("ledChip")} />
            <ConfigColumn label="Luminous :" options={config.luminous || []} selected={selections.luminous} onSelect={(v: any) => handleSelect("luminous", v)} isDisabled={(v: any) => checkIsDisabled("luminous", v)} isError={touched.includes("luminous")} />
            <ConfigColumn label="CRI :" options={config.cri || []} selected={selections.cri} onSelect={(v: any) => handleSelect("cri", v)} isDisabled={(v: any) => checkIsDisabled("cri", v)} isError={touched.includes("cri")} />
          </div>

          {error && <p className="text-red-500 mt-6">{error}</p>}
        </div>

        {/* Action Footer */}
        <div className="mt-12 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-white/40 text-sm uppercase">Product ID: {activeId}</p>
            <p className="text-[#96865D] text-lg font-medium">
              {selections.watts || "---"} / {selections.luminous || "---"} / {selections.cct || "---"}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={resetAll} className="text-white/60 hover:text-white underline underline-offset-4">Reset Selection</button>
            <button onClick={handleDownload} disabled={isDownloading} className="px-10 py-4 rounded-full bg-[#96865D] hover:bg-[#85764d] text-white font-medium transition-all">
              {isDownloading ? "Generating..." : "Download Tech Pack"}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- SUB-COMPONENTS ---
const ConfigRow = ({ label, options, selected, onSelect, isDisabled, isError }: any) => (
  <div className={`py-5 border-b flex items-center gap-6 ${isError ? "border-red-500" : "border-white/10"}`}>
    <span className="w-[300px] text-lg font-normal">{label}</span>
    <div className="flex flex-wrap gap-3">
      {options.map((opt: string) => (
        <button key={opt} disabled={isDisabled(opt)} onClick={() => onSelect(opt)} className={`h-[50px] px-8 py-2 rounded-full border transition-all ${selected === opt ? "bg-white text-black" : "border-white/20 text-white/50"} ${isDisabled(opt) ? "opacity-20" : ""}`}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const ConfigColumn = ({ label, options = [], selected, onSelect, isDisabled, isColorType, isError }: any) => (
  <div className={`flex flex-col gap-4 ${isError ? "border border-red-500 p-2 rounded-lg" : ""}`}>
    <span className="text-lg">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt: any) => {
        const val = typeof opt === 'string' ? opt : opt.label;
        const colorHex = typeof opt === 'string' ? opt.toLowerCase() : opt.hex;
        const active = selected === val;
        return (
          <button key={val} disabled={isDisabled?.(val)} onClick={() => onSelect?.(val)} className={`h-[45px] border flex items-center justify-center transition-all ${isColorType ? "w-12 rounded-full p-[2px]" : "px-6 rounded-full"} ${active ? "bg-white text-black border-white" : "border-white/20 text-white/50"}`}>
             {isColorType ? <div className="w-full h-full rounded-full" style={{ backgroundColor: colorHex }} /> : val}
          </button>
        );
      })}
    </div>
  </div>
);




