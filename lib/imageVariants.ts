import "server-only";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, getBucketName } from "@/lib/r2";

// Creates the resized copies the site's image loader expects for a freshly
// uploaded image. Failures are logged, not thrown: the site falls back to the
// original file when a copy is missing, so an upload should never fail
// because of this.
//
// imageVariantsCore (and so sharp) is loaded lazily: if sharp's native binary
// fails to load on the server, a static import would crash every route that
// imports this file — before auth, with a bare 500 — instead of only skipping
// the resized copies.
export async function generateImageVariants(key: string, original: Buffer): Promise<void> {
  try {
    const { buildVariants, RASTER_KEY, variantKey, VARIANT_CACHE_CONTROL } = await import("@/lib/imageVariantsCore");
    if (!RASTER_KEY.test(key)) return;
    const variants = await buildVariants(original);
    await Promise.all(
      variants.map(({ width, body }) =>
        getR2Client().send(
          new PutObjectCommand({
            Bucket: getBucketName(),
            Key: variantKey(key, width),
            Body: body,
            ContentType: "image/webp",
            CacheControl: VARIANT_CACHE_CONTROL,
          })
        )
      )
    );
  } catch (err) {
    console.error(`generateImageVariants(${key}) failed:`, err);
  }
}
