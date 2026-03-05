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
  showButtonBg?: boolean;
  showIconCircle?: boolean;
  showIcon?: boolean;
  showLabel?: boolean;
  iconPosition?: 'left' | 'right';
  btnBg?: string;
  btnHoverBg?: string;
  circleBg?: string;
  iconColor?: string;
  textColor?: string;
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
  // Updated defaults to match Figma:
  btnBg = "#F3E7D8", 
  btnHoverBg = "#ffffff",
  circleBg = "#96865D",
  iconColor = "#ffffff",
  textColor = "#000000",
  className = "",
}: CTABtnProps) {
  const [hovered, setHovered] = useState(false);

  /**
   * Refined scaling based on Figma logic:
   * padding-left: 24px (pl-6)
   * padding-right: 5px (pr-1.5)
   * padding-top/bottom: 5px
   */
  const config = {
    sm: { h: "h-10", circle: "w-8 h-8", text: "text-[14px]", px: "pl-4 pr-1", gap: "gap-3", iconSize: 14 },
    md: { h: "h-[50px]", circle: "w-[40px] h-[40px]", text: "text-[18px]", px: "pl-6 pr-1.5", gap: "gap-6", iconSize: 20 },
    lg: { h: "h-16", circle: "w-12 h-12", text: "text-[20px]", px: "pl-8 pr-2", gap: "gap-8", iconSize: 24 },
  };
  
  const cur = config[size];

  // MODULE: THE ICON
  const IconPart = showIcon && (
    <div 
      className="flex items-center justify-center transition-transform duration-500 ease-in-out"
      style={{ transform: hovered && iconType === 'arrow' ? 'rotate(45deg)' : 'rotate(0deg)' }}
    >
      {iconType === 'x' ? <FiX size={cur.iconSize} color={iconColor} /> :
       iconType === 'plus' ? <FiPlus size={cur.iconSize} color={iconColor} /> :
       <FiArrowUpRight size={cur.iconSize} color={iconColor} strokeWidth={2.5} />}
    </div>
  );

  // MODULE: THE CIRCLE BACKGROUND
  const CircleModule = (
    <div 
      className={`${cur.circle} rounded-full flex items-center justify-center shrink-0 transition-colors duration-300`}
      style={{ 
        backgroundColor: showIconCircle ? circleBg : 'transparent',
        // In Figma, the circle is on the right, so we use order: 2
        order: iconPosition === 'right' ? 2 : 0 
      }}
    >
      {IconPart}
    </div>
  );

  // MODULE: THE TEXT LABEL
  const LabelModule = showLabel && label && (
    <span 
      className={`font-pop font-normal z-10 whitespace-nowrap ${cur.text}`} 
      style={{ 
        color: textColor, 
        order: 1,
        // Match Figma's "Our Story" padding-left/right if needed inside the container
        padding: '5px 0' 
      }}
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
      <div className={`relative z-10 flex items-center ${cur.gap} w-full`}>
        {/* The order of these is handled by the "order" style property in the modules */}
        {LabelModule}
        {(showIcon || showIconCircle) && CircleModule}
      </div>
    </Component>
  );
}