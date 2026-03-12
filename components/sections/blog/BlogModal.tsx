"use client";
import React, { memo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroPost: any;
  modalSections: any[];
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, heroPost, modalSections }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      // document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      
      // Reset modal scroll position to top when opening
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container - Centered regardless of page scroll */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-[1200px] max-h-[90vh] bg-[#0a0a0a] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col overflow-hidden rounded-2xl my-auto"
        style={{
          // This ensures the modal stays centered regardless of page scroll
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={onClose}
            className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/10 group transition-all"
            aria-label="Close modal"
          >
            <X className="text-2xl text-white group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="overflow-y-auto h-full hide-scrollbar">
          <section className="relative w-full" style={{ aspectRatio: '21/9', maxHeight: '400px' }}>
            {heroPost?.image && (
              <Image
                src={heroPost.image}
                alt={heroPost.category ?? 'Hero'}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </section>

          <section className="py-12 md:py-16 px-6 md:px-12">
            <div className="max-w-4xl">
              <h2 className="font-pop md:text-desk-h1 text-white font-medium tracking-tighter mb-8">
                {heroPost?.category}.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8 mt-12">
                {[
                  { label: 'Reading Time', value: '5 min read' },
                  { label: 'Released', value: 'Feb 2026' },
                  { label: 'Author', value: 'LedLum Team' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-white/40 text-body-xs capitalize mb-2 font-medium font-pop">{label}</div>
                    <div className="text-white/80 text-body-xs font-medium font-pop">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="px-6 md:px-12 space-y-24 md:space-y-32 pb-24">
            {modalSections.map((section: any, idx: number) => (
              <section
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center"
              >
                <div className={`${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <h3 className="font-pop text-desk-section text-logo">
                    {section.title}
                  </h3>
                  <p className="font-pop text-body text-white/60 font-regular">
                    {section.text}
                  </p>
                </div>
                <div
                  className={`${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} relative rounded-2xl overflow-hidden border border-white/5`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BlogModal);