import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

// ❗ Import Preloader + PageLoader normally
import Preloader from "@/components/layout/common/PreLoader";
import PageLoader from "@/components/layout/common/PageLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        {/* 1. Placement: Always at the very top of the body */}
        <Preloader />
        <PageLoader />

        {/* 2. Content: The Header/Footer/Main are injected via children here */}
        {children}
      </body>
    </html>
  );
}