// import type { ReactNode } from "react";
// import Header from "@/components/layout/header/Header";
// import Footer from "@/components/layout/footer/Footer";
// import ScrollToTop from "@/components/common/ScrollToTop";
 
// export default function MarketingLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
//       <Header />
//       <main className="bg-transparent dark:bg-black">{children}</main>
//       <ScrollToTop />
//       <Footer />
//     </div>
//   );
// }


import type { ReactNode } from "react";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="bg-transparent dark:bg-black">
          {children}
        </main>
        <Footer />
      </div>

      {/* Placing this here ensures it is rendered at the root level 
        of the body, preventing it from being affected by the 
        parent's grid layout or overflow settings.
      */}
      <ScrollToTop />
    </>
  );
}