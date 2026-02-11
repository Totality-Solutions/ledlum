import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Linkedin } from "lucide-react";

export default function Team() {
  const team = [
    { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum" },
    { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum" },
    { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum" },
    { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum" },
    { name: "Sumeet Malhotra", role: "Director & Founder - Ledlum" },
  ];

  const workingImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";

  return (
    <Section className="bg-[#080808] text-white py-20 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 1. HEADER SECTION - Responsive sizing and alignment */}
          <div className="flex flex-col justify-center mb-8 md:mb-0 pr-0 md:pr-10 lg:pr-16">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light font-bai tracking-tight leading-[1.1] mb-6">
              Meet Our <br />
              <span className="font-bold">Visionaries</span>
            </h2>
            <p className="font-pop text-sm md:text-base text-zinc-500 leading-relaxed font-light max-w-sm">
              Delivering lighting systems that enhance environments through energy efficiency, 
              aesthetic appeal, and engineered performance.
            </p>
          </div>

          {/* 2. TEAM CARDS - Grid Flow with hover effects */}
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-[#111111] p-4 md:p-6 flex flex-col transition-all duration-500 border border-white/5 hover:border-white/10"
            >
              {/* Profile Image Container - Subtle Zoom on Hover */}
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-zinc-900">
                <img
                  src={workingImage}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Subtle Overlay on hover */}
                <div className="absolute inset-0 bg-yellow-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info Section */}
              <div className="flex justify-between items-end mt-auto">
                <div className="flex-grow pr-4">
                  <h4 className="text-lg md:text-xl font-bai font-semibold tracking-tight text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="font-pop text-[11px] md:text-xs text-zinc-500 tracking-wider font-medium">
                    {member.role}
                  </p>
                </div>
                
                {/* LinkedIn Icon - Styled to match the journey interaction */}
                <a 
                  href="#" 
                  className="bg-white/5 p-2.5 rounded-sm hover:bg-yellow-100/20 transition-all duration-300 group/link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 text-zinc-400 group-hover/link:text-yellow-100 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}