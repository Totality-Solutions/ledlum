// components/common/PopupForm.tsx
"use client";

import React from "react";

interface PopupFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PopupForm = ({ isVisible, onClose }: PopupFormProps) => {
  return (
    <div
  className={`w-[320px] transition-all duration-700 ease-out ${
    isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10 pointer-events-none"
  }`}
>
      <div className="bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-black p-6 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">Fast Inquiry</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Get a response today</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* Form Body - State is preserved because component stays mounted */}
        <form className="p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-black placeholder:text-gray-400"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-black placeholder:text-gray-400"
          />
          <textarea 
            placeholder="How can we help?" 
            rows={2}
            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-black resize-none placeholder:text-gray-400"
          />
          <button 
            type="submit" 
            className="w-full bg-black py-4 rounded-2xl font-bold text-white hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.97]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};