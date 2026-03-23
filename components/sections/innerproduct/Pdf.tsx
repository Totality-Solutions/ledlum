"use client";
import  jsPDF  from "jspdf";
import photometricLocal from "@/public/images/product/Light-angle.png"; 

interface PdfFileProps {
  selections: any;
  activeId: string;
  ipRating: string;
  cutout: string;
}

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

export const PdfFile = async ({ selections, activeId, ipRating, cutout }: PdfFileProps) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const navy: [number, number, number] = [28, 28, 85];
  const textGrey: [number, number, number] = [100, 100, 100];

  // 1. TOP HEADER
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

  // LEFT COLUMN - Product Image
  const leftColX = 12;
  doc.setFillColor(240, 240, 240);
  doc.rect(leftColX, 35, 75, 75, 'F');
  try {
    const productImg = await getBase64FromUrl(`https://placehold.co/400x400/EEE/31343C?text=${activeId}`);
    doc.addImage(productImg, 'PNG', leftColX + 5, 40, 65, 65);
  } catch (e) { console.warn("Product image failed to load"); }

  // Photometric Diagram
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.setFontSize(9);
  doc.text("Photometric Diagram", leftColX, 120);
  doc.setDrawColor(220, 220, 220);
  doc.rect(leftColX, 123, 75, 50);
  try {
    const photoBase = await getBase64FromUrl(photometricLocal.src);
    doc.addImage(photoBase, 'PNG', leftColX + 5, 128, 65, 40);
  } catch (e) { console.warn("Photometric image failed to load"); }

  doc.text("Selected Finish", leftColX, 185);
  doc.setFillColor(0, 0, 0); 
  doc.circle(leftColX + 3, 193, 3, 'F');
  doc.setTextColor(0, 0, 0);
  doc.text(selections.bodyColor || "Standard", leftColX + 10, 194);

  // RIGHT COLUMN - Content
  const rightColX = 100;
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("LED COB — Recessed Downlight", rightColX, 40);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text(activeId, rightColX, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  doc.text("Adjustable Beam Technical Lighting", rightColX, 60);

  // Navy Summary Bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(rightColX, 68, 98, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  const summaryText = `${selections.watts} – ${selections.luminous} – ${selections.beamAngles} – CRI${selections.cri} – ${ipRating}`;
  doc.text(summaryText, rightColX + 3, 74);

  // Quick Specs Grid
  doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
  let specY = 90;
  const quickSpecs = [
    ["Wattage", selections.watts, "CRI", `CRI ${selections.cri}`],
    ["Lumens", selections.luminous, "Beam", selections.beamAngles],
    ["CCT", selections.cct, "IP Rating", ipRating]
  ];

  quickSpecs.forEach(row => {
    doc.setFont("helvetica", "normal");
    doc.text(row[0], rightColX + 5, specY);
    doc.text(row[2], rightColX + 50, specY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(String(row[1]), rightColX + 40, specY, { align: "right" });
    doc.text(String(row[3]), rightColX + 85, specY, { align: "right" });
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
    ["CRI", `CRI ${selections.cri}`],
    ["CCT", selections.cct],
    ["Beam Angle", selections.beamAngles],
    ["Cutout Size", cutout],
    ["IP Rating", ipRating],
    ["LED Chip", selections.ledChip],
    ["Warranty", "5 Years"]
  ];

  tableData.forEach((item, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(248, 248, 248);
      doc.rect(rightColX, tableY - 4.5, 98, 7, 'F');
    }
    doc.setTextColor(textGrey[0], textGrey[1], textGrey[2]);
    doc.setFont("helvetica", "normal");
    doc.text(String(item[0]), rightColX + 2, tableY);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(String(item[1]), pageWidth - 15, tableY, { align: "right" });
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
};
