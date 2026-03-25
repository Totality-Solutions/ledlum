"use client";
import React, { memo, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.position = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.position = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen z-[9999] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-[1000px] max-h-[85vh] bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 flex flex-col rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
          <div>
            <h2 className="text-2xl md:text-3xl font-pop font-bold text-white tracking-tight">
              Terms & Conditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 group transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-8 md:p-12 scrollbar-thin scrollbar-thumb-white/10">
          <div className="max-w-3xl mx-auto space-y-12 text-white/70 font-pop leading-relaxed">
            
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">1. Agreement to Terms</h3>
              <p>
                By accessing and using the services provided by LEDLUM, you agree to be bound by these 
                Terms and Conditions. These terms apply to all visitors, users, and others who access 
                or use our architectural lighting solutions and digital platforms.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">2. Intellectual Property</h3>
              <p>
                The content, designs, custom fabrication techniques, and technical documentation 
                found on this website are the exclusive property of LEDLUM. You may not reproduce, 
                distribute, or create derivative works without explicit written consent.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">3. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials on LEDLUM's 
                website for personal, non-commercial transitory viewing only. This is the grant of 
                a license, not a transfer of title.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/60">
                <li>You may not modify or copy the materials.</li>
                <li>You may not use the materials for any commercial purpose.</li>
                <li>You may not attempt to reverse engineer any software or design.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">4. Disclaimer</h3>
              <p>
                The materials on LEDLUM's website are provided on an 'as is' basis. LEDLUM makes no 
                warranties, expressed or implied, and hereby disclaims all other warranties 
                including, without limitation, implied warranties of merchantability or fitness 
                for a particular purpose.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white">5. Limitations</h3>
              <p>
                In no event shall LEDLUM or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business 
                interruption) arising out of the use or inability to use the materials on 
                our website.
              </p>
            </section>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-end px-8">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-white text-black rounded-full font-pop font-bold hover:bg-white/90 transition-all active:scale-95 uppercase text-xs tracking-widest"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TermsModal);