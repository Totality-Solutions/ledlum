import React from 'react';
import Image from 'next/image';

// Sub-component for the Bullet Point List Section
export const MidSection = ({ title, list, image,paragraph }: { title: string, list: string[], image: string,paragraph:string }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center mb-24">
    <div className="space-y-8 md:space-y-10">
      <h3 className="font-pop text-body-md md:text-desk-section capitalize">
        {title}
      </h3>

      <p>
        {paragraph}
      </p>


      <ul className="space-y-4 md:space-y-5">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
            <span className="text-body-sm font-pop font-regular text-content">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl rounded-sm">
      <Image
        src={image}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        alt="Detail View"
      />
    </div>
  </div>
);

// Sub-component for the Outcome/Result Section
export const OutcomeSection = ({ description, image }: { description: string, image: string }) => (
  <div className="space-y-12 md:space-y-16 mb-24">
    <div className="space-y-6">
      <h5 className="text-body-xs text-content font-pop capitalize font-regular">The Outcome</h5>
      <p className="text-body-md md:text-desk-section text-content font-pop capitalize font-regular">
        {description}
      </p>
    </div>
    <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900 rounded-sm">
      <Image
        src={image}
        fill
        sizes="100vw"
        className="object-cover"
        alt="Project Result"
      />
    </div>
  </div>
);

export const BackButton = () => (
  <div className="absolute top-[20px] min-w-[140px] left-1 md:left-12 lg:left-16 z-30 pointer-events-none font-pop">
    <a
      href="/blog"
      className="pointer-events-auto group flex items-center gap-3 px-2 py-2 rounded-full border border-white/10 bg-[#111111]/30 backdrop-blur-md transition-all duration-500"
    >
      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </div>
      <span className="text-body text-black font-pop font-medium pl-2">Back</span>
    </a>
  </div>
);