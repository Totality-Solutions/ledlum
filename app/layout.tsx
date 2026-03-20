import type { Metadata, Viewport } from "next";
import { Poppins, Bai_Jamjuree } from "next/font/google";
import { Suspense } from "react";
import Image from "next/image";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

import LayoutWrapper from "@/app/LayoutWrapper";
import PageLoader from "@/app/PageLoader";

import linearGradientBg from "@/public/lineargradient.png";
import ledlumLineBg from "@/public/images/about/ledlumline.png";
import glowBg from "@/public/glow-bg.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-pop",
});

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${baiJamjuree.variable} text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased selection:bg-logo selection:text-black`} style={{ backgroundColor: '#000' }}>
        
        <LayoutWrapper 
          pageLoader={
            <Suspense fallback={null}>
              <PageLoader />
            </Suspense>
          }
        >
          {/* ── Fixed Background Layers ── */}
          <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
            <Image 
              src={glowBg} 
              alt="" 
              fill 
              priority 
              className="will-change-transform" 
              style={{ objectFit: "fill", mixBlendMode: "screen", opacity: 0.8 }} 
            />
            <Image 
              src={linearGradientBg} 
              alt="" 
              fill 
              className="will-change-transform" 
              style={{ objectFit: "cover", objectPosition: "top right", mixBlendMode: "screen" }} 
            />
            <Image 
              src={ledlumLineBg} 
              alt="" 
              fill 
              className="will-change-transform" 
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
