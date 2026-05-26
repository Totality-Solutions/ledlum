
// import { buildMetadata } from "@/lib/seo";
// import Hero from '@/components/sections/home/Hero';
// import ProductSection from '@/components/sections/home/ProductGridSection';
// import AboutSection from '@/components/sections/home/AboutSection';
// import ProjectSection from '@/components/sections/home/ProjectSection';
// import AutoCarousel from '@/components/sections/home/AutoCarousel';
// import Achievements from '@/components/sections/home/Achievements';
// import FirstVisitModal from "@/components/layout/common/FirstVisitModal";
// import heroImage from '@/public/images/home/home-hero.webp'; 
// import HomeClient from "@/components/sections/home/HomeClient";

// export const metadata = buildMetadata({
//   title: "LEDLUM | Futuristic LED Solutions",
//   description:
//     "LedLum believes lighting is the ultimate intersection of technology and design. Our premium, futuristic LED solutions transform everyday experiences into moments of luxury, defining the mood, ambience, and personality of your space.",
//   canonical: "/",
// });

// const Home = () => {
//   return (
//     <div className="relative">
//       {/* Logic to show contact form on first visit */}


//       <Hero type="video" src="/videos/home.mp4">
//         {/* <h1 className="text-4xl font-bold">We Build the Future</h1> */}
//       </Hero>
//       <ProductSection />
//       <AboutSection />
//       <HomeClient/>
//     </div>
//   )
// }

// export default Home;



import { buildMetadata } from "@/lib/seo";
import { client } from "@/lib/sanity";
import Hero from '@/components/sections/home/Hero';
import ProductSection from '@/components/sections/home/ProductGridSection';
import AboutSection from '@/components/sections/home/AboutSection';
import ProjectSection from '@/components/sections/home/ProjectSection';
import AutoCarousel from '@/components/sections/home/AutoCarousel';
import Achievements from '@/components/sections/home/Achievements';
import FirstVisitModal from "@/components/layout/common/FirstVisitModal";
import heroImage from '@/public/images/home/home-hero.webp'; 
import HomeClient from "@/components/sections/home/HomeClient";

export const metadata = buildMetadata({
  title: "LEDLUM | Futuristic LED Solutions",
  description:
    "LedLum believes lighting is the ultimate intersection of technology and design. Our premium, futuristic LED solutions transform everyday experiences into moments of luxury, defining the mood, ambience, and personality of your space.",
  canonical: "/",
});

export default async function Home() {
  // Fetch dynamic data from Sanity
  // We grab the title, slug, and image URL directly from your dataset
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url
  }`);

  return (
    <div className="relative">
      {/* Logic to show contact form on first visit */}
      
      <Hero type="video" src="/videos/home.mp4">
        {/* <h1 className="text-4xl font-bold">We Build the Future</h1> */}
      </Hero>
      
      <ProductSection />
      <AboutSection />
      
      {/* Pass the posts as initialPosts to your Client Component */}
      <HomeClient initialPosts={posts} />
    </div>
  );
}