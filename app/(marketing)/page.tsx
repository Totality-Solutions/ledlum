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
  description:
    " ",
  canonical: "/",
});



const Home = () => {
  return (
    <div>
      <Hero />
      <ProductSection/>
      <AboutSection/>
      <Achievements/>
      <ProjectSection/>
      <AutoCarousel/>
    </div>
  )
}

export default Home

