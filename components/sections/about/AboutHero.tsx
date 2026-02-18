



// import React from 'react';

// /**
//  * ABOUT HERO SECTION
//  * Refined for clean Mobile UX and premium Desktop Staggering.
//  */
// export default function AboutHero() {
//   const stats = [
//     {
//       title: "Who We Are",
//       desc: "A forward-thinking lighting solutions company focused on energy-efficient LED technologies."
//     },
//     {
//       title: "Since When",
//       desc: "Founded with expertise in modern lighting design and technical innovation."
//     },
//     {
//       title: "What We Do",
//       desc: "Designs and delivers high-performance LED solutions for residential and commercial spaces."
//     },
//     {
//       title: "Core Expertise",
//       desc: "Outdoor & indoor LED lighting, linear lighting, task lighting, customized systems."
//     }
//   ];

//   return (
//     <section className="relative bg-black text-white pt-32 pb-10 overflow-hidden px-6 md:px-[74px]">

//       {/* 1. GLOBAL BACKGROUND LAYER */}
//       <div
//         className="absolute inset-0 z-0 opacity-30 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center pointer-events-none
//                    [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]"
//         aria-hidden="true"
//       />

//       {/* 2. HEADER SECTION */}
//       <div className="relative z-10 w-full mb-12 md:mb-24">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
//           <div className="flex-1">
//             <h1 className="desk-h1 !font-light leading-[1.05] !text-white md:!text-[clamp(3.5rem,6vw,7.5rem)]">
//               Illuminating Spaces – <br />
//               <span className="!font-medium">Inspiring Lives</span>
//             </h1>
//           </div>
//           <div className="w-full md:w-[35%] lg:w-[25%]">
//             <p className="body !text-zinc-500 text-left md:text-right !font-light tracking-wide">
//               Transforming architectural lighting through innovation, performance and design excellence.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 3. MAIN CINEMATIC IMAGE - Full Bleed Technique */}
//       <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[35vh] md:h-[60vh] lg:h-[70vh] mb-20 md:mb-32 border-y border-white/10 overflow-hidden">
//         <div
//           className="absolute -inset-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] 
//                      bg-cover bg-center brightness-75 transition-all duration-1000 hover:opacity-80"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
//       </div>

//       {/* 4. REFINED STAGGERED GRID SECTION */}
//       <div className="relative z-10 w-full">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-y-0 sm:gap-y-12">
//           {stats.map((item, i) => (
//             <div
//               key={i}
//               className={`relative px-8 md:px-12 py-12 lg:py-16 flex flex-col justify-center group transition-all duration-700
//                 /* Stagger logic reserved for large screens only to prevent mobile misalignment */
//                 ${i === 1 ? "lg:translate-y-[15%]" : ""}
//                 ${i === 2 ? "lg:translate-y-[30%]" : ""}
//                 ${i === 3 ? "lg:translate-y-[45%]" : ""}
//               `}
//             >
//               {/* VERTICAL ACCENT LINE: Desktop Only */}
//               <div className="hidden sm:block absolute left-0 top-0 w-[1px] h-full bg-white/20  transition-colors " />

//               {/* HORIZONTAL SEPARATOR: Mobile Only (Inset for premium look) */}
//               {i !== 0 && (
//                 <div className="block sm:hidden absolute left-8 right-8 top-0 h-[1px] bg-white/5" />
//               )}

//               <div className="relative z-10">
//                 <h3 className="font-bai text-2xl lg:text-3xl font-medium mb-6 tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
//                   {item.title}
//                 </h3>
//                 <p className="body-sm !text-zinc-500 !font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// }



import React from 'react';

/**
 * ABOUT HERO SECTION
 * Refined for responsiveness using global classes with mobile-first overrides.
 */
export default function AboutHero() {
  const stats = [
    {
      title: "Who We Are",
      desc: "A forward-thinking lighting solutions company focused on energy-efficient LED technologies."
    },
    {
      title: "Since When",
      desc: "Founded with expertise in modern lighting design and technical innovation."
    },
    {
      title: "What We Do",
      desc: "Designs and delivers high-performance LED solutions for residential and commercial spaces."
    },
    {
      title: "Core Expertise",
      desc: "Outdoor & indoor LED lighting, linear lighting, task lighting, customized systems."
    }
  ];

  return (
    <section className="relative bg-black text-white pt-32 pb-20 md:pb-32 overflow-hidden px-6 md:px-[74px]">

      {/* 1. GLOBAL BACKGROUND LAYER */}
      <div
        className="absolute inset-0 z-0 opacity-30 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center pointer-events-none
                   [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]"
        aria-hidden="true"
      />

      {/* 2. HEADER SECTION */}
      <div className="relative z-10 w-full mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex-1">
            {/* FIX: Overriding global desk-h1 mobile limit.
                Mobile: text-4xl (~36px) | Desktop: Inherits global desk-h1 
            */}
            <h1 className="text-4xl md:desk-h1 !text-white leading-[1.05]">
              <span className="block opacity-50 font-extralight mb-2">Illuminating Spaces –</span>
              <span className="!font-bold">Inspiring Lives</span>
            </h1>
          </div>
          <div className="w-full md:w-[35%] lg:w-[25%]">
            {/* FIX: Ensured body text doesn't fall below 14px on mobile 
            */}
            <p className="body !text-sm md:!text-base !text-zinc-500 text-left md:text-right !font-light tracking-wide">
              Transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>
      </div>

      {/* 3. MAIN CINEMATIC IMAGE */}
      <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[35vh] md:h-[60vh] lg:h-[70vh] mb-20 md:mb-32 border-y border-white/10 overflow-hidden">
        <div
          className="absolute -inset-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] 
                     bg-cover bg-center brightness-75 transition-all duration-1000 hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* 4. REFINED STAGGERED GRID SECTION */}
     <div className="relative z-10 w-full">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-y-0 sm:gap-y-12">
    {stats.map((item, i) => (
      <div
        key={i}
        className={`relative px-8 md:px-12 py-12 lg:py-16 flex flex-col justify-center group transition-all duration-700
             /* Stagger logic reserved for large screens only to prevent mobile misalignment */
             ${i === 1 ? "lg:translate-y-[15%]" : ""}
             ${i === 2 ? "lg:translate-y-[30%]" : ""}
             ${i === 3 ? "lg:translate-y-[45%]" : ""}
           `}
      >
        {/* VERTICAL ACCENT LINE: Desktop Only */}
        <div className="hidden sm:block absolute left-0 top-0 w-[1px] h-full bg-white/20  transition-colors " />

        {/* HORIZONTAL SEPARATOR: Mobile Only (Inset for premium look) */}
        {i !== 0 && (
          <div className="block sm:hidden absolute left-8 right-8 top-0 h-[1px] bg-white/5" />
        )}

        <div className="relative z-10">
          <h3 className="font-bai text-2xl lg:text-3xl font-medium mb-6 tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
            {item.title}
          </h3>
          <p className="body-sm !text-zinc-500 !font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
            {item.desc}
          </p>
        </div>
      </div>
          ))}
        </div>
      </div>

    </section>
  );
}







