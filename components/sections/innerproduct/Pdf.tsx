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

// Fetches image bytes ourselves and loads them into an <img> via a same-origin
// blob: URL, rather than pointing <img> straight at the remote URL. Product/logo
// images on this page are also rendered elsewhere as plain <img>/next/image
// (no crossOrigin) — if the browser has already cached a non-CORS response for
// that exact URL, a later `Image` with crossOrigin="anonymous" can silently
// reuse it and taint the canvas, making toDataURL() throw. A blob: URL never
// crosses an origin boundary at the canvas layer, so it can't be tainted.
//
// `cache: "no-store"` is required too, not just belt-and-braces: R2's public
// URLs don't send `Vary: Origin`, so a plain <img> load done earlier on the
// same page (no CORS request) can leave a cached response the browser then
// incorrectly reuses for this CORS `fetch()`, which fails with a CORS error
// even though the server would've answered a fresh request correctly.
const loadImageViaBlob = async (url: string): Promise<HTMLImageElement> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch image (${res.status}): ${url}`);
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to decode image"));
      img.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

// Helper to convert an image URL or source path to Base64
export const getBase64FromUrl = async (url: string): Promise<string> => {
  const img = await loadImageViaBlob(url);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
};

// Crops a source rectangle out of an image URL and returns it as Base64 —
// used to pull just the (opaque, brand-orange) icon mark out of the site's
// primary logo asset, whose "LEDLUM" wordmark is white-on-transparent and
// only readable against the old copper header band, not a white datasheet.
const getCroppedBase64FromUrl = async (
  url: string,
  sx: number,
  sy: number,
  sw: number,
  sh: number
): Promise<string> => {
  const img = await loadImageViaBlob(url);
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  return canvas.toDataURL("image/png");
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

type ParamRow = [string, string];

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
  const margin = 12;

  const textDark: [number, number, number] = [20, 20, 20];
  const textGrey: [number, number, number] = [100, 100, 100];
  const lineGrey: [number, number, number] = [210, 210, 210];

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

  // ── 1. HEADER — icon mark + wordmark left, "PRODUCT DATASHEET" pill right, black divider ──
  // The site's logo asset is a white "LEDLUM" wordmark meant for the old
  // copper header band, invisible on this design's white background — so
  // only the opaque orange icon mark is pulled from it, and "LEDLUM" /
  // "BEYOND BRIGHT" are drawn as real dark text instead.
  let wordmarkX = margin;
  try {
    const iconBase64 = await getCroppedBase64FromUrl(
      cdnImg("/images/logo/LEDLUM - Logo.webp"), 0, 0, 130, 136
    );
    const iconW = 10;
    const iconH = 10.5;
    doc.addImage(iconBase64, 'PNG', margin, 7, iconW, iconH);
    wordmarkX = margin + iconW + 3;
  } catch (e) {
    console.warn("Logo icon failed to load", e);
  }
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFont(fontName, "bold");
  doc.setFontSize(15);
  doc.text("LEDLUM", wordmarkX, 14.5);
  doc.setFont(fontName, "normal");
  doc.setFontSize(6);
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("B E Y O N D   B R I G H T", wordmarkX, 18.5);

  doc.setFont(fontName, "bold");
  doc.setFontSize(10);
  const pillLabel = "PRODUCT DATASHEET";
  const pillTextWidth = doc.getTextWidth(pillLabel);
  const pillW = pillTextWidth + 16;
  const pillH = 10;
  const pillX = pageWidth - margin - pillW;
  const pillY = 8;
  doc.setFillColor(0, 0, 0);
  doc.roundedRect(pillX, pillY, pillW, pillH, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(pillLabel, pillX + pillW / 2, pillY + pillH / 2 + 1, { align: "center" });

  doc.setFillColor(0, 0, 0);
  doc.rect(0, 26, pageWidth, 1, 'F');

  // ── 2. DESCRIPTION — bullets left, product photo + model number right ──
  const descHeadingY = 38;
  doc.setFont(fontName, "bold");
  doc.setFontSize(12);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text("Description", margin, descHeadingY);

  let leftY = descHeadingY + 8;
  doc.setFont(fontName, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  const descColWidth = 108;
  finalDescription.forEach((item) => {
    const wrapped = doc.splitTextToSize(`•  ${item}`, descColWidth);
    doc.text(wrapped, margin, leftY);
    leftY += wrapped.length * 4 + 3;
  });

  const imgBoxX = margin + descColWidth + 12;
  const imgBoxW = pageWidth - margin - imgBoxX;
  const imgBoxY = 34;
  const imgBoxH = 62;
  doc.setFillColor(245, 245, 245);
  doc.rect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 'F');
  try {
    const productImg = await getBase64FromUrl(
      imageUrl || `https://placehold.co/400x400/EEE/31343C?text=${activeId}`
    );
    const pad = 5;
    doc.addImage(productImg, 'PNG', imgBoxX + pad, imgBoxY + pad, imgBoxW - pad * 2, imgBoxH - pad * 2);
  } catch (e) {
    console.warn("Product image failed to load", e);
  }
  doc.setFont(fontName, "bold");
  doc.setFontSize(13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(activeId, imgBoxX + imgBoxW / 2, imgBoxY + imgBoxH + 9, { align: "center" });
  const rightY = imgBoxY + imgBoxH + 15;

  // ── 3. Divider ──
  let sectionY = Math.max(leftY, rightY) + 4;
  doc.setDrawColor(lineGrey[0], lineGrey[1], lineGrey[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, sectionY, pageWidth - margin, sectionY);
  sectionY += 10;

  // ── 4. General Parameters / Technical Parameters (two columns) ──
  const generalRows: ParamRow[] = [
    ["Model", activeId],
    ["Dimension", selections.dimensions || "N/A"],
    ["Cutout Size", cutout || "N/A"],
    ["Body Colour", selections.bodyColor || "Standard"],
    ["LED Chip", selections.ledChip || "N/A"],
    ["IP Rating", ipRating],
  ];

  const technicalRows: ParamRow[] = [
    ["Wattage", selections.watts || "N/A"],
    ["Luminous Flux", selections.luminous || "N/A"],
    ["Beam Angle", selections.beamAngles || "N/A"],
    ["CRI", selections.cri || "≥80"],
    ["CCT", selections.cct || "N/A"],
    ["Voltage", selections.voltage || "220 - 230V AC"],
  ];
  Object.entries(extraSpecs).forEach(([label, value]) => technicalRows.push([label, value]));
  technicalRows.push(["Warranty", "5 Years"]);

  const leftColX = margin;
  const rightColX = 110;
  const colWidth = 88;
  const colonOffset = 34;
  const valueOffset = 40;

  doc.setFont(fontName, "bold");
  doc.setFontSize(11);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text("General Parameters", leftColX, sectionY);
  doc.text("Technical Parameters", rightColX, sectionY);

  const drawParamRow = (x: number, y: number, [label, value]: ParamRow) => {
    doc.setFont(fontName, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
    doc.text(label, x, y);
    doc.text(":", x + colonOffset, y);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const wrapped = doc.splitTextToSize(String(value), colWidth - valueOffset);
    doc.text(wrapped, x + valueOffset, y);
    return wrapped.length;
  };

  let leftRowY = sectionY + 8;
  generalRows.forEach((row) => {
    const lines = drawParamRow(leftColX, leftRowY, row);
    leftRowY += Math.max(lines, 1) * 4 + 3.5;
  });

  let rightRowY = sectionY + 8;
  technicalRows.forEach((row) => {
    const lines = drawParamRow(rightColX, rightRowY, row);
    rightRowY += Math.max(lines, 1) * 4 + 3.5;
  });

  // ── 5. Divider + Notes ──
  let notesY = Math.max(leftRowY, rightRowY) + 4;
  doc.setDrawColor(lineGrey[0], lineGrey[1], lineGrey[2]);
  doc.line(margin, notesY, pageWidth - margin, notesY);
  notesY += 8;

  doc.setFont(fontName, "bold");
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text("Note:-", margin, notesY);
  notesY += 5.5;

  doc.setFont(fontName, "normal");
  doc.setFontSize(8);
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  finalNotes.forEach((note) => {
    const wrapped = doc.splitTextToSize(`•  ${note}`, pageWidth - margin * 2);
    doc.text(wrapped, margin, notesY);
    notesY += wrapped.length * 3.8 + 2;
  });

  // ── 6. FOOTER ──
  doc.setFillColor(0, 0, 0);
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont(fontName, "normal");
  doc.setFontSize(8);
  doc.text("LEDLUM Lighting Pvt. Ltd.", margin, pageHeight - 5);
  doc.setFont(fontName, "bold");
  doc.text("www.ledlumlighting.com", pageWidth - margin, pageHeight - 5, { align: "right" });

  doc.save(`${activeId}-Datasheet.pdf`);
};
