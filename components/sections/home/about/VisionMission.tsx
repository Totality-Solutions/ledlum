import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function VisionMission() {
  // Hierarchy: 
  // "Our" (48px) | "Mission/Vision/Core Values" (32px) | Paragraph (16px)
  
  // Responsive logic: lg = desktop (target), md = tablet, base = mobile
  const ourStyle = "block !text-[32px] md:!text-[40px] lg:!text-[48px] opacity-50 !font-extralight mb-1 leading-none tracking-tight";
  const wordStyle = "block !text-[24px] md:!text-[28px] lg:!text-[32px] !font-bold leading-tight text-white tracking-tight";
  const bodyStyle = "body !text-[15px] md:!text-[16px] !text-zinc-500 mt-6 leading-relaxed !font-light max-w-sm";
  
  const arrowStyle = "w-6 h-6 md:w-8 md:h-8 text-white mb-6 transition-transform duration-500";

  return (
    <Section className="relative bg-black text-white py-16 md:py-24 lg:py-32 overflow-hidden bg-[url('/images/about/ledlum-line.png')] bg-cover bg-center">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none opacity-20 md:opacity-30">
        <div className="absolute inset-0 border border-white/10 rounded-full" />
      </div>

      <Container className="relative z-10 !max-w-none px-6 md:px-[74px]">
        
        {/* MISSION & VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
          
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/about/testbg.png')] bg-cover bg-center pointer-events-none" />

          {/* Mission Block */}
          <div className="max-w-xl relative z-10">
            <ArrowCorner className={`${arrowStyle} rotate-90`} />
            <h2 className="font-bai">
              <span className={ourStyle}>Our</span>
              <span className={wordStyle}>Mission</span>
            </h2>
            <p className={bodyStyle}>
              To deliver lighting systems that enhance environments through energy efficiency and technical precision.
            </p>
          </div>

          {/* Vision Block */}
          <div className="max-w-xl md:mt-32 lg:mt-48 md:justify-self-end text-left md:text-right relative z-10">
            <div className="flex flex-col items-start md:items-end font-bai">
              <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-180`} />
              <h2 className="text-left md:text-right">
                <span className={ourStyle}>Our</span>
                <span className={wordStyle}>Vision</span>
              </h2>
            </div>
            <p className={`${bodyStyle} md:ml-auto`}>
              To support smarter, greener infrastructure through innovation and high-performance architectural design.
            </p>
          </div>
        </div>

        {/* CORE VALUES HEADER */}
        <div className="mt-24 md:mt-40 mb-12 flex flex-col items-start md:items-end font-bai">
          <ArrowCorner className={`${arrowStyle} -rotate-90`} />
          <h2 className="text-left md:text-right">
            <span className={ourStyle}>Our</span>
            <span className={wordStyle}>Core Values</span>
          </h2>
        </div>

        {/* VALUE WAVE */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 md:h-[300px] lg:h-[350px]">
          <ValueItem label="Customer-first service" className="md:absolute md:left-[0%] md:bottom-[5%]" lineHeight="h-12 md:h-20 lg:h-24" orientation="bottom" bodyStyle={bodyStyle} />
          <ValueItem label="Engineering excellence" className="md:absolute md:left-[30%] md:top-[5%]" lineHeight="h-12 md:h-16 lg:h-20" orientation="top" bodyStyle={bodyStyle} />
          <ValueItem label="Energy efficiency" className="md:absolute md:left-[60%] md:bottom-[0%]" lineHeight="h-12 md:h-24 lg:h-28" orientation="bottom" bodyStyle={bodyStyle} />
          <ValueItem label="Bespoke customization" className="md:absolute md:left-[88%] md:top-[10%]" lineHeight="h-12 md:h-12 lg:h-16" orientation="top" bodyStyle={bodyStyle} />
        </div>

      </Container>
    </Section>
  );
}

function ArrowCorner({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ValueItem({ label, className, lineHeight, orientation, bodyStyle }: { label: string, className?: string, lineHeight: string, orientation: 'top' | 'bottom', bodyStyle: string }) {
  return (
    <div className={`flex flex-col items-center group transition-all duration-700 ${className}`}>
      {orientation === 'top' && (
        <>
          <span className="!text-[14px] md:!text-[16px] !text-zinc-500 mb-4 group-hover:text-white transition-colors duration-300 text-center font-light">{label}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
        </>
      )}
      <div className={`w-[1px] ${lineHeight} bg-gradient-to-b from-white/0 via-white/20 to-white/0 group-hover:via-white/50 transition-all duration-500`} />
      {orientation === 'bottom' && (
        <>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
          <span className="!text-[14px] md:!text-[16px] !text-zinc-500 mt-4 group-hover:text-white transition-colors duration-300 text-center font-light">{label}</span>
        </>
      )}
    </div>
  );
}