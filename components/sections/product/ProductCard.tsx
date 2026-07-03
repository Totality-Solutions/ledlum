import Image from 'next/image';

export default function ProductCard({ title, category, image, itemCount, onClick, isPriority = false }: any) {
  return (
    <div 
      onClick={onClick}
      className="group p-2 lg:p-3 border border border-[#444444] rounded-[16px] lg:rounded-[25px] transition-all duration-500 cursor-pointer hover:border-white/30 hover:bg-[#444444]/20 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="aspect-square relative rounded-[12px] overflow-hidden border border-[#444444] mb-4">
          <Image 
            src={image} 
            alt={title} 
            fill 
            priority={isPriority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-1 justify-between items-center p-1 lg:py-2 lg:px-4 lg:bg-[#111111] group-hover:bg-[#000000] rounded-[18px] transition-colors duration-500">
          <div className="flex w-full items-center justify-between text-left truncate pr-2">
            <span className="text-body-xxs lg:text-body-xxs font-pop font-regular text-white transition-colors duration-500 group-hover:text-[#888888]/80 truncate">
              {category}
            </span>
          <div className="flex w-8 h-8 shrink-0 rounded-full items-center justify-center transition-all duration-500">
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

          {/* Action Icon Section */}
          <div className="flex items-center w-full justify-between">
            <span className="text-body-xs lg:text-body-sm font-pop font-regular text-white transition-colors duration-500 group-hover:text-[#888888]/80 truncate">
              {title}
            </span>
            {itemCount !== undefined && (
              <div className="flex items-center justify-between text-[11px] text-white/40 font-pop">
                <span className="font-pop font-regular text-white transition-colors duration-500 group-hover:text-[#888888]/80 truncate">
                  {itemCount} 
                <span className='pl-1'>{itemCount === 1 ? 'Product' : 'Products'}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Counter block appended cleanly at the bottom container margin boundary */}
    </div>
  );
}