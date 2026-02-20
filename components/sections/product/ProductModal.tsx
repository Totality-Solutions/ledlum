"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProductModal({ product, onClose }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [product]);

  if (!product || !mounted) return null;

  const ModalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm will-change-filter" 
          style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }} 
        />
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} 
          animate={{ scale: 1, y: 0 }} 
          className="relative w-full max-w-[360px] bg-[#2A2A2A] rounded-[40px] p-8 border border-white/10 shadow-2xl"
        >
          <div className="aspect-square relative w-full bg-[#333333] rounded-[25px] mb-6 overflow-hidden">
            <Image 
              src={product.image} 
              alt="Detail" 
              fill 
              className="object-cover" 
              sizes="(max-width: 360px) 100vw, (max-width: 768px) 50vw" 
              priority={false} />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
            Lighting is not just about brightness. It&apos;s about mood. Productivity. Comfort. Atmosphere.
          </p>
          <div className="bg-[#111111] p-4 rounded-2xl flex justify-between items-center text-white">
            <span className="text-sm">Product Groups</span>
            <span className="text-lg">→</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(ModalContent, document.body);
}