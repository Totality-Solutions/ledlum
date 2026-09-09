import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  { collection: "indoor", localPath: "D:/Users/Admin/Downloads/LEDLUM IMGS/Indoor/Indoor" },
  { collection: "outdoor", localPath: "D:/Users/Admin/Downloads/LEDLUM IMGS/outdoor" },
];

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);
const SKIP_EXT = new Set(["psd", "pdf", "docx"]);
const CONCURRENCY = 12;

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function naturalSort(a: string, b: string): number {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
}

function sniffExt(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8) return "jpg";
  if (buf[0] === 0x89 && buf[1] === 0x50) return "png";
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return "webp";
  return null;
}

async function uploadOne(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

interface ModelJob {
  collection: string;
  model: string; // folder name, original case
  files: string[]; // full local paths, in display order
}

function collectJobs(): ModelJob[] {
  const jobs: ModelJob[] = [];
  for (const root of ROOTS) {
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
            if (name === "5" && modelDir.name.toUpperCase() === "LLS-011A") return true; // known extensionless jpeg
            return IMAGE_EXT.has(ext) || ext === "tif";
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

async function processModel(job: ModelJob, modelRowMap: Map<string, boolean>): Promise<{
  model: string;
  matched: boolean;
  urls: string[];
  error?: string;
}> {
  const matched = modelRowMap.has(job.model.toUpperCase());
  const urls: string[] = [];

  for (const filePath of job.files) {
    const origName = path.basename(filePath);
    const ext = (origName.split(".").pop() || "").toLowerCase();
    let buf = fs.readFileSync(filePath);
    let finalExt = ext;
    let contentType = "image/jpeg";

    if (ext === "tif" || ext === "tiff") {
      buf = await sharp(buf).jpeg({ quality: 85 }).toBuffer();
      finalExt = "jpg";
      contentType = "image/jpeg";
    } else if (ext === "jpg" || ext === "jpeg") {
      contentType = "image/jpeg";
      finalExt = "jpg";
    } else if (ext === "png") {
      contentType = "image/png";
      finalExt = "png";
    } else if (ext === "webp") {
      contentType = "image/webp";
      finalExt = "webp";
    } else {
      // extensionless — sniff magic bytes
      const sniffed = sniffExt(buf);
      finalExt = sniffed || "jpg";
      contentType = finalExt === "png" ? "image/png" : finalExt === "webp" ? "image/webp" : "image/jpeg";
    }

    const seq = path.basename(origName, path.extname(origName));
    const key = `product/${slugify(job.collection)}/${slugify(job.model)}/${slugify(seq) || "img"}.${finalExt}`;

    try {
      const url = await uploadOne(key, buf, contentType);
      urls.push(url);
    } catch (err: any) {
      return { model: job.model, matched, urls, error: `upload failed: ${err.message}` };
    }
  }

  return { model: job.model, matched, urls };
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
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("model")
      .range(from, from + pageSize - 1);
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

  const limit = process.env.UPLOAD_LIMIT ? parseInt(process.env.UPLOAD_LIMIT, 10) : undefined;
  if (limit) {
    matchedJobs = matchedJobs.slice(0, limit);
    console.log(`(TEST MODE: limited to first ${limit} matched models)\n`);
  }

  fs.writeFileSync("./scripts/unmatched-models.json", JSON.stringify(unmatchedJobs.map((j) => j.model), null, 2));

  if (process.env.DRY_RUN === "1") {
    console.log("DRY RUN — stopping before any uploads.");
    return;
  }

  let done = 0;
  const total = matchedJobs.length;
  const results = await runPool(matchedJobs, CONCURRENCY, async (job) => {
    const result = await processModel(job, modelRowMap);
    done++;
    if (done % 25 === 0 || done === total) {
      console.log(`  [${done}/${total}] uploaded through model ${job.model} (${job.files.length} files)`);
    }
    return result;
  });

  const successResults = results.filter((r) => !r.error && r.urls.length > 0);
  const failedResults = results.filter((r) => r.error);

  console.log(`\nUpload complete. Success: ${successResults.length}, Failed: ${failedResults.length}`);
  if (failedResults.length > 0) {
    fs.writeFileSync("./scripts/failed-uploads.json", JSON.stringify(failedResults, null, 2));
    console.log("Wrote scripts/failed-uploads.json");
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
