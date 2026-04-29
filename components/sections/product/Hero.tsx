import Image from 'next/image';
import heroImage from '@/public/images/home/home-hero.webp'; // Make sure this path exists

export default function Hero({ heroBannerImage }: { heroBannerImage: string }) {
  return (
    <section className="relative w-full h-[20vh] sm:h-[50vh] lg:h-[90vh] min-h-[200px] max-h-[900px] flex items-start justify-start overflow-hidden">
      <Image
        src={heroBannerImage || heroImage}
        alt="Collection Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 transition-transform duration-1000 hover:scale-105 will-change-transform" 
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      />
    </section>
  );
}