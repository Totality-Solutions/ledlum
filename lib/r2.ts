import "server-only";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Uses R2_SECRET_ACCESS_KEY — importing this from a "use client" component
// will fail the build (by design) rather than leak the secret into the bundle.

// Cloudflare R2 is S3-compatible, so the AWS SDK works against it directly —
// just point the endpoint at the account's R2 URL instead of AWS.
let client: S3Client | null = null;

function getR2Client(): S3Client {
  if (client) return client;

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing Cloudflare R2 credentials. Set CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY."
    );
  }

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
  return client;
}

function getBucketName(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) throw new Error("Missing R2_BUCKET_NAME env var.");
  return bucket;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------- Key builders ----------------
// Two top-level namespaces:
//   zone/<zone-slug>/<filename>                      — installation/site/zone content
//   product/<collection>/<model-slug>/<filename>      — catalog assets (indoor/outdoor/etc.)

export function buildZoneKey(zone: string, filename: string): string {
  return `zone/${slugify(zone)}/${filename}`;
}

export function buildProductKey(collection: string, model: string, filename: string): string {
  return `product/${slugify(collection)}/${slugify(model)}/${filename}`;
}

// ---------------- Core operations ----------------

export async function uploadFile(params: {
  key: string;
  body: Buffer | Uint8Array | string;
  contentType: string;
}): Promise<{ key: string; url: string }> {
  const { key, body, contentType } = params;

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return { key, url: getPublicUrl(key) };
}

export async function deleteFile(key: string): Promise<void> {
  await getR2Client().send(
    new DeleteObjectCommand({ Bucket: getBucketName(), Key: key })
  );
}

// Server-side copy (no download/upload round trip) — used for fixing up keys,
// e.g. renaming to a different case.
export async function copyFile(sourceKey: string, destKey: string): Promise<void> {
  const bucket = getBucketName();
  await getR2Client().send(
    new CopyObjectCommand({
      Bucket: bucket,
      CopySource: `${bucket}/${sourceKey.split("/").map(encodeURIComponent).join("/")}`,
      Key: destKey,
    })
  );
}

export async function listFiles(prefix: string): Promise<string[]> {
  const result = await getR2Client().send(
    new ListObjectsV2Command({ Bucket: getBucketName(), Prefix: prefix })
  );
  return (result.Contents || []).map((obj) => obj.Key!).filter(Boolean);
}

// Lets a browser upload directly to R2 (bypassing the app server) — the right
// call for large files like video, so uploads don't run through a Next.js
// server function's memory/time limits.
export async function getPresignedUploadUrl(params: {
  key: string;
  contentType: string;
  expiresInSeconds?: number;
}): Promise<string> {
  const { key, contentType, expiresInSeconds = 300 } = params;
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(getR2Client(), command, { expiresIn: expiresInSeconds });
}

// For private buckets — generates a temporary signed read URL. Not needed if
// the bucket/objects are served publicly via NEXT_PUBLIC_R2_PUBLIC_URL.
export async function getPresignedDownloadUrl(
  key: string,
  expiresInSeconds = 300
): Promise<string> {
  const command = new GetObjectCommand({ Bucket: getBucketName(), Key: key });
  return getSignedUrl(getR2Client(), command, { expiresIn: expiresInSeconds });
}

export function getPublicUrl(key: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_R2_PUBLIC_URL env var.");
  return `${base.replace(/\/$/, "")}/${key}`;
}
