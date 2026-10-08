import dotenv from "dotenv";
import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { buildVariants, RASTER_KEY, variantKey, VARIANT_CACHE_CONTROL } from "../lib/imageVariantsCore";
import { VARIANT_WIDTHS } from "../lib/imageLoader";

// Backfills the resized WebP copies (`_v/<width>/<key>.webp`) that the site's
// image loader (lib/imageLoader.ts) serves, for every image already in R2.
// New uploads through the admin get them automatically; run this after bulk
// uploads done by other scripts (scripts/upload-*.ts).
//
//   npx tsx scripts/generate-image-variants.ts            # only images missing copies
//   npx tsx scripts/generate-image-variants.ts --force    # rebuild everything
//   npx tsx scripts/generate-image-variants.ts --prefix=ledlum/images
//
// Resumable: images that already have their largest copy are skipped, so it
// can be stopped and re-run at any time. Originals are never modified.

dotenv.config({ path: ".env", quiet: true });

const FORCE = process.argv.includes("--force");
const PREFIX = process.argv.find((a) => a.startsWith("--prefix="))?.slice("--prefix=".length) || "";
const CONCURRENCY = 6;

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
const Bucket = process.env.R2_BUCKET_NAME!;

async function listKeys(prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let token: string | undefined;
  do {
    const res = await client.send(new ListObjectsV2Command({ Bucket, Prefix: prefix, ContinuationToken: token }));
    for (const obj of res.Contents || []) if (obj.Key) keys.push(obj.Key);
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);
  return keys;
}

async function processKey(key: string): Promise<number> {
  const res = await client.send(new GetObjectCommand({ Bucket, Key: key }));
  const original = Buffer.from(await res.Body!.transformToByteArray());
  const variants = await buildVariants(original);
  await Promise.all(
    variants.map(({ width, body }) =>
      client.send(
        new PutObjectCommand({
          Bucket,
          Key: variantKey(key, width),
          Body: body,
          ContentType: "image/webp",
          CacheControl: VARIANT_CACHE_CONTROL,
        })
      )
    )
  );
  return original.length;
}

async function main() {
  console.log("Listing images…");
  const all = (await listKeys(PREFIX)).filter((k) => !k.startsWith("_v/") && RASTER_KEY.test(k));

  const largest = VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
  const done = FORCE
    ? new Set<string>()
    : new Set((await listKeys(`_v/${largest}/${PREFIX}`)).map((k) => k.slice(`_v/${largest}/`.length, -".webp".length)));
  const todo = all.filter((k) => !done.has(k));

  console.log(`${all.length} images, ${all.length - todo.length} already done, ${todo.length} to process.\n`);

  let index = 0;
  let ok = 0;
  let failed = 0;
  let bytes = 0;
  const started = Date.now();

  async function worker() {
    while (index < todo.length) {
      const key = todo[index++];
      try {
        bytes += await processKey(key);
        ok++;
      } catch (err: any) {
        failed++;
        console.log(`  FAILED ${key}: ${err.message}`);
      }
      const n = ok + failed;
      if (n % 100 === 0 || n === todo.length) {
        const mins = (Date.now() - started) / 60000;
        const eta = n ? ((todo.length - n) * mins) / n : 0;
        console.log(`  ${n}/${todo.length}  (${(bytes / 1048576).toFixed(0)} MB read, ~${eta.toFixed(0)} min left)`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`\nDone: ${ok} images resized, ${failed} failed.`);
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
