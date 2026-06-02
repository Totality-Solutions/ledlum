interface IesFileProps {
  selections: Record<string, string>;
  activeId: string;
  ipRating: string;
  cutout: string;
  category?: string;
  name?: string;
}

export const IesFile = async ({ selections, activeId, ipRating, cutout, category, name }: IesFileProps) => {
  // ─── 1. PARSE & CLEAN USER CONFIG DATA ───────────────────────────────
  
  // Extract numeric digits safely from configuration strings (e.g., "15W" -> 15)
  const parseNumeric = (value: string | undefined, fallback: number): number => {
    if (!value) return fallback;
    const match = value.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : fallback;
  };

  const inputWatts = parseNumeric(selections.watts, 10.0);
  const luminousFlux = parseNumeric(selections.luminous, 1000);
  const beamAngle = parseNumeric(selections.beamAngles, 36.0);

  // Parse width/length dimensions dynamically from text
  // Convert mm values to meters as required by the IES standard specification
  let luminousWidth = 0.1; 
  let luminousLength = 0.1;
  if (selections.dimensions) {
    const dimensionsFound = selections.dimensions.match(/[\d.]+/g);
    if (dimensionsFound && dimensionsFound.length >= 1) {
      const firstDimMm = parseFloat(dimensionsFound[0]);
      luminousWidth = firstDimMm / 1000; 
      luminousLength = dimensionsFound[1] ? parseFloat(dimensionsFound[1]) / 1000 : luminousWidth;
    }
  }

  // ─── 2. BUILD STANDARD IESNA LM-63-02 DATA STREAM ───────────────────
  
  let iesContent = `IESNA:LM-63-02\n`;
  iesContent += `[TEST] ${name ? name.toUpperCase() : "PRODUCT CONFIGURATION"}\n`;
  iesContent += `[MANUFAC] LEDLUM LIGHTING\n`;
  iesContent += `[LUMCAT] ${activeId.toUpperCase()}\n`;
  iesContent += `[LUMINAIRE] ${activeId.toUpperCase()} - ${selections.bodyColor || "STANDARD"} FINISH\n`;
  iesContent += `[LAMP] ${selections.ledChip || "STANDARD"} LED CHIP\n`;
  
  // Custom tracking metadata block hooks for your configuration data
  Object.entries(selections).forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
    iesContent += `[_CONFIG_${label.replace(/\s+/g, '_')}] ${value}\n`;
  });
  iesContent += `[_IP_RATING] ${ipRating}\n`;
  iesContent += `[_CUTOUT_SIZE] ${cutout}\n`;
  
  iesContent += `TILT=NONE\n`;

  // LINE 2 Structure: <# lamps> <lumens/lamp> <multiplier> <# vertical angles> <# horizontal angles> ...
  iesContent += `1 -1 1.0 4 2 1 1 ${luminousWidth.toFixed(3)} ${luminousLength.toFixed(3)} 0.000\n`;
  
  // LINE 3 Structure: <ballast factor> <future use ballast multiplier> <input watts>
  iesContent += `1.0 1.0 ${inputWatts.toFixed(1)}\n`;
  
  // LINE 4: Vertical distribution angle definitions mapping the beam angle profile boundaries
  const halfBeam = beamAngle / 2;
  iesContent += `0.0 ${halfBeam.toFixed(1)} ${beamAngle.toFixed(1)} 90.0\n`;
  
  // LINE 5: Horizontal orthogonal plane intersection coordinates 
  iesContent += `0.0 180.0\n`;
  
  // LINE 6 & 7: Dynamic candela calculations mapped over the structural grid shapes array
  const solidAngleEstimate = 2 * Math.PI * (1 - Math.cos((beamAngle * Math.PI) / 360));
  const peakCandela = Math.round(luminousFlux / (solidAngleEstimate || 1));
  const midCandela = Math.round(peakCandela * 0.5);

  // Plane 0 (Nadir peak -> falloff slope points -> Zero at zenith)
  iesContent += `${peakCandela} ${midCandela} 0 0\n`;
  // Plane 180
  iesContent += `${peakCandela} ${midCandela} 0 0\n`;

  // ─── 3. FILE EMISSION AND SAVE DISPATCH ─────────────────────────────
  const blob = new Blob([iesContent], { type: "text/plain;charset=utf-8" });
  
  const { default: fileSaver } = await import("file-saver");
  fileSaver.saveAs(blob, `${activeId}-${beamAngle}DEG-${luminousFlux}LM.ies`);
};