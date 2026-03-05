"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiPlus, FiX } from "react-icons/fi";

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
  // const config = {
  //   sm: { h: "h-10", circle: "w-8 h-8", text: "text-[13px]", px: "px-4", iconSize: 14 },
  //   md: { h: "h-14", circle: "w-11 h-11", text: "text-[15px]", px: "px-6", iconSize: 18 },
  //   lg: { h: "h-20", circle: "w-16 h-16", text: "text-[19px]", px: "px-8", iconSize: 24 },
  // };

  // Configuration for scaling - Adjusted for asymmetrical padding
  const config = {
    sm: { h: "h-10", circle: "w-8 h-8", text: "text-[13px]", px: "pl-5 pr-1", iconSize: 14 },
    md: { h: "h-14", circle: "w-11 h-11", text: "text-[15px]", px: "pl-7 pr-1.5", iconSize: 18 },
    lg: { h: "h-20", circle: "w-16 h-16", text: "text-[19px]", px: "pl-10 pr-2", iconSize: 24 },
  };
  const cur = config[size];

  // MODULE: THE ICON
  const IconPart = showIcon && (
    <div 
      className="flex items-center justify-center transition-transform duration-300"
      style={{ transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)' }}
    >
      {iconType === 'x' ? <FiX size={cur.iconSize} color={iconColor} /> :
       iconType === 'plus' ? <FiPlus size={cur.iconSize} color={iconColor} /> :
       <FiArrowUpRight size={cur.iconSize} color={iconColor} strokeWidth={3} />}
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
    className: `group relative flex items-center overflow-hidden rounded-full ${cur.h} ${width === 'full' ? 'w-full' : 'w-fit'} ${cur.px} ${className}`,
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