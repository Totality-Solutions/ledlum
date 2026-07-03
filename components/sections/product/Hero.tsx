import Image from 'next/image';

export default function Hero({ heroBannerImage }: { heroBannerImage: string }) {
  return (
    <section className="relative w-full h-[20vh] sm:h-[50vh] lg:h-[90vh] min-h-[200px] max-h-[900px] flex items-start justify-start overflow-hidden">
      <Image
        src={heroBannerImage || '/images/home/home-hero.webp'}
        alt="Collection Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 transition-transform duration-1000 hover:scale-105" 
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      />
    </section>
  );
}