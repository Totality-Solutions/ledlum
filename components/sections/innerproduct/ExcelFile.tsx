"use client";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

interface ExcelFileProps {
  selections: Record<string, string>;
  activeId: string;
  ipRating: string;
  cutout: string;
}

export const ExcelFile = async ({ selections, activeId, ipRating, cutout }: ExcelFileProps) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Technical Specs");

  worksheet.columns = [
    { header: "SPECIFICATION", key: "spec", width: 25 },
    { header: "VALUE", key: "value", width: 35 },
  ];

  worksheet.addRow({ spec: "PRODUCT ID", value: activeId });
  
  Object.entries(selections).forEach(([key, value]) => {
    // Formats camelCase keys to UPPER CASE with spaces (e.g., bodyColor -> BODY COLOR)
    const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
    worksheet.addRow({ spec: label, value: value });
  });

  // Adding non-selectable config values
  worksheet.addRow({ spec: "IP RATING", value: ipRating });
  worksheet.addRow({ spec: "CUTOUT SIZE", value: cutout });

  // Styling
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).fill = { 
    type: 'pattern', 
    pattern: 'solid', 
    fgColor: { argb: 'FF96865D' } 
  };

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${activeId}-tech-pack.xlsx`);
};