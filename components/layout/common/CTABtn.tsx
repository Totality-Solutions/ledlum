"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface CTABtnProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  width?: 'fit' | 'full';
  
  // --- PART 1: MODULE TOGGLES ---
  showButtonBg?: boolean;   // Main body
  showIconCircle?: boolean; // The circle bg
  showIcon?: boolean;       // The arrow/icon
  showLabel?: boolean;      // The text
  
  // --- PART 2: POSITIONING ---
  iconPosition?: 'left' | 'right';
  
  // --- PART 3: COLOR MODULES ---
  btnBg?: string;          // Default: Beige
  btnHoverBg?: string;     // Default: White
  circleBg?: string;       // Default: Gold
  iconColor?: string;      // Default: White
  textColor?: string;      // Default: Dark
  
  // --- PART 4: ICON TYPE ---
  iconType?: 'arrow' | 'plus' | 'x';
  className?: string;
}

export default function CTABtn({
  label,
  href,
  onClick,
  size = 'md',
  width = 'fit',
  showButtonBg = true,
  showIconCircle = true,
  showIcon = true,
  showLabel = true,
  iconPosition = 'right',
  iconType = 'arrow',
  
  // Modular Color Defaults
  btnBg = "#ece3d4", 
  btnHoverBg = "#ffffff",
  circleBg = "#9a8c66",
  iconColor = "#ffffff",
  textColor = "#1a1a1a",
  
  className = "",
}: CTABtnProps) {
  const [hovered, setHovered] = useState(false);

  // Configuration for scaling
  const config = {
    sm: { h: "h-10", circle: "w-8 h-8", text: "text-[13px]", px: "px-4", iconSize: 14, stroke: 2 },
    md: { h: "h-14", circle: "w-11 h-11", text: "text-[15px]", px: "px-6", iconSize: 18, stroke: 3 },
    lg: { h: "h-20", circle: "w-16 h-16", text: "text-[19px]", px: "px-8", iconSize: 24, stroke: 3 },
  };
  const cur = config[size];

  // MODULE: THE ICON (MANUALLY DRAWN SVGS)
  const IconPart = showIcon && (
    <div 
      className="flex items-center justify-center transition-transform duration-300"
      style={{ transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)' }}
    >
      {iconType === 'x' ? (
        <svg width={cur.iconSize} height={cur.iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth={cur.stroke} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : iconType === 'plus' ? (
        <svg width={cur.iconSize} height={cur.iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth={cur.stroke} strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ) : (
        /* Manual FiArrowUpRight Equivalent */
        <svg width={cur.iconSize} height={cur.iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth={cur.stroke} strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      )}
    </div>
  );

  // MODULE: THE CIRCLE BACKGROUND
  const CircleModule = (
    <div 
      className={`${cur.circle} rounded-full flex items-center justify-center shrink-0`}
      style={{ 
        backgroundColor: showIconCircle ? circleBg : 'transparent',
        order: iconPosition === 'left' ? 0 : 2 
      }}
    >
      {IconPart}
    </div>
  );

  // MODULE: THE TEXT LABEL
  const LabelModule = showLabel && label && (
    <span 
      className={`font-pop font-bold tracking-tight capitalize z-10 ${cur.text}`} 
      style={{ color: textColor, order: 1 }}
    >
      {label}
    </span>
  );

  const commonProps = {
    className: `group relative flex items-center overflow-hidden rounded-full transition-all duration-300 ${cur.h} ${width === 'full' ? 'w-full' : 'w-fit'} ${cur.px} ${className}`,
    style: { 
      backgroundColor: showButtonBg ? (hovered ? btnHoverBg : btnBg) : 'transparent',
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick
  };

  const Component = href ? Link : 'button';
  
  return (
    //@ts-ignore
    <Component {...(href ? { ...commonProps, href } : commonProps)}>
      <div className={`relative z-10 flex items-center ${showLabel ? 'justify-between' : 'justify-center'} w-full gap-4`}>
        {(showIcon || showIconCircle) && CircleModule}
        {LabelModule}
      </div>
    </Component>
  );
}