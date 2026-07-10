// import type { Metadata, Viewport } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { buildMetadata } from "@/lib/seo";

// import LayoutWrapper from "@/app/LayoutWrapper";
// import Loader from "@/components/common/Loader";

// import { Suspense } from "react";

// const poppins = localFont({
//   src: [
//     { path: "../public/fonts/poppins/poppins-200.woff2", weight: "200" },
//     { path: "../public/fonts/poppins/poppins-300.woff2", weight: "300" },
//     { path: "../public/fonts/poppins/poppins-400.woff2", weight: "400" },
//     { path: "../public/fonts/poppins/poppins-500.woff2", weight: "500" },
//     { path: "../public/fonts/poppins/poppins-600.woff2", weight: "600" },
//     { path: "../public/fonts/poppins/poppins-700.woff2", weight: "700" },
//     { path: "../public/fonts/poppins/poppins-800.woff2", weight: "800" },
//   ],
//   variable: "--font-pop",
// });

// const baiJamjuree = localFont({
//   src: [
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-200.woff2", weight: "200" },
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-300.woff2", weight: "300" },
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-400.woff2", weight: "400" },
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-500.woff2", weight: "500" },
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-600.woff2", weight: "600" },
//     { path: "../public/fonts/bai-jamjuree/bai-jamjuree-700.woff2", weight: "700" },
//   ],
//   variable: "--font-bai",
// });

// export const metadata: Metadata = buildMetadata();
// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#000000" },
//   ],
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" style={{ backgroundColor: '#000' }}>
//       <body suppressHydrationWarning style={{ backgroundColor: '#000' }} className={`${poppins.variable} ${baiJamjuree.variable} text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-logo selection:text-black overflow-x-hidden`}>
        
//         <LayoutWrapper 
//           pageLoader={
//             <Suspense fallback={null}>
//               <Loader />
//             </Suspense>
//           }
//         >
//           {/* ── Fixed Background (CSS-only, no image requests) ── */}
//           <div aria-hidden="true" style={{
//             position: "fixed", inset: 0, zIndex: 0,
//             pointerEvents: "none", overflow: "hidden",
//             // background: [
//             //   "radial-gradient(ellipse 600px 400px at 70% 20%, rgba(255,255,255,0.06) 0%, transparent 100%)",
//             //   "radial-gradient(ellipse 400px 400px at 50% 80%, rgba(255,255,255,0.03) 0%, transparent 100%)",
//             //   "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)",
//             // ].join(", "),
//           }} />

//           <div style={{ position: "relative", zIndex: 1 }}>
//             {children}
//           </div>
//         </LayoutWrapper>

//       </body>
//     </html>
//   );
// }


import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

import LayoutWrapper from "@/app/LayoutWrapper";
import Loader from "@/components/common/Loader";

import { Suspense } from "react";
import { cdnImg } from "@/lib/cdn";

const poppins = localFont({
  src: [
    { path: "../public/fonts/poppins/poppins-200.woff2", weight: "200" },
    { path: "../public/fonts/poppins/poppins-300.woff2", weight: "300" },
    { path: "../public/fonts/poppins/poppins-400.woff2", weight: "400" },
    { path: "../public/fonts/poppins/poppins-500.woff2", weight: "500" },
    { path: "../public/fonts/poppins/poppins-600.woff2", weight: "600" },
    { path: "../public/fonts/poppins/poppins-700.woff2", weight: "700" },
    { path: "../public/fonts/poppins/poppins-800.woff2", weight: "800" },
  ],
  variable: "--font-pop",
});

const baiJamjuree = localFont({
  src: [
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-200.woff2", weight: "200" },
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-300.woff2", weight: "300" },
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-400.woff2", weight: "400" },
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-500.woff2", weight: "500" },
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-600.woff2", weight: "600" },
    { path: "../public/fonts/bai-jamjuree/bai-jamjuree-700.woff2", weight: "700" },
  ],
  variable: "--font-bai",
});

export const metadata: Metadata = buildMetadata();
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" style={{ backgroundColor: '#000' }}>
      <body suppressHydrationWarning style={{ backgroundColor: '#000' }} className={`${poppins.variable} ${baiJamjuree.variable} text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-logo selection:text-black overflow-x-hidden`}>
        
        <LayoutWrapper 
          pageLoader={
            <Suspense fallback={null}>
              <Loader />
            </Suspense>
          }
        >
          {/* ── Fixed Background Layers ── */}
          <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
            <Image 
              src={cdnImg("/glow-bg.png")} 
              alt="" 
              fill 
              priority 
              sizes="100vw"
              className="" 
              style={{ objectFit: "fill", mixBlendMode: "screen", opacity: 0.8 }} 
            />
            <Image 
              src={cdnImg("/lineargradient.webp")} 
              alt="" 
              fill 
              sizes="100vw"
              loading="lazy"
              className="" 
              style={{ objectFit: "cover", objectPosition: "top right", mixBlendMode: "screen" }} 
            />
            <Image 
              src={cdnImg("/images/about/ledlumline.webp")} 
              alt="" 
              fill 
              sizes="100vw"
              loading="lazy"
              className="" 
              style={{ objectFit: "cover", mixBlendMode: "screen" }} 
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)" }} />
          </div>

          {/* ── Page Content ── */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </LayoutWrapper>

      </body>
    </html>
  );
}