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


import Hero from "@/components/sections/home/Hero";
import ProductSection from "@/components/sections/home/ProductGridSection";
import AboutSection from "@/components/sections/home/AboutSection";
import HomeClient from "@/components/sections/home/HomeClient";
import { getContents, getPublishedPosts } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata() {
  return buildCmsMetadata("home", { canonical: "/" });
}

const Home = async () => {
  const [content, posts] = await Promise.all([
    getContents([
      "home.hero",
      "home.products",
      "home.about",
      "home.achievements",
      "home.blogCarousel",
      "home.testimonials",
      "projects",
      "collections",
      "site.settings",
    ] as const),
    getPublishedPosts(),
  ]);
  const hero = content["home.hero"];

  return (
    <div className="relative">
      <Hero
        type={hero.type === "image" ? "image" : "video"}
        src={hero.type === "image" ? hero.image : hero.video}
        poster={hero.image}
      />
      <ProductSection
        content={content["home.products"]}
        collections={content.collections.items.filter((c) => c.visible)}
      />
      <AboutSection content={content["home.about"]} />
      <HomeClient
        achievements={content["home.achievements"]}
        projects={content.projects}
        blogCarousel={content["home.blogCarousel"]}
        posts={posts.map((p) => ({ image: p.image, slug: p.slug }))}
        testimonials={content["home.testimonials"]}
        social={content["site.settings"]}
      />
    </div>
  )
}

export default Home
