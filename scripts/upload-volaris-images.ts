import dotenv from "dotenv";
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
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
const COLLECTION = "volaris";
const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);

function resolveRoot(): string {
  const downloads = "C:/Users/Admin/Downloads";
  const outer = fs
    .readdirSync(downloads, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.toLowerCase().startsWith("fan images"));
  if (!outer) throw new Error("Could not find the extracted 'fan images' folder under Downloads");
  const outerPath = path.join(downloads, outer.name);
  const inner = fs
    .readdirSync(outerPath, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.toLowerCase() === "fan images");
  if (!inner) throw new Error(`Could not find the inner 'fan images' folder inside ${outerPath}`);
  return path.join(outerPath, inner.name);
}

const ROOT = resolveRoot();

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function uploadOne(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

interface ModelJob {
  model: string;
  files: string[];
}

// Matches a leading model code like "VFR001", "vfr014" followed by a space or
// dash (color-variant naming "VFR001-Black.png" or sequence naming
// "VCF001 01.jpg"). Files that don't match (numbered-only, camera exports,
// non-Latin names) are reported as unmatched rather than guessed at.
const MODEL_PREFIX = /^([A-Za-z]+\d+)[\s-]/;

function collectJobs(): { jobs: ModelJob[]; unmatchedFiles: string[] } {
  const byModel = new Map<string, ModelJob>();
  const unmatchedFiles: string[] = [];

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scanDir(path.join(dir, entry.name));
        continue;
      }
      if (entry.name.startsWith(".")) continue; // .DS_Store etc.
      const ext = (entry.name.split(".").pop() || "").toLowerCase();
      const isImageish = IMAGE_EXT.has(ext) || ext === "tif" || ext === "tiff";
      if (!isImageish) continue;

      const match = entry.name.match(MODEL_PREFIX);
      if (!match) {
        unmatchedFiles.push(path.relative(ROOT, path.join(dir, entry.name)));
        continue;
      }

      const model = match[1].toUpperCase();
      if (!byModel.has(model)) byModel.set(model, { model, files: [] });
      byModel.get(model)!.files.push(path.join(dir, entry.name));
    }
  }

  scanDir(ROOT);

  // Deterministic order within a model (color variants, sequence numbers).
  for (const job of byModel.values()) {
    job.files.sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
  }

  return { jobs: Array.from(byModel.values()), unmatchedFiles };
}

async function convertTiffToJpeg(filePath: string): Promise<Buffer> {
  const tmpOut = path.join(os.tmpdir(), `volaris-tiff-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
  try {
    execFileSync(
      process.execPath,
      ["-r", require.resolve("tsx/cjs"), path.join(__dirname, "convert-tiff-to-jpg.ts"), filePath, tmpOut],
      { stdio: ["ignore", "ignore", "pipe"] }
    );
    return fs.readFileSync(tmpOut);
  } finally {
    fs.rmSync(tmpOut, { force: true });
  }
}

async function processModel(
  job: ModelJob
): Promise<{ model: string; urls: string[]; skipped: string[]; error?: string }> {
  const urls: string[] = [];
  const skipped: string[] = [];
  let seq = 1;

  for (const filePath of job.files) {
    const ext = (path.basename(filePath).split(".").pop() || "jpg").toLowerCase();
    let buf: Buffer;
    let finalExt = ext;
    let contentType = "image/jpeg";

    if (ext === "tif" || ext === "tiff") {
      try {
        buf = await convertTiffToJpeg(filePath);
      } catch {
        skipped.push(path.basename(filePath));
        continue;
      }
      finalExt = "jpg";
      contentType = "image/jpeg";
    } else if (ext === "png") {
      buf = fs.readFileSync(filePath);
      contentType = "image/png";
    } else if (ext === "webp") {
      buf = fs.readFileSync(filePath);
      contentType = "image/webp";
    } else {
      buf = fs.readFileSync(filePath);
      finalExt = "jpg";
      contentType = "image/jpeg";
    }

    const key = `product/${slugify(COLLECTION)}/${slugify(job.model)}/${seq}.${finalExt}`;
    try {
      const url = await uploadOne(key, buf, contentType);
      urls.push(url);
      seq++;
    } catch (err: any) {
      return { model: job.model, urls, skipped, error: `upload failed: ${err.message}` };
    }
  }

  return { model: job.model, urls, skipped };
}

async function main() {
  console.log("Fetching existing Volaris product models from Supabase...");
  const { data: rows, error } = await supabase
    .from("ledlum_products")
    .select("model")
    .eq("collection", COLLECTION);
  if (error) throw error;
  const modelRowSet = new Set((rows || []).map((r: any) => r.model.toUpperCase()));
  console.log(`Loaded ${modelRowSet.size} Volaris product models from DB.\n`);

  console.log("Scanning local fan images folder...");
  const { jobs, unmatchedFiles } = collectJobs();
  console.log(`Found ${jobs.length} distinct model codes among the files.`);
  if (unmatchedFiles.length > 0) {
    console.log(`\n${unmatchedFiles.length} file(s) with no recognizable model code (not uploaded):`);
    unmatchedFiles.forEach((f) => console.log(`  ${f}`));
  }

  const matchedJobs = jobs.filter((j) => modelRowSet.has(j.model));
  const unmatchedJobs = jobs.filter((j) => !modelRowSet.has(j.model));
  console.log(`\nMatched to DB: ${matchedJobs.length}`);
  console.log(`No DB match (will skip): ${unmatchedJobs.length}`);
  if (unmatchedJobs.length > 0) console.log("Unmatched model codes:", unmatchedJobs.map((j) => j.model).join(", "));

  const noImageModels = [...modelRowSet].filter((m) => !jobs.some((j) => j.model === m));
  if (noImageModels.length > 0) {
    console.log(`DB models with no local image at all: ${noImageModels.join(", ")}`);
  }
  console.log("");

  if (process.env.DRY_RUN === "1") {
    console.log("DRY RUN — stopping before any uploads.");
    matchedJobs.forEach((j) => console.log(`  ${j.model}: ${j.files.length} file(s) -> ${j.files.map((f) => path.basename(f)).join(", ")}`));
    return;
  }

  let done = 0;
  const total = matchedJobs.length;
  const results = [];
  for (const job of matchedJobs) {
    const result = await processModel(job);
    results.push(result);
    done++;
    const skippedNote = result.skipped.length > 0 ? ` (skipped: ${result.skipped.join(", ")})` : "";
    console.log(`  [${done}/${total}] ${job.model} (${job.files.length} files)${result.error ? " -> " + result.error : ""}${skippedNote}`);
  }

  const successResults = results.filter((r) => !r.error && r.urls.length > 0);
  const failedResults = results.filter((r) => r.error);
  console.log(`\nUpload complete. Success: ${successResults.length}, Failed: ${failedResults.length}`);

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
  console.log(`\nDone. ${updated} Volaris product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
