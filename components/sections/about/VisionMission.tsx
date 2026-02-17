import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

/**
 * VISION & MISSION SECTION
 * UX Optimized: Responsive flow, uniform title scaling, mixed-case typography.
 */

export default function VisionMission() {
  // Shared title style for perfect consistency
  const titleStyle = "text-4xl sm:text-6xl lg:text-7xl font-light font-bai tracking-tight leading-[1.1]";
  // Arrow style: Slightly bigger (w-8 h-8), white, and bolder stroke
  const arrowStyle = "w-8 h-8 text-white mb-6 transition-transform duration-500";

  return (
    <Section className="relative bg-black text-white py-20 md:py-40 lg:py-60 overflow-hidden">
      
      {/* BACKGROUND ELEMENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none opacity-20 md:opacity-40">
        <div className="absolute inset-0 border border-white/20 rounded-full" />
      </div>

      <Container className="relative z-10">
        
        {/* 1. MISSION & VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:min-h-[500px]">
          
          {/* Mission */}
          <div className="max-w-[340px]">
            <ArrowCorner className={`${arrowStyle} rotate-90`} />
            <h2 className={titleStyle}>
              Our <span className="font-bold text-white">Mission</span>
            </h2>
            <p className="font-pop text-sm md:text-base text-zinc-500 mt-6 leading-relaxed font-light">
              To deliver lighting systems that enhance environments through energy efficiency and technical precision.
            </p>
          </div>

          {/* Vision - Staggered on desktop for UX/Visual interest */}
          <div className="max-w-[340px] md:mt-40 md:justify-self-end text-left md:text-right">
            <div className="flex flex-col items-start md:items-end">
              <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-180`} />
              <h2 className={titleStyle}>
                Our <span className="font-bold text-white">Vision</span>
              </h2>
            </div>
            <p className="font-pop text-sm md:text-base text-zinc-500 mt-6 leading-relaxed font-light">
              To support smarter, greener infrastructure through innovation and high-performance architectural design.
            </p>
          </div>
        </div>

        {/* 2. CORE VALUES HEADER */}
        <div className="mt-32 md:mt-52 mb-16 md:text-right flex flex-col items-start md:items-end">
          <ArrowCorner className={`${arrowStyle} -rotate-90`} />
          <h2 className={titleStyle}>
            Our <span className="font-bold text-white">Core Values</span>
          </h2>
        </div>

        {/* 3. VALUE WAVE - Fully Responsive Layout */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 md:h-[400px] lg:h-[500px]">
          
          <ValueItem 
            label="Customer-first service" 
            className="md:absolute md:left-[0%] md:bottom-[5%]" 
            lineHeight="h-12 md:h-32 lg:h-48" 
            orientation="bottom"
          />
          
          <ValueItem 
            label="Engineering excellence" 
            className="md:absolute md:left-[28%] md:top-[5%]" 
            lineHeight="h-12 md:h-28 lg:h-40" 
            orientation="top"
          />
          
          <ValueItem 
            label="Energy efficiency" 
            className="md:absolute md:left-[58%] md:bottom-[0%]" 
            lineHeight="h-12 md:h-40 lg:h-56" 
            orientation="bottom"
          />
          
          <ValueItem 
            label="Bespoke customization" 
            className="md:absolute md:left-[85%] md:top-[10%]" 
            lineHeight="h-12 md:h-24 lg:h-36" 
            orientation="top"
          />
        </div>

      </Container>
    </Section>
  );
}

// Updated ArrowCorner: Bigger, Bolder (stroke-2), and pure White
function ArrowCorner({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ValueItem({ label, className, lineHeight, orientation }: { 
  label: string, 
  className?: string, 
  lineHeight: string, 
  orientation: 'top' | 'bottom' 
}) {
  return (
    <div className={`flex flex-col items-center group transition-all duration-700 ${className}`}>
      
      {orientation === 'top' && (
        <>
          <span className="font-pop text-sm md:text-base font-medium text-zinc-500 mb-4 group-hover:text-white transition-colors duration-300 text-center">
            {label}
          </span>
          <div className="w-2 h-2 rounded-full border border-white/20 bg-white/5 group-hover:bg-white/20 transition-all" />
        </>
      )}

      <div className={`w-[1px] ${lineHeight} bg-gradient-to-b from-white/5 via-white/20 to-white/5 group-hover:via-white/50 transition-all duration-500`} />

      {orientation === 'bottom' && (
        <>
          <div className="w-2 h-2 rounded-full border border-white/20 bg-white/5 group-hover:bg-white/20 transition-all" />
          <span className="font-pop text-sm md:text-base font-medium text-zinc-500 mt-4 group-hover:text-white transition-colors duration-300 text-center">
            {label}
          </span>
        </>
      )}
    </div>
  );
}