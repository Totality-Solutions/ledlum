import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config({ path: ".env" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
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
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const COLLECTION = "artizan";

// Second, later ARTIZAN export — only fills in models that scripts/upload-artizan-images.ts
// (pointed at the 20260916 export) never got photos for. Unlike that script, this folder mixes
// three layouts (category/model-dir/file, category/model.ext, and one category/subcategory/model.ext
// level), so this scans recursively instead of assuming exactly two directory levels.
const ROOT = "C:/Users/Admin/Downloads/ARTIZAN-20260921T071448Z-1-001/ARTIZAN";

// Exactly the models flagged as still missing photos — deliberately not a full re-scan of ROOT,
// which also reprints the entire 01-21 numbered catalog already handled by the first import.
const TARGET_MODELS = [
  "LA-FN-AC-01", "LA-FN-AC-02", "LA-P01", "LA-P02",
  "LLA-017G", "LLA-017H",
  "LLA-023", "LLA-024", "LLA-025",
  "LLA-071", "LLA-072", "LLA-073", "LLA-074",
  "LLA-081", "LLA-082", "LLA-083",
  "LLA-091", "LLA-092", "LLA-093", "LLA-093A", "LLA-093B", "LLA-094",
  "LLA-095", "LLA-096", "LLA-097", "LLA-098", "LLA-099",
  "LLA-111", "LLA-112", "LLA-113", "LLA-114", "LLA-115", "LLA-116",
  "LLA-121", "LLA-122",
  "LLA-207A",
  "LLA-231A", "LLA-232A", "LLA-233A", "LLA-234A", "LLA-235", "LLA-243T", "LLA-243X", "LLA-250", "LLA-251",
  "LLA-283",
  "LLA-34B",
  "LLA-509", "LLA-522",
  "LLA-610A", "LLA-610C", "LLA-611A", "LLA-611C", "LLA-612A", "LLA-616A", "LLA-616C",
];

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);
const CONCURRENCY = 12;
// Technical line-drawing sheets, not product photography — every model already
// uploaded from the first ARTIZAN export has zero of these in its gallery.
const EXCLUDE_NAME_RE = /dimension/i;
// Folder names that look like a model code rather than a category/series name.
const MODEL_DIR_RE = /^(LLA|LA)[-\s]/i;

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function canonicalModel(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*$/, "").trim();
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

interface ModelJob {
  model: string;
  files: string[];
}

// Recursively walks the whole export and groups every real product photo by
// model code, regardless of which of the three directory layouts it's under.
function collectJobs(): Map<string, ModelJob> {
  const byModel = new Map<string, ModelJob>();

  function addFile(model: string, filePath: string) {
    const key = model.toUpperCase();
    if (!byModel.has(key)) byModel.set(key, { model, files: [] });
    byModel.get(key)!.files.push(filePath);
  }

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const imageFiles = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => IMAGE_EXT.has((name.split(".").pop() || "").toLowerCase()))
      .filter((name) => !EXCLUDE_NAME_RE.test(name))
      .sort(naturalSort);

    const dirName = path.basename(dir);
    const dirLooksLikeModel = MODEL_DIR_RE.test(dirName);

    for (const name of imageFiles) {
      // Inside a model-named folder, every image in it belongs to that model
      // (e.g. "LLA-023/LLA-023.png"). Otherwise fall back to the filename
      // itself (e.g. "Moduler Series/LLA-091.png").
      const model = dirLooksLikeModel ? canonicalModel(dirName) : canonicalModel(path.basename(name, path.extname(name)));
      addFile(model, path.join(dir, name));
    }

    for (const e of entries) {
      if (e.isDirectory()) walk(path.join(dir, e.name));
    }
  }

  walk(ROOT);
  return byModel;
}

async function processModel(job: ModelJob): Promise<{ model: string; urls: string[]; error?: string }> {
  const urls: string[] = [];
  let seq = 1;
  const seenHashes = new Set<string>();

  for (const filePath of job.files.sort((a, b) => naturalSort(path.basename(a), path.basename(b)))) {
    const ext = (path.basename(filePath).split(".").pop() || "jpg").toLowerCase();
    const buf = fs.readFileSync(filePath);

    // Same export folder has a few byte-identical duplicates filed under two
    // different paths (e.g. LLA-250.jpg under both its category folder and
    // the stray "New folder") — skip re-uploading the same image twice.
    const hash = crypto.createHash("md5").update(buf).digest("hex");
    if (seenHashes.has(hash)) continue;
    seenHashes.add(hash);

    const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
    const finalExt = ext === "jpeg" ? "jpg" : ext;
    const key = `product/${slugify(COLLECTION)}/${slugify(job.model)}/${seq}.${finalExt}`;

    try {
      const url = await uploadOne(key, buf, contentType);
      urls.push(url);
      seq++;
    } catch (err: any) {
      return { model: job.model, urls, error: `upload failed: ${err.message}` };
    }
  }

  return { model: job.model, urls };
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
  console.log("=== Artizan Remaining-Images Uploader ===\n");

  console.log("Fetching target Artizan product rows from Supabase...");
  const { data: dbRows, error: dbErr } = await supabase
    .from("ledlum_products")
    .select("model, hero_image")
    .eq("collection", COLLECTION)
    .in("model", TARGET_MODELS);
  if (dbErr) throw dbErr;
  const dbByModel = new Map((dbRows || []).map((r: any) => [r.model.toUpperCase(), r]));

  console.log("Scanning local export folder (recursive)...");
  const found = collectJobs();

  const report: { model: string; status: string }[] = [];
  const jobs: ModelJob[] = [];

  for (const model of TARGET_MODELS) {
    const key = model.toUpperCase();
    const dbRow = dbByModel.get(key);
    const job = found.get(key);

    if (!dbRow) {
      report.push({ model, status: "SKIP — no matching row in ledlum_products" });
    } else if (!job || job.files.length === 0) {
      report.push({ model, status: "SKIP — no image files found in export folder" });
    } else if (dbRow.hero_image) {
      report.push({ model, status: `SKIP — already has hero_image (rerun manually to overwrite)` });
    } else {
      report.push({ model, status: `OK — ${job.files.length} file(s)` });
      jobs.push(job);
    }
  }

  console.log("\nPer-model plan:");
  report.forEach((r) => console.log(`  ${r.model.padEnd(14)} ${r.status}`));
  console.log(`\n${jobs.length}/${TARGET_MODELS.length} models will be uploaded.\n`);

  if (process.env.DRY_RUN === "1") {
    console.log("DRY RUN — stopping before any uploads.");
    return;
  }

  if (jobs.length === 0) {
    console.log("Nothing to upload.");
    return;
  }

  let done = 0;
  const total = jobs.length;
  const results = await runPool(jobs, CONCURRENCY, async (job) => {
    const result = await processModel(job);
    done++;
    console.log(`  [${done}/${total}] uploaded ${job.model} (${job.files.length} file(s))`);
    return result;
  });

  const successResults = results.filter((r) => !r.error && r.urls.length > 0);
  const failedResults = results.filter((r) => r.error);
  console.log(`\nUpload complete. Success: ${successResults.length}, Failed: ${failedResults.length}`);
  if (failedResults.length > 0) console.log(JSON.stringify(failedResults, null, 2));

  console.log("\nUpdating Supabase rows...");
  let updated = 0;
  for (const r of successResults) {
    const { data, error: updateErr } = await supabase
      .from("ledlum_products")
      .update({ hero_image: r.urls[0], gallery_images: r.urls })
      .ilike("model", r.model)
      .select("id");
    if (updateErr) {
      console.log(`  FAILED update for ${r.model}: ${updateErr.message}`);
    } else if (!data || data.length === 0) {
      console.log(`  WARNING: update for ${r.model} matched 0 rows`);
    } else {
      updated++;
    }
  }
  console.log(`\nDone. ${updated} Artizan product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
