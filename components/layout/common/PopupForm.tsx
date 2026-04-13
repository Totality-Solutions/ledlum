
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PopupFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PopupForm = ({ isVisible, onClose }: PopupFormProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="fixed bottom-6 right-6 z-[100] w-[90%] max-w-[350px] bg-black/90 backdrop-blur-md border border-white/20 p-6 rounded-[20px] shadow-2xl "
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            ✕
          </button>
          <h3 className="text-white font-pop font-semibold text-lg mb-4">Connect With Us</h3>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-logo transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-logo transition-colors"
            />
            <button className="bg-logo text-black font-pop font-bold py-2 rounded-lg hover:bg-logo/80 transition-all active:scale-95">
              Submit
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
