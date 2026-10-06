
import { GetInTouch } from "@/components/layout/footer/GetInTouch";
import AboutHero from "@/components/sections/about/AboutHero";
import Journey from "@/components/sections/about/Journey";
import Team from "@/components/sections/about/Team";
import VisionMission from "@/components/sections/about/VisionMission";
import { getContents } from "@/lib/cms/content";
import { buildCmsMetadata } from "@/lib/cms/seo";

export async function generateMetadata() {
  return buildCmsMetadata("about", { title: "About Us", canonical: "/about" });
}

export default async function AboutPage() {
  const content = await getContents([
    "about.hero",
    "about.visionMission",
    "about.journey",
    "about.team",
    "getInTouch",
  ] as const);

  return (
    <div>
      <AboutHero content={content["about.hero"]} />
      <VisionMission content={content["about.visionMission"]} />
      <Journey content={content["about.journey"]} />
      <Team content={content["about.team"]} />
      <GetInTouch content={content.getInTouch} />
    </div>
  );
}
