import { Container } from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { url } from "inspector";
// Updated import to avoid deprecation warning
import { LinkedinIcon } from "lucide-react"; 

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
    <Section 
  className=" text-white py-16 md:py-32 lg:py-48 overflow-hidden  bg-[url('/images/about/ledlum-bg.png')] bg-cover bg-center" >

      <Container className="relative z-10 !max-w-none px-6 md:px-[5vw] lg:px-[74px]">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 gap-x-6 lg:gap-x-12">
          
          {/* 1. HEADER SECTION */}
          <div className="flex flex-col justify-center mb-4 md:mb-0 pr-0 md:pr-10">
            <h2 className="font-bai leading-[1.1] text-white mb-6 md:mb-8">
              <span className="block font-light text-[clamp(2rem,4vw,3rem)] text-white mb-1">
                Meet Our
              </span>
              <span className="block font-bold text-[clamp(1.5rem,3vw,2rem)] text-white tracking-tight  opacity-80">
                Visionaries
              </span>
            </h2>
            <p className="font-pop text-[clamp(1.125rem,2vw,1.5rem)] text-white leading-relaxed font-light max-w-md opacity-80">
              Delivering lighting systems that enhance environments through energy efficiency, 
              aesthetic appeal, and engineered performance.
            </p>
          </div>

          {/* 2. TEAM CARDS */}
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-[#0A0A0A] p-5 md:p-6 lg:p-8 flex flex-col transition-all duration-500 border border-white/5 hover:border-white/20 rounded-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 md:mb-8 bg-zinc-900 rounded-xl">
                <img
                  src={workingImage}
                  alt={member.name}
                  // No grayscale here as requested
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="flex justify-between items-end mt-auto">
                <div className="flex-grow pr-4">
                  <h4 className="font-bai text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-white mb-1 md:mb-2">
                    {member.name}
                  </h4>
                  <p className="text-[10px] md:text-[11px] text-white/50 tracking-[0.15em] font-medium ">
                    {member.role}
                  </p>
                </div>
                
                <a 
                  href="#" 
                  className="bg-white/5 p-3 md:p-3.5 rounded-lg hover:bg-white/20 transition-all duration-500 border border-white/10 flex-shrink-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Using the non-deprecated LinkedinIcon */}
                  <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}