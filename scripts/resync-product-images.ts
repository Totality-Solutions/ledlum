import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!;

const ROOTS: { collection: string; localPath: string }[] = [
  { collection: "indoor", localPath: "/Users/khushbooyadav/Downloads/Product Images/Indoor" },
  { collection: "outdoor", localPath: "/Users/khushbooyadav/Downloads/Product Images/Outdoor" },
];

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);
const CONCURRENCY = 8;

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function naturalSort(a: string, b: string): number {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
}

async function uploadOne(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

async function listExistingKeys(prefix: string): Promise<string[]> {
  const keys: string[] = [];
  let token: string | undefined;
  do {
    const result: any = await r2.send(
      new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token })
    );
    (result.Contents || []).forEach((obj: any) => obj.Key && keys.push(obj.Key));
    token = result.IsTruncated ? result.NextContinuationToken : undefined;
  } while (token);
  return keys;
}

async function deleteKeys(keys: string[]): Promise<void> {
  for (let i = 0; i < keys.length; i += 1000) {
    const batch = keys.slice(i, i + 1000);
    await r2.send(
      new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: { Objects: batch.map((Key) => ({ Key })) },
      })
    );
  }
}

interface ModelJob {
  collection: string;
  model: string;
  files: string[];
}

function collectJobs(): ModelJob[] {
  const jobs: ModelJob[] = [];
  for (const root of ROOTS) {
    if (!fs.existsSync(root.localPath)) {
      console.warn(`Root not found, skipping: ${root.localPath}`);
      continue;
    }
    const categoryDirs = fs.readdirSync(root.localPath, { withFileTypes: true }).filter((d) => d.isDirectory());
    for (const catDir of categoryDirs) {
      const catPath = path.join(root.localPath, catDir.name);
      const modelDirs = fs.readdirSync(catPath, { withFileTypes: true }).filter((d) => d.isDirectory());
      for (const modelDir of modelDirs) {
        const modelPath = path.join(catPath, modelDir.name);
        const files = fs
          .readdirSync(modelPath, { withFileTypes: true })
          .filter((f) => f.isFile())
          .map((f) => f.name)
          .filter((name) => {
            const ext = (name.split(".").pop() || "").toLowerCase();
            return IMAGE_EXT.has(ext) || ext === "tif" || ext === "tiff";
          })
          .sort(naturalSort);

        if (files.length === 0) continue;
        jobs.push({
          collection: root.collection,
          model: modelDir.name,
          files: files.map((f) => path.join(modelPath, f)),
        });
      }
    }
  }
  return jobs;
}

async function processModel(job: ModelJob): Promise<{
  model: string;
  urls: string[];
  deletedOldKeys: number;
  error?: string;
}> {
  const modelSlug = slugify(job.model);
  const prefix = `product/${slugify(job.collection)}/${modelSlug}/`;
  const urls: string[] = [];
  const newKeys = new Set<string>();

  let seq = 1;
  for (const filePath of job.files) {
    const origName = path.basename(filePath);
    const ext = (origName.split(".").pop() || "").toLowerCase();
    let buf: Buffer;
    let finalExt: string;
    let contentType: string;

    try {
      buf = fs.readFileSync(filePath);
    } catch (err: any) {
      return { model: job.model, urls, deletedOldKeys: 0, error: `read failed: ${err.message}` };
    }

    if (ext === "tif" || ext === "tiff") {
      try {
        buf = await sharp(buf, { unlimited: true }).jpeg({ quality: 85 }).toBuffer();
      } catch (err: any) {
        return { model: job.model, urls, deletedOldKeys: 0, error: `tif convert failed: ${err.message}` };
      }
      finalExt = "jpg";
      contentType = "image/jpeg";
    } else if (ext === "jpg" || ext === "jpeg") {
      finalExt = "jpg";
      contentType = "image/jpeg";
    } else if (ext === "png") {
      finalExt = "png";
      contentType = "image/png";
    } else {
      finalExt = "webp";
      contentType = "image/webp";
    }

    const key = `${prefix}${seq}.${finalExt}`;
    seq++;

    try {
      const url = await uploadOne(key, buf, contentType);
      urls.push(url);
      newKeys.add(key);
    } catch (err: any) {
      return { model: job.model, urls, deletedOldKeys: 0, error: `upload failed: ${err.message}` };
    }
  }

  let deletedOldKeys = 0;
  try {
    const existingKeys = await listExistingKeys(prefix);
    const staleKeys = existingKeys.filter((k) => !newKeys.has(k));
    if (staleKeys.length > 0) {
      await deleteKeys(staleKeys);
      deletedOldKeys = staleKeys.length;
    }
  } catch (err: any) {
    console.warn(`  cleanup failed for ${job.model}: ${err.message}`);
  }

  return { model: job.model, urls, deletedOldKeys };
}

async function runPool<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const current = idx++;
      results[current] = await fn(items[current]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function main() {
  console.log("Fetching existing product models from Supabase...");
  const allRows: { model: string }[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase.from("ledlum_products").select("model").range(from, from + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  const modelRowMap = new Map<string, boolean>(allRows.map((r) => [String(r.model).toUpperCase(), true]));
  console.log(`Loaded ${modelRowMap.size} product models from DB.\n`);

  console.log("Scanning local folders...");
  const jobs = collectJobs();
  console.log(`Found ${jobs.length} model folders with images.\n`);

  let matchedJobs = jobs.filter((j) => modelRowMap.has(j.model.toUpperCase()));
  const unmatchedJobs = jobs.filter((j) => !modelRowMap.has(j.model.toUpperCase()));
  console.log(`Matched to DB: ${matchedJobs.length}`);
  console.log(`No DB match (will skip): ${unmatchedJobs.length}\n`);

  if (process.env.RETRY_FAILED === "1") {
    const failed: { model: string }[] = JSON.parse(
      fs.readFileSync("./scripts/backups/resync-failed.json", "utf-8")
    );
    const retrySet = new Set(failed.map((f) => f.model.toUpperCase()));
    matchedJobs = matchedJobs.filter((j) => retrySet.has(j.model.toUpperCase()));
    console.log(`RETRY_FAILED mode: limited to ${matchedJobs.length} previously-failed models.\n`);
  }

  fs.mkdirSync("./scripts/backups", { recursive: true });
  fs.writeFileSync(
    "./scripts/backups/resync-unmatched-models.json",
    JSON.stringify(unmatchedJobs.map((j) => ({ collection: j.collection, model: j.model })), null, 2)
  );

  if (process.env.DRY_RUN === "1") {
    console.log("DRY RUN — stopping before any uploads.");
    return;
  }

  let done = 0;
  const total = matchedJobs.length;
  const results = await runPool(matchedJobs, CONCURRENCY, async (job) => {
    const result = await processModel(job);
    done++;
    if (done % 10 === 0 || done === total) {
      console.log(`  [${done}/${total}] ${job.model} — ${result.urls.length} uploaded, ${result.deletedOldKeys} old removed${result.error ? ` — ERROR: ${result.error}` : ""}`);
    }
    return result;
  });

  const successResults = results.filter((r) => !r.error && r.urls.length > 0);
  const failedResults = results.filter((r) => r.error);
  const totalDeleted = successResults.reduce((sum, r) => sum + r.deletedOldKeys, 0);

  console.log(`\nUpload complete. Success: ${successResults.length}, Failed: ${failedResults.length}`);
  console.log(`Old/stale R2 objects removed: ${totalDeleted}`);
  if (failedResults.length > 0) {
    fs.writeFileSync("./scripts/backups/resync-failed.json", JSON.stringify(failedResults, null, 2));
    console.log("Wrote scripts/backups/resync-failed.json");
  }

  console.log("\nUpdating Supabase rows...");
  let updated = 0;
  for (const r of successResults) {
    const { error: updateErr } = await supabase
      .from("ledlum_products")
      .update({ hero_image: r.urls[0], gallery_images: r.urls })
      .ilike("model", r.model);
    if (updateErr) {
      console.log(`  FAILED update for ${r.model}: ${updateErr.message}`);
    } else {
      updated++;
    }
  }
  console.log(`\nDone. ${updated} product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
