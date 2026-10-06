// Custom next/image loader (next.config.ts → images.loaderFile).
//
// Every raster image in our R2 bucket has pre-generated WebP copies at fixed
// widths, stored next to the original under `_v/<width>/<key>.webp`
// (scripts/generate-image-variants.ts, and lib/imageVariants.ts on upload).
// The browser asks for the width it needs via srcset; this maps that to the
// nearest stored variant, so a phone downloads a ~40 KB WebP instead of a
// 1 MB+ original. Anything that isn't one of our raster images (YouTube
// thumbnails, SVGs, GIFs) is returned untouched.
//
// `quality` is used as a network hint rather than an encoder setting:
// SmartImage passes LOW_BANDWIDTH_QUALITY on slow / data-saver connections,
// which steps down one variant size.

export const VARIANT_WIDTHS = [384, 768, 1280, 1920] as const;
export const PLACEHOLDER_WIDTH = 64;
export const LOW_BANDWIDTH_QUALITY = 50;

const R2_HOST = "pub-72e9e5cfa7cc4ff0a9cc7ba22a9d2341.r2.dev";
const RASTER = /\.(jpe?g|png|webp)$/i;

function splitR2Url(src: string): { origin: string; key: string } | null {
  try {
    const url = new URL(src);
    if (url.host !== R2_HOST || !RASTER.test(url.pathname)) return null;
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    if (key.startsWith("_v/")) return null;
    return { origin: url.origin, key };
  } catch {
    return null;
  }
}

function variantUrl(origin: string, key: string, width: number): string {
  const encoded = `_v/${width}/${key}.webp`.split("/").map(encodeURIComponent).join("/");
  return `${origin}/${encoded}`;
}

export function isOptimizableSrc(src: string): boolean {
  return splitR2Url(src) !== null;
}

// Tiny (64px) version used as the blurred preview while the real image loads.
export function placeholderUrl(src: string): string | null {
  const parts = splitR2Url(src);
  return parts ? variantUrl(parts.origin, parts.key, PLACEHOLDER_WIDTH) : null;
}

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const parts = splitR2Url(src);
  if (!parts) return src;

  let index = VARIANT_WIDTHS.findIndex((w) => w >= width);
  if (index === -1) index = VARIANT_WIDTHS.length - 1;
  if (quality !== undefined && quality <= LOW_BANDWIDTH_QUALITY && index > 0) index -= 1;

  return variantUrl(parts.origin, parts.key, VARIANT_WIDTHS[index]);
}
