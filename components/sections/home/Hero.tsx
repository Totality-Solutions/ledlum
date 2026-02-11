import Image from 'next/image';
import heroImage from '@/public/images/home/home-hero.png'; 
export default function Hero() {
  return (
    <section className="relative w-full h-[675px] flex items-center justify-center bg-gray-900">
      <Image
        src={heroImage}
        alt="Hero Background"
        fill
        priority
        className="object-cover z-0"
      />
    </section>
  );
}