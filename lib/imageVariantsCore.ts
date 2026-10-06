import sharp from "sharp";
import { PLACEHOLDER_WIDTH, VARIANT_WIDTHS } from "./imageLoader";

// Shared by the upload routes (lib/imageVariants.ts) and the bulk backfill
// script (scripts/generate-image-variants.ts). Kept free of "server-only" so
// the script can import it under tsx.

export const RASTER_KEY = /\.(jpe?g|png|webp)$/i;
export const VARIANT_CACHE_CONTROL = "public, max-age=31536000, immutable";

export function variantKey(key: string, width: number): string {
  return `_v/${width}/${key}.webp`;
}

// Resized WebP copies of one image: the 64px blurred-preview copy plus every
// srcset width. Never upscales — a 900px original yields 900px copies for the
// 1280/1920 slots, so every slot always exists.
export async function buildVariants(input: Buffer): Promise<{ width: number; body: Buffer }[]> {
  const widths = [PLACEHOLDER_WIDTH, ...VARIANT_WIDTHS];
  return Promise.all(
    widths.map(async (width) => ({
      width,
      body: await sharp(input, { failOn: "none" })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: width === PLACEHOLDER_WIDTH ? 40 : 78, effort: 4 })
        .toBuffer(),
    }))
  );
}
