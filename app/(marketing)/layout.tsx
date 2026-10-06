import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getContents } from "@/lib/cms/content";

const ScrollToTop = dynamic(
  () => import("@/components/common/ScrollToTop")
);

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const content = await getContents([
    "site.settings",
    "navigation",
    "footer",
    "legal.privacy",
    "legal.terms",
  ] as const);

  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header site={content["site.settings"]} navigation={content.navigation} />
        <main className="bg-transparent dark:bg-black">
          {children}
        </main>
        <Footer
          site={content["site.settings"]}
          footer={content.footer}
          privacy={content["legal.privacy"]}
          terms={content["legal.terms"]}
        />
      </div>

      {/* Placing this here ensures it is rendered at the root level 
        of the body, preventing it from being affected by the 
        parent's grid layout or overflow settings.
      */}
      <ScrollToTop />
    </>
  );
}
