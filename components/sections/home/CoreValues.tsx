import svgPaths from "@/components/layout/imports/svg-94g14nmwnx";

// Reference dimensions from Figma
const REF_W = 1475.5;
const REF_H = 640;

function pct(x: number, of: number) {
  return `${((x / of) * 100).toFixed(4)}%`;
}

interface ValueLabelProps {
  label: string[];
  leftPx: number;
  topPx: number;
}

function ValueLabel({ label, leftPx, topPx }: ValueLabelProps) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ 
        left: pct(leftPx, REF_W), 
        top: pct(topPx, REF_H),
        transform: "translateX(-50%)" 
      }}
    >
      {label.map((line, i) => (
        <p
          key={i}
          className="text-center whitespace-nowrap"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            color: "#dbdcdd",
            fontSize: "clamp(10px, 1.08vw, 16px)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

interface VerticalLineProps {
  leftPx: number;
  topPx: number;
  heightPx: number;
  direction?: "down" | "up";
}

function VerticalLine({ leftPx, topPx, heightPx, direction = "down" }: VerticalLineProps) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: pct(leftPx, REF_W),
        top: pct(topPx, REF_H),
        width: "1px",
        height: pct(heightPx, REF_H),
        transform: "translateX(-50%)" 
      }}
    >
      {direction === "up" && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] -mt-0.5 shrink-0" />
      )}
      
      <div
        className="w-full h-full"
        style={{
          background: direction === "down"
            ? "linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.05))"
            : "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.05))",
        }}
      />

      {direction === "down" && (
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] -mb-0.5 shrink-0" />
      )}
    </div>
  );
}

export default function CoreValues() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="w-full h-full xl:w-full xl:max-w-none">
        <div
          className="relative w-full"
          style={{ paddingBottom: `${((REF_H / REF_W) * 100).toFixed(4)}%` }}
        >
          <div className="absolute inset-0">

            {/* ── Wave SVG (EXACTLY AS PER COMMENTED FIGMA DATA) ──────────────── */}
            <div
              className="absolute"
              style={{
                left: 0,
                top: pct(310, REF_H),
                width: "100%",
                height: pct(240, REF_H),
              }}
            >
              {/* Blur glow layer underneath */}
              <div className="absolute inset-0" style={{ filter: "blur(18px)", opacity: 0.45 }}>
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1515.73 254.925">
                  <path d={svgPaths.pd6d8900} fill="url(#glow_grad)" />
                  <defs>
                    <linearGradient id="glow_grad" x1="1197.38" x2="1172.95" y1="24.9308" y2="266.411" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#222222" />
                      <stop offset="0.26" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#FFD7A9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Main wave with original filter and golden gradient */}
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1515.73 254.925">
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="254.925" id="wave_filter" width="1515.73" x="0" y="4.76837e-07">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="10" />
                    <feTurbulence baseFrequency="0.999 0.999" numOctaves={3} seed={2430} type="fractalNoise" />
                    <feDisplacementMap height="100%" in="effect1_foregroundBlur" result="displacedImage" scale={40} width="100%" xChannelSelector="R" yChannelSelector="G" />
                    <feMerge result="effect2_texture"><feMergeNode in="displacedImage" /></feMerge>
                  </filter>
                  <linearGradient id="wave_grad" x1="1197.38" x2="1172.95" y1="24.9308" y2="266.411" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#222222" />
                    <stop offset="0.259615" stopColor="white" />
                    <stop offset="1" stopColor="#FFD7A9" />
                  </linearGradient>
                </defs>
                <g filter="url(#wave_filter)">
                  <path d={svgPaths.pd6d8900} fill="url(#wave_grad)" />
                </g>
              </svg>
            </div>

            {/* ── Vertical connector lines ──────────────── */}
            <VerticalLine leftPx={424} topPx={358} heightPx={90} direction="up" />
            <VerticalLine leftPx={1232} topPx={350} heightPx={90} direction="up" />
            <VerticalLine leftPx={169} topPx={456} heightPx={90} direction="down" />
            <VerticalLine leftPx={814} topPx={388} heightPx={90} direction="down" />

            {/* ── Value Labels ─────────────────────────── */}
            <ValueLabel label={["Engineering Excellence"]} leftPx={424} topPx={320} />
            <ValueLabel label={["Customization", "& Flexibility"]} leftPx={1232} topPx={285} />
            <ValueLabel label={["Customer-First", "Service"]} leftPx={169} topPx={560} />
            <ValueLabel label={["Energy Efficiency &", "Sustainability"]} leftPx={814} topPx={495} />

          </div>
        </div>
      </div>
    </section>
  );
}










