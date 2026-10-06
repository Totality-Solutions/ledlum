"use client";

import { forwardRef, useCallback, useEffect, useState } from "react";
import NextImage, { type ImageProps } from "next/image";
import { isOptimizableSrc, placeholderUrl, LOW_BANDWIDTH_QUALITY } from "@/lib/imageLoader";
import ImageLoader from "./ImageLoader";

export type { StaticImageData } from "next/image";

// Drop-in replacement for next/image used across the public site.
//
// - Right-sized images: the global loader (lib/imageLoader.ts) serves a
//   pre-generated WebP at the width the device needs.
// - Network-aware: on a slow or data-saver connection, images that haven't
//   started downloading yet step down one size.
// - Progressive: a 64px copy shows (soft, low clarity) straight away, with the
//   ImageLoader animation on top, until the real image has loaded and fades in.
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

  // Loaded/failed are remembered per src rather than reset in an effect:
  // a cached image (e.g. after navigating back) reports "loaded" during the
  // very first commit, and an effect resetting state afterwards would wipe
  // that out — the image never fires load again, so the loader spun forever.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;
  const failed = failedSrc === src;
  const [slow, setSlow] = useState(false);

  // Read after mount (not during render) so server and client HTML match.
  useEffect(() => setSlow(isSlowConnection()), []);

  // Safety net: if the browser already has the image fully decoded when the
  // element attaches, mark it loaded even if no load event comes through.
  const imgRef = useCallback(
    (img: HTMLImageElement | null) => {
      if (img && img.complete && img.naturalWidth > 0) setLoadedSrc(src);
      if (typeof ref === "function") ref(img);
      else if (ref) ref.current = img;
    },
    [src, ref]
  );

  const placeholder = optimizable && !failed ? placeholderUrl(src) : null;
  const wantsLoader = (showLoader ?? !DECORATIVE_ALT.test(String(props.alt || ""))) && props.fill;

  return (
    <>
      <NextImage
        ref={imgRef}
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
          setLoadedSrc(src);
          onLoad?.(e);
        }}
        onError={(e) => {
          if (optimizable && !failed) setFailedSrc(src);
          else {
            // Even the original failed — stop showing the loader.
            setLoadedSrc(src);
            onError?.(e);
          }
        }}
      />
      {wantsLoader && !loaded && (
        <span
          aria-hidden="true"
          className="smart-image-loader pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        >
          <ImageLoader />
        </span>
      )}
    </>
  );
});

export default SmartImage;
