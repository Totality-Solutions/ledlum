import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

import Hero from '@/components/sections/home/Hero'
import ProductSection from '@/components/sections/home/ProductGridSection'
import AboutSection from '@/components/sections/home/AboutSection'
import ProjectSection from '@/components/sections/home/ProjectSection'
import AutoCarousel from '@/components/sections/home/AutoCarousel'
import Achievements from '@/components/sections/home/Achievements'

export const metadata = buildMetadata({
  title: "LedLum",
  description: " ",
  canonical: "/",
});

const Home = () => {
  return (
    <div className="relative">

      {/* PAGE BACKGROUND LAYER */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-10 md:opacity-30">
        <Image
          src="/images/about/ledlumline.png"
          alt="background texture"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
     <div className="relative z-10">
      <Hero/>
    </div>
      {/* PAGE CONTENT */}
      <div className="relative z-0">
        <ProductSection />
      </div>
      <div className="relative z-10">
        <AboutSection />
      </div>
      <div className="relative z-0">
        <Achievements />
        <ProjectSection />
        <AutoCarousel />
      </div>

    </div>
  );
}

export default Home;