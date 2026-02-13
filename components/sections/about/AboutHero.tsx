// import React from 'react';

// /**
//  * ABOUT HERO SECTION
//  * Updated for infinite width and global.css synchronization.
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
//     // md:px-[74px] ensures your specific gutter. Removed max-w constraints.
//     <section className="bg-black text-white pt-32  overflow-hidden px-6 md:px-[74px] ">

//       {/* 1. HEADER SECTION - Fluid spacing */}
//       <div className="w-full mb-12 md:mb-24">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
//           <div className="flex-1">
//             {/* desk-h1 used with fluid clamp to ensure it looks massive on big screens */}
//             <h1 className="desk-h1 !font-light leading-[1.05] !text-white md:!text-[clamp(3.5rem,6vw,7.5rem)]">
//               Illuminating Spaces – <br />
//               <span className="!font-medium">Inspiring Lives</span>
//             </h1>
//           </div>
//           <div className="w-full md:w-[35%] lg:w-[25%]">
//             {/* body class from global.css */}
//             <p className="body !text-zinc-500 text-left md:text-right !font-light tracking-wide">
//               Transforming architectural lighting through innovation, performance and design excellence.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 2. MAIN IMAGE - Cinematic Full-Bleed */}
//       <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[35vh] md:h-[60vh] lg:h-[70vh] mb-20 md:mb-32 border-y border-white/10">
//         <div
//           className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-40 transition-all duration-1000 hover:opacity-60"
//         />
//         {/* Shadow overlay to integrate with dark theme */}
//         {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" /> */}
//       </div>

//       {/* 3. GRID SECTION - Infinite Expansion */}
//       <div className="w-full relative overflow-hidden">

//         {/* 1. Background Layer: This is where we control the opacity */}
//         <div
//           className="absolute inset-0 z-0 opacity-40 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center "
//           aria-hidden="true"
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative items-start">
//           {stats.map((item, i) => (
//             <div
//               key={i}
//               className={`relative px-8 md:px-12 py-10 lg:py-16 flex flex-col justify-center group transition-all duration-700
                
//                 /* Percent-based stagger for smoother scaling on wide screens */
//                 ${i === 1 ? "lg:translate-y-[15%]" : ""}
//                 ${i === 2 ? "lg:translate-y-[30%]" : ""}
//                 ${i === 3 ? "lg:translate-y-[45%]" : ""}

//                 ${i % 2 !== 0 ? "sm:translate-y-12 lg:translate-y-auto" : ""}
//               `}
//             >
//               {/* VERTICAL ACCENT LINE */}
//               <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />

//               {/* HORIZONTAL SEPARATOR (Mobile only) */}
//               <div className="absolute left-0 top-0 w-full h-[1px] sm:hidden bg-white/10" />

//               <div className="relative z-10">
//                 {/* Heading using Bai font directly for premium feel */}
//                 <h3 className="font-bai text-2xl lg:text-3xl font-medium mb-6 tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
//                   {item.title}
//                 </h3>
//                 {/* body-sm class from global.css */}
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



// import React from 'react';

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
//     <section className="bg-black text-white pt-32 pb-64 overflow-hidden px-6 md:px-[74px]">
      
//       {/* 1. HEADER SECTION */}
//       <div className="w-full mb-12 md:mb-24">
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

//       {/* 2. MAIN IMAGE */}
//       <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[35vh] md:h-[60vh] lg:h-[70vh] mb-20 md:mb-32 border-y border-white/10">
//         <div
//           className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-40 transition-all duration-1000 hover:opacity-60"
//         />
//       </div>

//       {/* 3. GRID SECTION */}
//       <div className="w-full relative">
//         {/* BACKGROUND BLEND LAYER */}
//         {/* <div
//           className="absolute inset-0 z-0 opacity-20 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
//           aria-hidden="true"
//         /> */}

//       {/* FIXED BACKGROUND LAYER */}
//   <div
//     className="absolute inset-0 z-0 opacity-40 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center"
//     aria-hidden="true"
//   />
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative items-start gap-y-12">
//           {stats.map((item, i) => (
//             <div
//               key={i}
//               className={`relative px-8 md:px-12 py-10 lg:py-16 flex flex-col justify-center group transition-all duration-700
//                 /* Reduced translate values to keep items inside viewable area */
//                 ${i === 1 ? "lg:translate-y-[10%]" : ""}
//                 ${i === 2 ? "lg:translate-y-[20%]" : ""}
//                 ${i === 3 ? "lg:translate-y-[30%]" : ""}
//                 ${i % 2 !== 0 ? "sm:translate-y-12 lg:translate-y-auto" : ""}
//               `}
//             >
//               {/* VERTICAL ACCENT LINE */}
//               <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />

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
 * Integrated with seamless black blending and fixed staggered layout.
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
    <section className="relative bg-black text-white pt-32 pb-60 overflow-hidden px-6 md:px-[74px]">
      
      {/* 1. GLOBAL BACKGROUND LAYER - Covers entire section including padding */}
     <div
  className="absolute inset-0 z-0 opacity-30 bg-[url('/images/about/ledlumline.png')] bg-cover bg-center pointer-events-none
             [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]"
  aria-hidden="true"
/>

      {/* 2. HEADER SECTION */}
      <div className="relative z-10 w-full mb-12 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex-1">
            <h1 className="desk-h1 !font-light leading-[1.05] !text-white md:!text-[clamp(3.5rem,6vw,7.5rem)]">
              Illuminating Spaces – <br />
              <span className="!font-medium">Inspiring Lives</span>
            </h1>
          </div>
          <div className="w-full md:w-[35%] lg:w-[25%]">
            <p className="body !text-zinc-500 text-left md:text-right !font-light tracking-wide">
              Transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>
      </div>

      {/* 3. MAIN CINEMATIC IMAGE - Using the Oversized Blend Technique */}
      <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[35vh] md:h-[60vh] lg:h-[70vh] mb-20 md:mb-32 border-y border-white/10 overflow-hidden">
        <div
          className="absolute -inset-10 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] 
                     bg-cover bg-center brightness-75 transition-all duration-1000 hover:opacity-80"
        />
        {/* Subtle vignette to blend the full-bleed image into the black layout */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      {/* 4. STAGGERED GRID SECTION */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-y-12">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`relative px-8 md:px-12 py-10 lg:py-16 flex flex-col justify-center group transition-all duration-700
                /* Stagger logic: keeps items visible on desktop within the padding */
                ${i === 1 ? "lg:translate-y-[15%]" : ""}
                ${i === 2 ? "lg:translate-y-[30%]" : ""}
                ${i === 3 ? "lg:translate-y-[45%]" : ""}
                ${i % 2 !== 0 ? "sm:translate-y-12 lg:translate-y-auto" : ""}
              `}
            >
              {/* VERTICAL ACCENT LINE */}
              <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />

              {/* MOBILE HORIZONTAL SEPARATOR */}
              <div className="absolute left-0 top-0 w-full h-[1px] sm:hidden bg-white/10" />

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