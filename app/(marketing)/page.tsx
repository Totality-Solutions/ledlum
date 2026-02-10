import { buildMetadata } from "@/lib/seo";
import Hero from '@/components/sections/home/Hero'

export const metadata = buildMetadata({
  title: "Enterprise electrical partner",
  description:
    "Rolta Electricals delivers consulting, EPC, automation, and lifecycle services for critical infrastructure across India and beyond.",
  canonical: "/",
});



const Home = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default Home

