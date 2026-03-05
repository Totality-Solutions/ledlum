

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { GetInTouch } from "@/components/layout/footer/GetInTouch";
import Section from "@/components/layout/Section";
import { Linkedin } from "lucide-react"; 

export default function Team() {
  const team = [
    { 
      name: "Sumeet Malhotra", 
      role: "Director & Founder - Ledlum", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop" 
    },
    { 
      name: "Sumeet Malhotra", 
      role: "Director & Founder - Ledlum", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop" 
    },
    { 
      name: "Sumeet Malhotra", 
      role: "Director & Founder - Ledlum", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop" 
    },
    { 
      name: "Sumeet Malhotra", 
      role: "Director & Founder - Ledlum", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop" 
    },
    { 
      name: "Sumeet Malhotra", 
      role: "Director & Founder - Ledlum", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop" 
    },
  ];

  return (
    <Section className="bg-black text-white  overflow-hidden !px-0  !py-0" >
      <Container className="relative z-10 !max-w-none px-6 md:px-[8vw] py-16 overflow-hidden">
        
        {/* Background Decorative Box - Optimized */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
           <Image 
            src="/images/about/ledlumbox.png"
            alt="box background"
            fill
            className="object-cover object-center"
           />
        </div>

        {/* 3-Column Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* 1. HEADER SECTION */}
          <div className="flex flex-col justify-start pt-10 pr-4">
            <h2 className="font-bai leading-tight text-white mb-6">
              <span className="block font-bold text-[40px] md:text-[48px] tracking-tight">
                Meet Our.
              </span>
              <span className="block font-light text-[24px] md:text-[28px] opacity-90">
                Visionaries.
              </span>
            </h2>
            <p className="font-pop text-[15px] md:text-[16px] text-zinc-100 leading-relaxed font-light max-w-[320px]">
              To Deliver Lighting Systems That Enhance Environments Through Energy Efficiency, 
              Aesthetic Appeal, And Engineered Performance.
            </p>
          </div>

          {/* 2. TEAM CARDS */}
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-[#0F0F0F] p-6 md:p-8 flex flex-col rounded-[32px] border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden mb-6 rounded-[24px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Area */}
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bai text-[20px] md:text-[22px] font-bold text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[12px] text-zinc-500 font-light">
                    {member.role}
                  </p>
                </div>
                
                {/* LinkedIn Icon */}
                <a 
                  href="#" 
                  className="bg-[#0077B5] p-1.5 rounded-sm mb-1 hover:scale-110 transition-transform flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn Profile`}
                >
                  <Linkedin className="w-3.5 h-3.5 text-white fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <GetInTouch />
    </Section>
  );
}