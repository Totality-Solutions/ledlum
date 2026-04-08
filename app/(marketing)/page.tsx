// import { buildMetadata } from "@/lib/seo";
// import Image from "next/image";
// import Hero from '@/components/sections/home/Hero'
// import ProductSection from '@/components/sections/home/ProductGridSection'
// import AboutSection from '@/components/sections/home/AboutSection'
// import ProjectSection from '@/components/sections/home/ProjectSection'
// import AutoCarousel from '@/components/sections/home/AutoCarousel'
// import Achievements from '@/components/sections/home/Achievements'

// export const metadata = buildMetadata({
//   title: "LedLum",
//   description:
//     " ",
//   canonical: "/",
// });



// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <ProductSection/>
//       <AboutSection/>
//       <Achievements/>
//       <ProjectSection/>
//       <AutoCarousel/>
//     </div>
//   )
// }

// export default Home


import { buildMetadata } from "@/lib/seo";
import Hero from '@/components/sections/home/Hero';
import ProductSection from '@/components/sections/home/ProductGridSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProjectSection from '@/components/sections/home/ProjectSection';
import AutoCarousel from '@/components/sections/home/AutoCarousel';
import Achievements from '@/components/sections/home/Achievements';
import FirstVisitModal from "@/components/layout/common/FirstVisitModal";
import heroImage from '@/public/images/home/home-hero.png'; 

export const metadata = buildMetadata({
  title: "LEDLUM | Futuristic LED Solutions",
  description:
    "LedLum believes lighting is the ultimate intersection of technology and design. Our premium, futuristic LED solutions transform everyday experiences into moments of luxury, defining the mood, ambience, and personality of your space.",
  canonical: "/",
});

const Home = () => {
  return (
    <div className="relative">
      {/* Logic to show contact form on first visit */}


      <Hero type="image" src={heroImage}>
        {/* <h1 className="text-4xl font-bold">We Build the Future</h1> */}
      </Hero>
      <ProductSection />
      <AboutSection />
      <Achievements />
      <ProjectSection />
      <AutoCarousel />
      <FirstVisitModal />
    </div>
  )
}

export default Home;