interface IesFileProps {
  selections: Record<string, string>;
  activeId: string;
  ipRating: string;
  cutout: string;
}

function parseNumeric(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : fallback;
}

function generateCandelaDistribution(
  lumens: number,
  beamAngleDeg: number,
  numVertical: number,
  numHorizontal: number
): number[][] {
  const halfBeamRad = (beamAngleDeg / 2) * (Math.PI / 180);
  const sigma = halfBeamRad / 2.5;
  const planes: number[][] = [];

  for (let h = 0; h < numHorizontal; h++) {
    const plane: number[] = [];
    const hAngle = (h / (numHorizontal - 1)) * (Math.PI / 2);
    const lateralFactor = 1 - 0.15 * Math.pow(Math.sin(hAngle), 2);

    for (let v = 0; v < numVertical; v++) {
      const vAngleRad = (v / (numVertical - 1)) * Math.PI;
      let candela: number;

      if (vAngleRad <= halfBeamRad * 1.5) {
        candela = Math.exp(-0.5 * Math.pow(vAngleRad / sigma, 2));
      } else {
        const falloff = Math.exp(-0.5 * Math.pow(halfBeamRad * 1.5 / sigma, 2));
        const excess = vAngleRad - halfBeamRad * 1.5;
        candela = falloff * Math.exp(-excess * 3.5);
      }

      candela *= lateralFactor;
      plane.push(Math.max(0, candela));
    }
    planes.push(plane);
  }

  const maxVal = Math.max(...planes.flat());
  if (maxVal > 0) {
    const scale = lumens / (maxVal * planes.length * 0.85);
    for (const plane of planes) {
      for (let i = 0; i < plane.length; i++) {
        plane[i] = Math.round(plane[i] * scale * 100) / 100;
      }
    }
  }

  return planes;
}

export const IesFile = async ({
  selections,
  activeId,
  ipRating,
  cutout,
}: IesFileProps) => {
  const inputWatts = parseNumeric(selections.watts, 12);
  const luminousFlux = parseNumeric(selections.luminous, 1000);
  const beamAngle = parseNumeric(selections.beamAngles, 36);

  let luminousWidth = 0.1;
  let luminousLength = 0.1;
  if (selections.dimensions) {
    const dims = selections.dimensions.match(/[\d.]+/g);
    if (dims && dims.length >= 1) {
      luminousWidth = parseFloat(dims[0]) / 1000;
      luminousLength = dims[1] ? parseFloat(dims[1]) / 1000 : luminousWidth;
    }
  }

  const numVertical = 181;
  const numHorizontal = 5;
  const verticalAngles: number[] = [];
  for (let i = 0; i < numVertical; i++) {
    verticalAngles.push(Math.round((i / (numVertical - 1) * 180) * 10) / 10);
  }
  const horizontalAngles = [0.0, 90.0, 180.0, 270.0, 360.0];

  const candelaPlanes = generateCandelaDistribution(
    luminousFlux,
    beamAngle,
    numVertical,
    numHorizontal
  );

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

  const lines: string[] = [];

  lines.push("IESNA:LM-63-1995");
  lines.push("[TEST] LEDLUM PRODUCT CONFIGURATION");
  lines.push(`[ISSUEDATE] ${dateStr}`);
  lines.push("[MANUFAC] LEDLUM LIGHTING");
  lines.push(`[LUMCAT] ${activeId.toUpperCase()}`);
  lines.push(`[LUMINAIRE] ${activeId.toUpperCase()}`);
  lines.push("[LAMPCAT] LED");
  lines.push("[LAMP] LED");

  Object.entries(selections).forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, " $1").toUpperCase().trim();
    lines.push(`[_${label.replace(/\s+/g, "_")}] ${value}`);
  });
  lines.push(`[_IP_RATING] ${ipRating}`);
  lines.push(`[_CUTOUT_SIZE] ${cutout}`);

  lines.push("[BALLAST] NONE");
  lines.push("[BALLASTCAT] LED");
  lines.push("TILT=NONE");

  lines.push(
    `1 ${luminousFlux.toFixed(1)} 1.000 ${numVertical} ${numHorizontal} 1 2 0.000 0.000 0.000`
  );
  lines.push(`1.000 1.000 ${inputWatts.toFixed(2)}`);

  lines.push(verticalAngles.map((a) => a.toFixed(1)).join(" "));
  lines.push(horizontalAngles.map((a) => a.toFixed(1)).join(" "));

  for (const plane of candelaPlanes) {
    lines.push(plane.map((v) => v.toFixed(2)).join(" "));
  }

  const content = lines.join("\r\n");
  const blob = new Blob([content], { type: "application/octet-stream" });

  const { default: fileSaver } = await import("file-saver");
  fileSaver.saveAs(blob, `${activeId}.ies`);
};
