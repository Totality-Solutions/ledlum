"use client";
import jsPDF from "jspdf";
import { cdnImg } from "@/lib/cdn"; 

interface PdfFileProps {
  selections: any;
  activeId: string;
  ipRating: string;
  cutout: string;
  description?: string[];
  notes?: string[];
  extraSpecs?: Record<string, string>;
  imageUrl?: string;
}

// Helper to convert an image URL or source path to Base64
export const getBase64FromUrl = (url: string): Promise<string> => {
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

// Helper to fetch custom TTF fonts cleanly from GitHub source to prevent unicode cmap errors
const fetchFontAsBinaryString = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary); // Returns base64 string readable by jsPDF
};

export const PdfFile = async ({
  selections,
  activeId,
  ipRating,
  cutout,
  description = [],
  notes = [],
  extraSpecs = {},
  imageUrl,
}: PdfFileProps) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Brand copper color #a03522 (--primary-copper) converted to RGB
  const brandCopper: [number, number, number] = [160, 53, 34];
  const textGrey: [number, number, number] = [100, 100, 100];

  // Load and add custom un-subsetted Poppins Fonts dynamically to resolve cmap error
  try {
    const poppinsRegularBase64 = await fetchFontAsBinaryString(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Regular.ttf"
    );
    const poppinsBoldBase64 = await fetchFontAsBinaryString(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf"
    );

    doc.addFileToVFS("Poppins-Normal.ttf", poppinsRegularBase64);
    doc.addFileToVFS("Poppins-Bold.ttf", poppinsBoldBase64);

    doc.addFont("Poppins-Normal.ttf", "Poppins", "normal");
    doc.addFont("Poppins-Bold.ttf", "Poppins", "bold");
  } catch (error) {
    console.error("Failed to load custom Poppins font assets, falling back to basic system fonts.", error);
  }

  // Set default global font family context
  const fontName = doc.getFontList()["Poppins"] ? "Poppins" : "helvetica";

  // Fallback defaults matching the image data if arrays are passed empty
  const finalDescription = description.length > 0 ? description : [
    "Designed for flexibility and performance, this high-quality LED strip light offers seamless illumination for modern lighting applications. With a power consumption of 11W and an output of 600 lumens per meter, it delivers efficient and uniform brightness ideal for both decorative and functional use.",
    "Featuring 120 LEDs per meter, the strip ensures smooth, dot-free lighting with excellent consistency. The 3000K warm white color temperature creates a soft and inviting ambiance, perfect for residential, commercial, and architectural environments.",
    "Built with a compact 10x10mm profile and a 5mm PCB, this strip is highly adaptable for various installations, including coves, profiles, and custom designs. Its IP67 rating provides strong protection against dust and water, making it suitable for both indoor and outdoor applications."
  ];

  const finalNotes = notes.length > 0 ? notes : [
    "All dimensions are in millimeters (mm) and are subject to change without prior notice.",
    "Technical parameters are measured under standard test conditions.",
    "Electrical and optical tolerances of the fixture are within ±10%.",
    "Color temperature (CCT) tolerance is ±200K"
  ];

  // 1. TOP HEADER Banner
  doc.setFillColor(brandCopper[0], brandCopper[1], brandCopper[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');
  
  // Embedded Logo image inside the banner header
  try {
    const logoBase64 = await getBase64FromUrl(cdnImg("/images/logo/LEDLUM - Logo.webp"));
    doc.addImage(logoBase64, 'PNG', 12, 6, 38, 10); 
  } catch (e) { 
    doc.setTextColor(255, 255, 255);
    doc.setFont(fontName, "bold");
    doc.setFontSize(16);
    doc.text("LEDLUM LIGHTS", 12, 12); 
  }

  // Header Context Subtitles
  doc.setTextColor(255, 255, 255);
  doc.setFont(fontName, "normal");
  doc.setFontSize(8);
  doc.text(`SPECIFICATION SHEET — ${activeId}`, 12, 21);
  
  doc.setFontSize(11);
  doc.text("Recessed Downlight", pageWidth - 15, 12, { align: "right" });
  doc.setFontSize(8);
  doc.text(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), pageWidth - 15, 21, { align: "right" });

  // LEFT COLUMN - Product Image
  const leftColX = 12;
  doc.setFillColor(240, 240, 240);
  doc.rect(leftColX, 35, 75, 75, 'F');
  try {
    const productImg = await getBase64FromUrl(
      imageUrl || `https://placehold.co/400x400/EEE/31343C?text=${activeId}`
    );
    doc.addImage(productImg, 'PNG', leftColX + 5, 40, 65, 65);
  } catch (e) {
    console.warn("Product image failed to load, falling back to placeholder", e);
    try {
      const fallbackImg = await getBase64FromUrl(`https://placehold.co/400x400/EEE/31343C?text=${activeId}`);
      doc.addImage(fallbackImg, 'PNG', leftColX + 5, 40, 65, 65);
    } catch (e2) { console.warn("Placeholder image also failed to load"); }
  }

  // Photometric Diagram
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.setFont(fontName, "normal");
  doc.setFontSize(9);
  doc.text("Photometric Diagram", leftColX, 120);
  doc.setDrawColor(220, 220, 220);
  doc.rect(leftColX, 123, 75, 50);
  try {
    const photoBase = await getBase64FromUrl(cdnImg("/images/products/Light-angle.png"));
    doc.addImage(photoBase, 'PNG', leftColX + 5, 128, 65, 40);
  } catch (e) { console.warn("Photometric image failed to load"); }

  doc.text("Selected Finish", leftColX, 185);
  doc.setFillColor(0, 0, 0); 
  doc.circle(leftColX + 3, 193, 3, 'F');
  doc.setTextColor(0, 0, 0);
  doc.text(selections.bodyColor || "Standard", leftColX + 10, 194);
  
  const leftColumnBottomY = 198;

  // RIGHT COLUMN - Content
  const rightColX = 100;
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("LED COB — Recessed Downlight", rightColX, 40);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(24); 
  doc.setFont(fontName, "bold");
  doc.text(activeId, rightColX, 52);
  doc.setFontSize(9.5);
  doc.setFont(fontName, "normal");
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("Adjustable Beam Technical Lighting", rightColX, 60);

  // Description block right under product headings
  let currentY = 66;

  if (finalDescription.length > 0) {
    doc.setFont(fontName, "bold");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text("Description", rightColX, currentY);
    currentY += 5;

    doc.setFont(fontName, "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);

    finalDescription.forEach((item) => {
      const wrapped = doc.splitTextToSize(`• ${item}`, 98);
      doc.text(wrapped, rightColX, currentY);
      currentY += (wrapped.length * 3.5) + 2;
    });
  }

  // Summary Bar
  currentY += 2;
  doc.setFillColor(brandCopper[0], brandCopper[1], brandCopper[2]);
  doc.rect(rightColX, currentY, 98, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  const summaryText = `${selections.watts || "11W"} – ${selections.luminous || "600lm/m"} – ${selections.beamAngles || "Top Bending"} – CRI${selections.cri || "80"} – ${ipRating}`;
  doc.text(summaryText, rightColX + 3, currentY + 6);

  // Full Technical Table Header
  doc.setFontSize(9);
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("Full Technical Specifications", rightColX, currentY + 16);
  doc.setDrawColor(220, 220, 220);
  doc.line(rightColX, currentY + 19, pageWidth - 12, currentY + 19);

  // Technical Specification Data Array
  let tableY = currentY + 25;
  const tableData: [string, string][] = [
    ["Wattage", selections.watts || "11W"],
    ["Lumens", selections.luminous || "600lm/m"],
    ["CRI", `CRI ${selections.cri || "80"}`],
    ["CCT", selections.cct || "3000 K"],
    ["Beam Angle", selections.beamAngles || "Top Bending"],
    ["Selected Finish", selections.bodyColor || "Standard"],
    ["Cutout Size", cutout || "5CM"],
    ["IP Rating", ipRating],
    ["LED Chip", selections.ledChip || "120 LED/Mtr"],
  ];

  // Product-line-specific specs (e.g. Klewe's Charging Time, Vision Series' Protocol)
  Object.entries(extraSpecs).forEach(([label, value]) => {
    tableData.push([label, value]);
  });

  tableData.push(["Warranty", "5 Years"]);

  tableData.forEach((item, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 248, 248);
      doc.rect(rightColX, tableY - 4.5, 98, 7, 'F');
    }
    doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
    doc.setFont(fontName, "normal");
    doc.text(String(item[0]), rightColX + 2, tableY);
    doc.setTextColor(0, 0, 0);
    doc.setFont(fontName, "bold");
    doc.text(String(item[1]), pageWidth - 15, tableY, { align: "right" });
    tableY += 7;
  });

  const rightColumnBottomY = tableY;

  // Notes block placed right under both columns dynamically
  if (finalNotes.length > 0) {
    let notesY = Math.max(leftColumnBottomY, rightColumnBottomY) + 12;

    doc.setFont(fontName, "bold");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text("Note:-", 12, notesY);

    notesY += 5;
    doc.setFont(fontName, "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);

    finalNotes.forEach((note) => {
      const wrapped = doc.splitTextToSize(`• ${note}`, 180);
      doc.text(wrapped, 12, notesY);
      notesY += (wrapped.length * 3.5) + 1.5;
    });
  }

  // FOOTER
  doc.setFillColor(brandCopper[0], brandCopper[1], brandCopper[2]);
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text("LEDLUM Lighting Pvt. Ltd.", 12, pageHeight - 5);
  doc.text("ledlumlights.com", pageWidth - 12, pageHeight - 5, { align: "right" });

  doc.save(`${activeId}-Specification.pdf`);
};