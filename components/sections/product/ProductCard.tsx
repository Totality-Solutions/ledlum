import Image from 'next/image';

export default function ProductCard({ title, category, image, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="group p-3 border border-[#444444] rounded-[25px] transition-all duration-500 cursor-pointer hover:border-white/30 hover:bg-[#444444]/20"
    >
      {/* Image Container */}
      <div className="aspect-square relative rounded-[18px] overflow-hidden border border-[#444444] mb-4">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>

      {/* Content Area */}
      <div className="flex justify-between items-center p-2 lg:p-4 lg:bg-[#111111] group-hover:bg-[#000000] rounded-[18px] transition-colors duration-500">
        <div className="flex flex-col text-left">
          <span className="body text-white transition-colors duration-500 group-hover:text-[#888888]/80">
            {title}
          </span>
        </div>

        {/* Action Icon Section */}
        <div className="hidden md:flex w-8 h-8 shrink-0 rounded-full items-center justify-center transition-all duration-500">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            className="transition-transform duration-500 rotate-45 group-hover:rotate-0"
          >
            <path 
              d="M1 11L11 1M11 1H3M11 1V9" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}