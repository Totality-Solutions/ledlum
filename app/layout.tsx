import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

import Preloader from "@/components/layout/common/PreLoader";
import PageLoader from "@/components/layout/common/PageLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800"],
  variable: "--font-montserrat",
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
      <body
        className={`${montserrat.variable} bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased`}
      >
        <Preloader />

        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>

        {children}
      </body>
    </html>
  );
}