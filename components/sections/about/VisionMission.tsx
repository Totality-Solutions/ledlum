// import { Container } from "@/components/layout/Container";
// import Section from "@/components/layout/Section";

// export default function VisionMission() {
//   // Hierarchy: 
//   // "Our" (48px) | "Mission/Vision/Core Values" (32px) | Paragraph (16px)
  
//   // Responsive logic: lg = desktop (target), md = tablet, base = mobile
//   const ourStyle = "block !text-[32px] md:!text-[40px] lg:!text-[48px] opacity-50 !font-extralight mb-1 leading-none tracking-tight";
//   const wordStyle = "block !text-[24px] md:!text-[28px] lg:!text-[32px] !font-bold leading-tight text-white tracking-tight";
//   const bodyStyle = "body !text-[15px] md:!text-[16px] !text-zinc-500 mt-6 leading-relaxed !font-light max-w-sm";
  
//   const arrowStyle = "w-6 h-6 md:w-8 md:h-8 text-white mb-6 transition-transform duration-500";

//   return (
//     <Section className="relative bg-black text-white py-16 md:py-24 lg:py-32 overflow-hidden bg-[url('/images/about/mission.png')] bg-cover bg-center">
      
//       {/* BACKGROUND DECORATION */}
//       {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none opacity-20 md:opacity-30">
//         <div className="absolute inset-0 border border-white/10 rounded-full" />
//       </div> */}

//       <Container className="relative z-10 !max-w-none px-6 md:px-[74px]">
        
//         {/* MISSION & VISION GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative">
          
//           {/* <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/about/missio.png')] bg-cover bg-center pointer-events-none" /> */}

//           <div className="absolute inset-0 z-0 opacity-10 " />

//           {/* Mission Block */}
//           <div className="max-w-xl relative z-10">
//             <ArrowCorner className={`${arrowStyle} rotate-90`} />
//             <h2 className="font-bai">
//               <span className={ourStyle}>Our</span>
//               <span className={wordStyle}>Mission</span>
//             </h2>
//             <p className={bodyStyle}>
//               To deliver lighting systems that enhance environments through energy efficiency and technical precision.
//             </p>
//           </div>

//           {/* Vision Block */}
//           <div className="max-w-xl md:mt-32 lg:mt-48 md:justify-self-end text-left md:text-right relative z-10">
//             <div className="flex flex-col items-start md:items-end font-bai">
//               <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-180`} />
//               <h2 className="text-left md:text-right">
//                 <span className={ourStyle}>Our</span>
//                 <span className={wordStyle}>Vision</span>
//               </h2>
//             </div>
//             <p className={`${bodyStyle} md:ml-auto`}>
//               To support smarter, greener infrastructure through innovation and high-performance architectural design.
//             </p>
//           </div>
//         </div>

//         {/* CORE VALUES HEADER */}
//         <div className="mt-24 md:mt-40 mb-12 flex flex-col items-start md:items-end font-bai">
//           <ArrowCorner className={`${arrowStyle} -rotate-90`} />
//           <h2 className="text-left md:text-right">
//             <span className={ourStyle}>Our</span>
//             <span className={wordStyle}>Core Values</span>
//           </h2>
//         </div>

//         {/* VALUE WAVE */}
//         <div className="relative w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 md:h-[300px] lg:h-[350px]">
//           <ValueItem label="Customer-first service" className="md:absolute md:left-[0%] md:bottom-[5%]" lineHeight="h-12 md:h-20 lg:h-24" orientation="bottom" bodyStyle={bodyStyle} />
//           <ValueItem label="Engineering excellence" className="md:absolute md:left-[30%] md:top-[5%]" lineHeight="h-12 md:h-16 lg:h-20" orientation="top" bodyStyle={bodyStyle} />
//           <ValueItem label="Energy efficiency" className="md:absolute md:left-[60%] md:bottom-[0%]" lineHeight="h-12 md:h-24 lg:h-28" orientation="bottom" bodyStyle={bodyStyle} />
//           <ValueItem label="Bespoke customization" className="md:absolute md:left-[88%] md:top-[10%]" lineHeight="h-12 md:h-12 lg:h-16" orientation="top" bodyStyle={bodyStyle} />
//         </div>

//       </Container>
//     </Section>
//   );
// }

// function ArrowCorner({ className }: { className?: string }) {
//   return (
//     <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function ValueItem({ label, className, lineHeight, orientation, bodyStyle }: { label: string, className?: string, lineHeight: string, orientation: 'top' | 'bottom', bodyStyle: string }) {
//   return (
//     <div className={`flex flex-col items-center group transition-all duration-700 ${className}`}>
//       {orientation === 'top' && (
//         <>
//           <span className="!text-[14px] md:!text-[16px] !text-zinc-500 mb-4 group-hover:text-white transition-colors duration-300 text-center font-light">{label}</span>
//           <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
//         </>
//       )}
//       <div className={`w-[1px] ${lineHeight} bg-gradient-to-b from-white/0 via-white/20 to-white/0 group-hover:via-white/50 transition-all duration-500`} />
//       {orientation === 'bottom' && (
//         <>
//           <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
//           <span className="!text-[14px] md:!text-[16px] !text-zinc-500 mt-4 group-hover:text-white transition-colors duration-300 text-center font-light">{label}</span>
//         </>
//       )}
//     </div>
//   );
// }





// import { Container } from "@/components/layout/Container";
// import Section from "@/components/layout/Section";

// export default function VisionMission() {
//   // Exact Hierarchy from Image
//   const ourStyle = "block !text-[32px] md:!text-[40px] lg:!text-[48px] text-white opacity-90 !font-medium mb-0 leading-none tracking-tight";
//   const wordStyle = "block !text-[24px] md:!text-[28px] lg:!text-[32px] !font-bold leading-tight text-white tracking-tight";
//   const bodyStyle = "body !text-[14px] md:!text-[15px] lg:!text-[16px] !text-zinc-500 mt-6 leading-relaxed !font-light max-w-[280px] md:max-w-[340px]";
  
//   const arrowStyle = "w-5 h-5 md:w-6 md:h-6 text-white mb-4";

//   return (
//     <Section className="relative bg-black text-white py-24 md:py-32 lg:py-48 overflow-hidden  bg-cover bg-center" style={{
     
//     }}>
//       {/* The Image Layer */}
// <div 
//   className="absolute -right-20 w-[110%] h-[89%] bg-[url('/images/about/mission.png')] bg-cover bg-center" 
// />

// <div 
//   className="absolute -right-20 w-[120%] h-[110%] bg-[url('/images/about/ledlumline.png')] bg-cover bg-center opacity-30" 
// />



//         {/* <div className="absolute inset-0 bg-[url('/images/about/mission.png')] bg-cover bg-[position:30%_center] " /> */}
//       <Container className="relative z-10 !max-w-none px-6 md:px-[10vw]">
        
//         {/* THE EXACT IMAGE STRUCTURE GRID */}
//         <div className="flex flex-col space-y-32 md:space-y-0 relative min-h-[800px] md:min-h-[900px]">
          
//           {/* 1. VISION - Top Right */}
//           <div className="md:absolute md:top-0 md:right-0 flex flex-col items-start md:items-end text-left md:text-right">
//             <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-180`} />
//             <h2 className="font-bai">
//               <span className={ourStyle}>Our.</span>
//               <span className={wordStyle}>Vision.</span>
//             </h2>
//             <p className={`${bodyStyle} md:ml-auto`}>
//               To support smarter, greener infrastructure through innovative LED solutions 
//               and expert service.
//             </p>
//           </div>

//           {/* 2. MISSION - Middle Left (Positioned to hit the center-left area) */}
//           <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 flex flex-col items-start text-left">
//             <ArrowCorner className={`${arrowStyle} rotate-90`} />
//             <h2 className="font-bai">
//               <span className={ourStyle}>Our.</span>
//               <span className={wordStyle}>Mission.</span>
//             </h2>
//             <p className={bodyStyle}>
//               To deliver lighting systems that enhance environments through energy efficiency, 
//               aesthetic appeal, and engineered performance.
//             </p>
//           </div>

//           {/* 3. CORE VALUES - Bottom Right */}
//           <div className="md:absolute md:bottom-0 md:right-0 flex flex-col items-start md:items-end text-left md:text-right">
//             <ArrowCorner className={`${arrowStyle} -rotate-90`} />
//             <h2 className="font-bai">
//               <span className={ourStyle}>Our.</span>
//               <span className={wordStyle}>Core Values.</span>
//             </h2>
//           </div>

//         </div>

//         {/* OPTIONAL: The Subtle Value Items from previous step at the very bottom */}
//         <div className="relative w-full mt-40 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 md:h-[150px]  pt-10">
//           <ValueItem label="Customer-first service" className="md:absolute md:left-[0%] md:bottom-0" lineHeight="h-10" orientation="bottom" />
//           <ValueItem label="Engineering excellence" className="md:absolute md:left-[33%] md:top-0" lineHeight="h-10" orientation="top" />
//           <ValueItem label="Energy efficiency" className="md:absolute md:left-[66%] md:bottom-0" lineHeight="h-10" orientation="bottom" />
//           <ValueItem label="Bespoke customization" className="md:absolute md:left-[100%] md:-translate-x-full md:top-0" lineHeight="h-10" orientation="top" />
//         </div>

//       </Container>
//     </Section>
//   );
// }

// function ArrowCorner({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }

// function ValueItem({ label, className, lineHeight, orientation }: { label: string, className?: string, lineHeight: string, orientation: 'top' | 'bottom' }) {
//   return (
//     <div className={`flex flex-col items-center group ${className}`}>
//       {orientation === 'top' && (
//         <>
//           <span className="!text-[12px] md:!text-[13px] !text-zinc-500 mb-2 group-hover:text-white transition-colors text-center font-light">{label}</span>
//           <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
//         </>
//       )}
//       <div className={`w-[1px] ${lineHeight} bg-white/10 group-hover:bg-white/30`} />
//       {orientation === 'bottom' && (
//         <>
//           <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
//           <span className="!text-[12px] md:!text-[13px] !text-zinc-500 mt-2 group-hover:text-white transition-colors text-center font-light">{label}</span>
//         </>
//       )}
//     </div>
//   );
// }



import React from 'react';
import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";

// 1. Define Interfaces for your Props
interface ArrowCornerProps {
  className?: string;
}

interface ValueItemProps {
  label: string;
  className?: string;
  lineHeight: string;
  orientation: 'top' | 'bottom';
}

export default function VisionMission() {
  const ourStyle = "block !text-[32px] md:!text-[40px] lg:!text-[48px] text-white opacity-90 !font-medium mb-0 leading-none tracking-tight";
  const wordStyle = "block !text-[24px] md:!text-[28px] lg:!text-[32px] !font-bold leading-tight text-white tracking-tight";
  const bodyStyle = "body !text-[14px] md:!text-[15px] lg:!text-[16px] !text-zinc-500 mt-6 leading-relaxed !font-light max-w-[280px] md:max-w-[340px]";
  const arrowStyle = "w-5 h-5 md:w-6 md:h-6 text-white mb-4";

  return (
    <Section className="relative bg-black text-white py-24 md:py-32 lg:py-48 overflow-hidden">
      
      {/* BACKGROUND: Covers all padding, fades at top */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/about/mission.png')] bg-cover bg-center opacity-40 grayscale brightness-[0.6]" 
        style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%)' }}
      />

      <div 
        className="absolute inset-0 z-0 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center opacity-25 pointer-events-none" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)' 
        }}
      />

      <Container className="relative z-10 !max-w-none px-6 md:px-[10vw]">
        <div className="flex flex-col space-y-32 md:space-y-0 relative min-h-[800px] md:min-h-[900px]">
          
          {/* 1. VISION */}
          <div className="md:absolute md:top-0 md:right-0 flex flex-col items-start md:items-end text-left md:text-right">
            <ArrowCorner className={`${arrowStyle} md:rotate-0 -rotate-180`} />
            <h2 className="font-bai">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Vision.</span>
            </h2>
            <p className={`${bodyStyle} md:ml-auto`}>
              To support smarter, greener infrastructure through innovative LED solutions.
            </p>
          </div>

          {/* 2. MISSION */}
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 flex flex-col items-start text-left">
            <ArrowCorner className={`${arrowStyle} rotate-90`} />
            <h2 className="font-bai">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Mission.</span>
            </h2>
            <p className={bodyStyle}>
              To deliver lighting systems that enhance environments through efficiency.
            </p>
          </div>

          {/* 3. CORE VALUES */}
          <div className="md:absolute md:bottom-0 md:right-0 flex flex-col items-start md:items-end text-left md:text-right">
            <ArrowCorner className={`${arrowStyle} -rotate-90`} />
            <h2 className="font-bai">
              <span className={ourStyle}>Our.</span>
              <span className={wordStyle}>Core Values.</span>
            </h2>
          </div>
        </div>

        {/* BOTTOM VALUE ITEMS */}
        <div className="relative w-full mt-40 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 md:h-[150px] pt-10 border-t border-white/5">
          <ValueItem label="Customer-first service" className="md:absolute md:left-[0%] md:bottom-0" lineHeight="h-10" orientation="bottom" />
          <ValueItem label="Engineering excellence" className="md:absolute md:left-[33%] md:top-0" lineHeight="h-10" orientation="top" />
          <ValueItem label="Energy efficiency" className="md:absolute md:left-[66%] md:bottom-0" lineHeight="h-10" orientation="bottom" />
          <ValueItem label="Bespoke customization" className="md:absolute md:right-0 md:top-0" lineHeight="h-10" orientation="top" />
        </div>
      </Container>
    </Section>
  );
}

// 2. Apply Types to Helper Components
function ArrowCorner({ className }: ArrowCornerProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ValueItem({ label, className, lineHeight, orientation }: ValueItemProps) {
  return (
    <div className={`flex flex-col items-center group ${className}`}>
      {orientation === 'top' && (
        <>
          <span className="!text-[12px] md:!text-[13px] !text-zinc-500 mb-2 group-hover:text-white transition-colors text-center font-light">{label}</span>
          <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
        </>
      )}
      <div className={`w-[1px] ${lineHeight} bg-white/10 group-hover:bg-white/30`} />
      {orientation === 'bottom' && (
        <>
          <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
          <span className="!text-[12px] md:!text-[13px] !text-zinc-500 mt-2 group-hover:text-white transition-colors text-center font-light">{label}</span>
        </>
      )}
    </div>
  );
}


