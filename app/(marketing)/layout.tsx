import type { ReactNode } from "react";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
 
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="bg-transparent dark:bg-black">{children}</main>
      <Footer />
    </div>
  );
}


