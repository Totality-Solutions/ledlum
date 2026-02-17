import Image from 'next/image';
import heroImage from '@/public/images/home/home-hero.png'; 

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-screen min-h-[450px] max-h-[700px] lg:max-h-[1000px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* 1. The Background Image */}
      <Image
        src={heroImage}
        alt="Hero Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0 transition-transform duration-1000 hover:scale-105"
      />
    </section>
  );
}