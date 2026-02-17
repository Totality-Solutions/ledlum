import { Container } from "@/components/layout/Container";

export default function AboutHero() {
  const stats = [
    { 
      title: "Who We Are", 
      desc: "A forward-thinking lighting solutions company focused on energy-efficient LED technologies." 
    },
    { 
      title: "Since When", 
      desc: "Founded with expertise in modern lighting design and technical innovation." 
    },
    { 
      title: "What We Do", 
      desc: "Designs and delivers high-performance LED solutions for residential and commercial spaces." 
    },
    { 
      title: "Core Expertise", 
      desc: "Outdoor & indoor LED lighting, linear lighting, task lighting, customized systems." 
    }
  ];

  return (
    <section className="bg-black text-white pt-32 pb-32 md:pb-60 overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <Container className="mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <div className="max-w-3xl">
            {/* font-bai used for Heading - Removed uppercase */}
            <h1 className="font-bai text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] md:leading-[1]">
              Illuminating Spaces – <br />
              <span className=" font-medium ">Inspiring Lives</span>
            </h1>
          </div>
          <div className="max-w-[350px]">
            {/* font-pop used for Description */}
            <p className="font-pop text-zinc-500 text-xs sm:text-sm leading-relaxed text-left md:text-right tracking-wide">
              Transforming architectural lighting through innovation, performance and design excellence.
            </p>
          </div>
        </div>
      </Container>

      {/* 2. MAIN IMAGE - Responsive Border & Height */}
      <div className="relative w-full h-[30vh] sm:h-[45vh] lg:h-[60vh] mb-16 md:mb-24 border-y border-white/10">
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-50 transition-opacity duration-700 hover:opacity-70"
        />
      </div>

      {/* 3. GRID SECTION - Staggered Responsive Layout */}
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative items-start gap-y-12 sm:gap-y-20 lg:gap-y-0">
          {stats.map((item, i) => (
            <div 
              key={i} 
              className={`relative px-6 sm:px-8 lg:px-10 py-8 lg:py-12 flex flex-col justify-center group transition-all duration-700
                
                /* DESKTOP STAIRCASE (lg and up) */
                ${i === 1 ? "lg:translate-y-16" : ""}
                ${i === 2 ? "lg:translate-y-32" : ""}
                ${i === 3 ? "lg:translate-y-48" : ""}

                /* TABLET STAGGER (sm: only) */
                ${i % 2 !== 0 ? "sm:translate-y-10 lg:translate-y-auto" : ""}
              `}
            >
              {/* VERTICAL LINE (Shows on Tablet/Desktop) */}
              <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 group-hover:bg-[#c5a367]/50 transition-colors duration-500" />
              
              {/* HORIZONTAL LINE (Shows on Mobile only as separator) */}
              <div className="absolute left-0 top-0 w-full h-[1px] sm:hidden bg-white/10" />
              
              {/* CONTENT */}
              <div className="relative z-10">
                {/* <span className="font-bai text-[10px] text-[#c5a367] mb-3 block opacity-60 tracking-widest font-bold">
                  0{i + 1}
                </span> */}
                {/* font-bai for Item Title - No uppercase */}
                <h3 className="font-bai text-xl sm:text-2xl font-medium mb-4 tracking-tight leading-snug group-hover:text-[#c5a367] transition-colors duration-300">
                   {item.title}
                </h3>
                {/* font-pop for Item Description */}
                <p className="font-pop text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-light max-w-full lg:max-w-[210px] group-hover:text-zinc-200 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
