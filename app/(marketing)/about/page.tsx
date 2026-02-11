
import AboutHero from "@/components/sections/home/about/AboutHero";
import Journey from "@/components/sections/home/about/Journey";
import Team from "@/components/sections/home/about/Team";
import VisionMission from "@/components/sections/home/about/VisionMission";

export default function AboutPage() {
  return (
    <main className="bg-black">
      <AboutHero />
      <VisionMission />
      <Journey />
      <Team />
    </main>
  );
}