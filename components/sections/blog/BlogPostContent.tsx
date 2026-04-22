import React from 'react';
import Image from 'next/image';

// Updated MidSection to handle an array of strings for multiple paragraphs
export const MidSection = ({ title, paragraph, image }: { 
  title: string, 
  paragraph: string[], // Changed to array
  image: string 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start mb-12">
    <div className="space-y-8 md:space-y-10 lg:sticky lg:top-32">
      <h3 className="font-pop text-body-md md:text-desk-section capitalize text-white leading-tight">
        {title}
      </h3>

      <div className="space-y-6 md:space-y-8">
        {/* Mapping through the array to render multiple paragraphs */}
        {paragraph.map((text, index) => (
          <p key={index} className="text-body-sm md:text-body text-content font-pop font-light leading-relaxed opacity-90">
            {text}
          </p>
        ))}
        
        <div className="w-20 h-1 bg-[#8D794E]/40 rounded-full" />
      </div>
    </div>
    
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ">
      <Image
        src={image}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        alt={title}
      />
    </div>  
  </div>
);

export const OutcomeSection = ({ content }: { 
  content?: { heading?: string, text: string }[] 
}) => {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="space-y-16 md:space-y-24 mb-24 w-full">
      <div className="space-y-8">
        <div className="space-y-12 md:space-y-16">
          {content.map((item, index) => (
            <div key={index} className="space-y-4">
              {item.heading && (
                <h4 className="text-body-md md:text-desk-section text-white font-pop font-medium leading-tight">
                  {item.heading}
                </h4>
              )}
              <p className="text-body-sm md:text-body text-content font-pop font-light leading-relaxed opacity-80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BackButton = () => (
  <div className="absolute top-[20px] min-w-[110px] md:min-w-[140px] left-1 md:left-12 lg:left-16 z-30 pointer-events-none font-pop">
    <a
      href="/blog"
      className="pointer-events-auto group flex items-center gap-3 px-2 py-2 rounded-full border border-white/10 bg-[#111111]/30 backdrop-blur-md transition-all duration-500"
    >
      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center transition-colors group-hover:bg-[#8D794E]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="text-body-sm md:text-body-sm lg:text-body text-white font-pop font-medium pl-2">Back</span>
    </a>
  </div>
);