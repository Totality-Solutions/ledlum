
// // // "use client";

// // // import React from 'react';
// // // import Header from '@/components/layout/header/Header';
// // // import Footer from '@/components/layout/footer/Footer';

// // // export default function NotFound() {
// // //   return (
// // //     <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
// // //       {/* Header */}
// // //       <Header />
      
// // //       {/* Main Content */}
// // //       <main className="flex-grow flex flex-col">
        
// // //         {/* Top Hero - Full Width */}
// // //         <div 
// // //           className="w-full h-[40vh] bg-cover bg-center bg-no-repeat"
// // //           style={{ 
// // //             backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')` 
// // //           }}
// // //         />

// // //         {/* Bottom Graphic - Now Full Width */}
// // //         <div 
// // //           className="w-full h-[60vh] bg-cover bg-center bg-no-repeat"
// // //           style={{ 
// // //             backgroundImage: `url('/404-page.png')` 
// // //           }}
// // //         />
        
// // //       </main>

// // //       {/* Footer */}
// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React from 'react';
// // import Header from '@/components/layout/header/Header';
// // import Footer from '@/components/layout/footer/Footer';

// // export default function NotFound() {
// //   return (
// //     <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
// //       {/* Header */}
// //       <Header />
      
// //       <main className="flex-grow flex flex-col">
        
// //         {/* 1. TOP HERO SECTION - Increased to 55vh for more visual impact */}
// //         <div className="relative w-full h-[55vh] overflow-hidden border-b border-white/5">
// //           <img 
// //             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
// //             alt="Architectural Lighting Hero"
// //             className="w-full h-full object-cover grayscale-[20%] opacity-70"
// //           />
          
// //           {/* Professional Overlay: Blends the hero image into the black background below */}
// //           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          
// //           {/* Hero Content - Lowercase per UI expert guidelines */}
// //           <div className="absolute inset-0 z-10 flex items-start pt-24 pl-10 md:pl-20">
// //             <p className="text-[22px] md:text-[30px] font-bai font-light leading-tight tracking-tight max-w-xl text-zinc-300">
// //               transforming architectural lighting through innovation, performance and design excellence.
// //             </p>
// //           </div>
// //         </div>

// //         {/* 2. BOTTOM 404 SECTION - Adjusted to 45vh */}
// //         <div className="relative w-full h-[105vh] bg-black flex items-center justify-center overflow-hidden">
// //           {/* <img 
// //             src="/404-page.png" 
// //             alt="404 Error Graphic" 
// //             className="w-full h-full object-cover md:object-contain pointer-events-none select-none"
// //           /> */}
          
// //           {/* Vignette Layer: Focuses light on the center of the 404 image */}
// //           {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_black_100%)] opacity-60" /> */}



// //            <div 
// //     className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2"
// //     style={{
// //       backgroundImage: "url('/404-page.png')",
// //       backgroundSize: 'cover',
// //       backgroundPosition: 'center',
// //       opacity:'0.3'
// //     }}
// //   ></div>
// //         </div>
        
// //       </main>

// // <Footer/>
// //     </div>
// //   );
// // }




// "use client";

// import React from 'react';
// import Header from '@/components/layout/header/Header';
// import Footer from '@/components/layout/footer/Footer';

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
//       <Header />
      
//       <main className="flex-grow flex flex-col">
        
//         {/* 1. TOP HERO SECTION - Fixed for Full Visibility */}
//         <div className="relative w-full h-[75vh] min-h-[35vh] md:min-h-[45vh] overflow-hidden border-b border-white/5">
//           <img 
//             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
//             alt="Hero"
//             /* Using object-contain on mobile ensures the WHOLE architectural photo is seen */
//             className="w-full h-full object-contain md:object-cover grayscale opacity-40"
//           />
          
//           {/* Blend Overlays */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          
//           {/* Hero Content */}
//           <div className="absolute inset-0 z-10 flex items-center md:items-start pt-0 md:pt-24 px-8 md:pl-20">
//             <p className="text-[18px] md:text-[26px] font-bai font-light text-zinc-400 max-w-lg text-center md:text-left mx-auto md:mx-0">
//               transforming architectural lighting through innovation, performance and design excellence.
//             </p>
//           </div>
//         </div>

//         {/* 2. BOTTOM 404 SECTION - The "Breakout" Fix */}
//         <section className="relative w-screen left-1/2 -translate-x-1/2 bg-black flex flex-col items-center justify-center">
          
//           {/* We use h-auto and w-full here. 
//              The image uses 'contain' to ensure 100% visibility.
//           */}
//           <div className="relative w-full flex items-center justify-center py-10 md:py-20 h-[700px]">
//             <img 
//               src="/404-page.png" 
//               alt="404 Graphic"
//               /* 'w-full h-auto' + 'object-contain' is the only way to be full width and 100% visible */
//               className="w-full max-w-[1608px] h-auto object-contain opacity-30 transition-opacity duration-1000" 
//               style={{
//                 mixBlendMode: 'difference',
//               }}
//             />
            
//             {/* VIGNETTE BLENDING - Ensures the 'contain' edges aren't visible */}
//             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
//             <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
//           </div>

//         </section>
        
//       </main>

//       <Footer/>
//     </div>
//   );
// }




"use client";

import React from 'react';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
      <Header />
                {/* 1. BACKGROUND LAYER: This stretches to the screen edges without affecting the grid below */}
  <div 
    className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2"
    style={{
      backgroundImage: "url('/images/about/ledlumline.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity:'0.3'
    }}
  ></div>
      
      <main className="flex-grow flex flex-col relative">
        
        {/* 1. TOP HERO SECTION - NO CROP RESPONSIVE */}
        <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-black border-b border-white/10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Hero"
            /* Changed to object-contain to ensure the FULL image is visible. 
               The bg-black container handles the 'bars' if the image is too wide/tall.
            */
            className="w-full h-full object-cover"
          />


          
          {/* Refined Overlays */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" /> */}
          
          <div className="absolute inset-0 z-10 flex items-center md:items-start pt-0 md:pt-24 px-6 sm:px-10 md:pl-24">
            <p className="text-[14px] sm:text-[18px] md:text-[22px] font-bai font-light text-white/80 max-w-sm sm:max-w-md md:max-w-lg leading-relaxed text-center md:text-left mx-auto md:mx-0">
              transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </section>

        {/* 2. THE VISUAL COMPOSITION LAYER - Fluid Scaling */}
        <section className="relative w-full min-h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black py-20">
          
        

          {/* NOT-BG - Middle Layer (Scales with viewport) */}
          <div 
            className="absolute pointer-events-none w-[150vw] h-[150vw] md:w-[1200px] md:h-[1200px] opacity-[0.08]"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundImage: "url('/images/blog/not-bg.jpg')",
              backgroundSize: 'cover',
              mixBlendMode: 'difference',
            }}
          />

          {/* TEXT COMPOSITION */}
          <div className="relative z-10 flex flex-col items-center w-full px-4 text-center">
            
            {/* THE LARGE 404 - Fluid Typography */}
            <h1 
              className="font-bai font-bold leading-none select-none tracking-tighter"
              style={{
                fontSize: 'clamp(120px, 30vw, 500px)', 
                color: 'rgba(255, 255, 255, 0.05)',
                filter: 'blur(1px)',
              }}
            >
              404
            </h1>

            {/* MESSAGE */}
            <div className="mt-[-20px] sm:mt-[-40px] md:mt-[-60px]">
              <p className="font-poppins font-light text-white text-[16px] sm:text-[20px] md:text-[28px] tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                Oops, page not found
              </p>
              <div className="h-[1px] w-8 sm:w-12 bg-zinc-700 mx-auto mt-4 sm:mt-6" />
            </div>
          </div>

          {/* ATMOSPHERIC GRADIENTS */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_black_100%)] pointer-events-none z-20" />
        </section>
        
      </main>

      <Footer/>
    </div>
  );
}