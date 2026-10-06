import React from 'react';
import Image from "@/components/common/SmartImage";
import { cdnImg } from '@/lib/cdn';
import type { ArticleBlock } from '@/lib/cms/posts';

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
    
    {image && <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl ">
      <Image
        src={image}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        alt={title}
      />
    </div>}
  </div>
);

// Article body: text, heading, image and link blocks from the CMS.
export const OutcomeSection = ({ content }: { content?: ArticleBlock[] }) => {
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="space-y-12 md:space-y-16 mb-24 w-full">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={index}
                className="text-desk-section md:text-tab-h1 font-pop font-semibold text-white leading-tight pt-4"
              >
                {block.text}
              </h3>
            );

          case "image":
            return (
              <figure key={index} className="space-y-3">
                <div className="overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 bg-zinc-900 shadow-2xl">
                  <Image
                    src={block.image}
                    alt={block.caption || "Article image"}
                    width={0}
                    height={0}
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className="w-full h-auto"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-body-sm text-content font-pop font-light text-center opacity-70">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "link": {
            const external = /^https?:\/\//i.test(block.url);
            return (
              <div key={index}>
                <a
                  href={block.url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-[#8D794E]/50 bg-[#8D794E]/10 hover:bg-[#8D794E]/25 transition-colors font-pop text-body-sm md:text-body text-white"
                >
                  {block.label}
                  <span className="w-9 h-9 rounded-full bg-[#8D794E] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              </div>
            );
          }

          default:
            return (
              <div key={index} className="space-y-4">
                {block.heading && (
                  <h4 className="text-body-md md:text-desk-section text-white font-pop font-medium leading-tight">
                    {block.heading}
                  </h4>
                )}
                {block.text
                  .split(/\n\s*\n/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((p, j) => (
                    <p key={j} className="text-body-sm md:text-body text-content font-pop font-light leading-relaxed opacity-80 whitespace-pre-line">
                      {p}
                    </p>
                  ))}
              </div>
            );
        }
      })}
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