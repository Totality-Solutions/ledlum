
import { GetInTouch } from "@/components/layout/footer/GetInTouch";
import AboutHero from "@/components/sections/about/AboutHero";
import Journey from "@/components/sections/about/Journey";
import Team from "@/components/sections/about/Team";
import VisionMission from "@/components/sections/about/VisionMission";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <VisionMission />
      <Journey />
      <Team />
      <GetInTouch/>
    </div>
  );
}