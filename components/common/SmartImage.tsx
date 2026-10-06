"use client";

import { forwardRef, useEffect, useState } from "react";
import NextImage, { type ImageProps } from "next/image";
import { isOptimizableSrc, placeholderUrl, LOW_BANDWIDTH_QUALITY } from "@/lib/imageLoader";

export type { StaticImageData } from "next/image";

// Drop-in replacement for next/image used across the public site.
//
// - Right-sized images: the global loader (lib/imageLoader.ts) serves a
//   pre-generated WebP at the width the device needs.
// - Network-aware: on a slow or data-saver connection, images that haven't
//   started downloading yet step down one size.
// - Progressive: a 64px copy shows (soft, low clarity) straight away, with a
//   spinner on top, until the real image has loaded and fades in.
// - Safe: if a resized copy is missing it falls back to the original file.

type SmartImageProps = ImageProps & {
  // Spinner over the image while it loads. Defaults to on, except for
  // decorative backgrounds (alt text like "Background" / "texture").
  showLoader?: boolean;
};

const DECORATIVE_ALT = /background|texture|watermark|overlay|decorative/i;

function isSlowConnection(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  return Boolean(conn.saveData) || ["slow-2g", "2g", "3g"].includes(conn.effectiveType);
}

const SmartImage = forwardRef<HTMLImageElement, SmartImageProps>(function SmartImage(
  { showLoader, onLoad, onError, style, className, quality, priority, ...props },
  ref
) {
  const src = typeof props.src === "string" ? props.src : "";
  const optimizable = src !== "" && isOptimizableSrc(src);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [slow, setSlow] = useState(false);

  // Read after mount (not during render) so server and client HTML match.
  useEffect(() => setSlow(isSlowConnection()), []);
  // New image → show the placeholder/spinner again.
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  const placeholder = optimizable && !failed ? placeholderUrl(src) : null;
  const wantsLoader = (showLoader ?? !DECORATIVE_ALT.test(String(props.alt || ""))) && props.fill;

  return (
    <>
      <NextImage
        ref={ref}
        {...props}
        priority={priority}
        // Original file when it isn't one of ours, or its resized copy failed.
        unoptimized={!optimizable || failed || props.unoptimized}
        quality={slow && !priority ? LOW_BANDWIDTH_QUALITY : quality}
        className={className}
        style={{
          ...style,
          ...(placeholder && !loaded
            ? {
                backgroundImage: `url("${placeholder}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : null),
        }}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          if (optimizable && !failed) setFailed(true);
          else onError?.(e);
        }}
      />
      {wantsLoader && !loaded && (
        <span
          aria-hidden="true"
          className="smart-image-loader pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        >
          <span className="w-7 h-7 rounded-full border-2 border-white/25 border-t-white/80 animate-spin" />
        </span>
      )}
    </>
  );
});

export default SmartImage;
