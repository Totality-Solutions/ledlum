import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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
const COLLECTION = "artizan";
const ROOT = "C:/Users/Admin/Downloads/ARTIZAN-20260916T055923Z-1-001/ARTIZAN";

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);
const CONCURRENCY = 12;

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Strips descriptive parenthetical suffixes like "(Tunable)" / "(600mm)" that
// aren't part of the real model code, e.g. "LLA-271 (600mm)" -> "LLA-271".
function canonicalModel(folderName: string): string {
  return folderName.replace(/\s*\([^)]*\)\s*$/, "").trim();
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
  model: string; // canonical model code
  files: string[]; // full local paths, in final order
}

function collectJobs(): ModelJob[] {
  // Keyed by uppercased canonical model — merges folders that only differ by
  // a descriptive parenthetical (e.g. "LLA-015" and "LLA-015 (Tunable)").
  const byModel = new Map<string, ModelJob>();

  const categoryDirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const catDir of categoryDirs) {
    const catPath = path.join(ROOT, catDir.name);
    const modelDirs = fs.readdirSync(catPath, { withFileTypes: true }).filter((d) => d.isDirectory());

    // Sort folder names so merged order is deterministic (base name before
    // its "(Tunable)"-style variant).
    modelDirs.sort((a, b) => a.name.localeCompare(b.name));

    for (const modelDir of modelDirs) {
      const modelPath = path.join(catPath, modelDir.name);
      const files = fs
        .readdirSync(modelPath, { withFileTypes: true })
        .filter((f) => f.isFile())
        .map((f) => f.name)
        .filter((name) => IMAGE_EXT.has((name.split(".").pop() || "").toLowerCase()))
        .sort(naturalSort)
        .map((name) => path.join(modelPath, name));

      if (files.length === 0) continue;

      const model = canonicalModel(modelDir.name);
      const key = model.toUpperCase();
      if (!byModel.has(key)) byModel.set(key, { model, files: [] });
      byModel.get(key)!.files.push(...files);
    }
  }

  return Array.from(byModel.values());
}

async function processModel(job: ModelJob): Promise<{ model: string; urls: string[]; error?: string }> {
  const urls: string[] = [];
  let seq = 1;

  for (const filePath of job.files) {
    const ext = (path.basename(filePath).split(".").pop() || "jpg").toLowerCase();
    const buf = fs.readFileSync(filePath);
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
  console.log("Fetching existing Artizan product models from Supabase...");
  const allRows: { model: string }[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("model")
      .eq("collection", COLLECTION)
      .range(from, from + 999);
    if (error) throw error;
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < 1000) break;
    from += 1000;
  }
  const modelRowSet = new Set(allRows.map((r) => r.model.toUpperCase()));
  console.log(`Loaded ${modelRowSet.size} Artizan product models from DB.\n`);

  console.log("Scanning local Artizan folder...");
  const jobs = collectJobs();
  console.log(`Found ${jobs.length} model folders (after merging parenthetical variants) with images.\n`);

  const matchedJobs = jobs.filter((j) => modelRowSet.has(j.model.toUpperCase()));
  const unmatchedJobs = jobs.filter((j) => !modelRowSet.has(j.model.toUpperCase()));
  console.log(`Matched to DB: ${matchedJobs.length}`);
  console.log(`No DB match (will skip): ${unmatchedJobs.length}`);
  if (unmatchedJobs.length > 0) {
    console.log("Unmatched models:", unmatchedJobs.map((j) => j.model).join(", "));
  }
  console.log("");

  if (process.env.DRY_RUN === "1") {
    console.log("DRY RUN — stopping before any uploads.");
    return;
  }

  let done = 0;
  const total = matchedJobs.length;
  const results = await runPool(matchedJobs, CONCURRENCY, async (job) => {
    const result = await processModel(job);
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
    console.log(JSON.stringify(failedResults, null, 2));
  }

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
