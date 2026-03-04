import Image from 'next/image';

export default function ProductCard({ title, category, image, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      /* Using border color from your vars if needed, or keeping the dark theme aesthetic */
      className="group p-3 border border-[#444444] rounded-[25px] transition-all duration-500 cursor-pointer hover:border-white/30"
    >
      {/* Image Container */}
      <div className="aspect-square relative rounded-[18px] overflow-hidden border border-[#444444] mb-4">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          unoptimized
        />
      </div>

      {/* Content Area */}
      <div className="flex justify-between items-center p-2 lg:p-4 lg:bg-[#111111] rounded-[18px]">
        <div className="flex flex-col text-left">
          {/* CATEGORY: 
            Using 'body-xs' for the 0.75rem size and Poppins font.
            Added manual tracking-widest as per your design.
          */}
          <span className="body-xs text-gray-500 mb-1">
            {category}
          </span>

          {/* TITLE: 
            Using 'body' class for 1rem Poppins font.
            Removed manual text-base/font-light to let the global class handle it.
          */}
          <span className="body-xs text-white ">
            {title}
          </span>
        </div>

        {/* Action Icon */}
        <div className="hidden md:flex w-8 h-8 shrink-0 rounded-full border border-white/10  items-center justify-center group-hover:bg-white transition-all">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-45">
            <path 
              d="M1 11L11 1M11 1H3M11 1V9" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="stroke-white group-hover:stroke-black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}