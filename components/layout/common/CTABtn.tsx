"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiPlus, FiRefreshCcw, FiX } from "react-icons/fi";

interface CTABtnProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  width?: "fit" | "full";
  showButtonBg?: boolean;
  showIconCircle?: boolean;
  showIcon?: boolean;
  showLabel?: boolean;
  iconPosition?: "left" | "right";
  btnBg?: string;
  btnHoverBg?: string;
  circleBg?: string;
  iconColor?: string;
  textColor?: string;
  iconType?: "arrow" | "reset" | "plus" | "x";
  className?: string;
  disabled?: boolean;
}

/**
 * Each size scales down on mobile and reaches the Figma spec on desktop.
 * md on desktop = Figma: 50px height, 40px circle, pl 24px, pr 5px.
 * Icon size is set with classes (not the `size` prop) so it can be responsive.
 */
const config = {
  sm: {
    h: "h-9 sm:h-10",
    circle: "w-7 h-7 sm:w-8 sm:h-8",
    icon: "w-3 h-3 sm:w-3.5 sm:h-3.5",
    text: "text-body-xs font-bai font-medium",
    px: "pl-3 pr-1 sm:pl-4",
    gap: "gap-2 sm:gap-3",
  },
  md: {
    h: "h-11 md:h-[50px]",
    circle: "w-9 h-9 md:w-10 md:h-10",
    icon: "w-4 h-4 md:w-5 md:h-5",
    text: "text-body font-bai font-medium",
    px: "pl-4 pr-1 md:pl-6 md:pr-1.5",
    gap: "gap-3 md:gap-6",
  },
  lg: {
    h: "h-12 md:h-14 lg:h-16",
    circle: "w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12",
    icon: "w-5 h-5 lg:w-6 lg:h-6",
    text: "text-body-md font-bai font-medium",
    px: "pl-5 pr-1 md:pl-6 md:pr-1.5 lg:pl-8 lg:pr-2",
    gap: "gap-4 md:gap-6 lg:gap-8",
  },
};

export default function CTABtn({
  label,
  href,
  onClick,
  size = "md",
  width = "fit",
  showButtonBg = true,
  showIconCircle = true,
  showIcon = true,
  showLabel = true,
  iconPosition = "right",
  iconType = "arrow",
  btnBg = "#F3E7D8",
  btnHoverBg = "#ffffff",
  circleBg = "#96865D",
  iconColor = "#ffffff",
  textColor = "#000000",
  className = "",
  disabled = false,
}: CTABtnProps) {
  const [hovered, setHovered] = useState(false);
  const cur = config[size];

  const rotates = iconType === "arrow" || iconType === "reset";
  const iconProps = { color: iconColor, className: cur.icon };

  const IconPart = showIcon && (
    <span
      className="flex items-center justify-center transition-transform duration-[400ms] ease-in-out"
      style={{ transform: hovered && rotates ? "rotate(45deg)" : "rotate(0deg)" }}
    >
      {iconType === "x" ? (
        <FiX {...iconProps} />
      ) : iconType === "plus" ? (
        <FiPlus {...iconProps} />
      ) : iconType === "reset" ? (
        <FiRefreshCcw {...iconProps} />
      ) : (
        <FiArrowUpRight {...iconProps} strokeWidth={2.5} />
      )}
    </span>
  );

  const CircleModule = (
    <span
      className={`${cur.circle} rounded-full flex items-center justify-center shrink-0 transition-colors duration-300`}
      style={{
        backgroundColor: showIconCircle ? circleBg : "transparent",
        order: iconPosition === "right" ? 2 : 0,
      }}
    >
      {IconPart}
    </span>
  );

  const LabelModule = showLabel && label && (
    <span
      className={`z-10 min-w-0 whitespace-nowrap ${width === "full" ? "truncate" : ""} ${cur.text}`}
      style={{ color: textColor, order: 1, padding: "5px 0" }}
    >
      {label}
    </span>
  );

  // Only hover with a real mouse — on phones, a tap fires mouseenter and the
  // button gets stuck in its hover colour.
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const onPointerLeave = () => setHovered(false);

  const classes = [
    "group relative inline-flex items-center overflow-hidden rounded-full transition-all duration-300",
    "select-none [-webkit-tap-highlight-color:transparent]",
    cur.h,
    cur.px,
    width === "full" ? "w-full" : "w-fit max-w-full",
    disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "cursor-pointer",
    className,
  ].join(" ");

  const style = {
    backgroundColor: showButtonBg ? (hovered ? btnHoverBg : btnBg) : "transparent",
  };

  const content = (
    <span
      className={`relative z-10 flex items-center w-full ${cur.gap} ${
        width === "full" ? "justify-between" : ""
      }`}
    >
      {LabelModule}
      {(showIcon || showIconCircle) && CircleModule}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className={classes}
        style={style}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {content}
    </button>
  );
}