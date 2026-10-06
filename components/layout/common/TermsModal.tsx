"use client";
import React, { memo, useEffect, useRef } from 'react';
import { X } from '@/lib/icons';
import type { LegalContent } from "@/lib/cms/defaults";
import LegalSections from "./LegalSections";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: LegalContent;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, content }) => {
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
              {content.title}
            </h2>
            {content.effectiveDate && (
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1 font-pop">
              {content.effectiveDate}
            </p>
            )}
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
            <LegalSections sections={content.sections} />
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