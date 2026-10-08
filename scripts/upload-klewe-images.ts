import dotenv from "dotenv";
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import * as XLSX from "xlsx";
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
const COLLECTION = "klewe";

// The zip-extracted outer folder name has a mangled em-dash (mojibake from
// the original "KLEWE — Sistemasolare..." name) — resolved by matching
// rather than hand-typing those bytes, which would be easy to get wrong.
function resolveRoot(): string {
  const downloads = "C:/Users/Admin/Downloads";
  const outer = fs
    .readdirSync(downloads, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.startsWith("KLEWE") && d.name.includes("Sistemasolare"));
  if (!outer) throw new Error("Could not find the extracted KLEWE Sistemasolare folder under Downloads");

  const outerPath = path.join(downloads, outer.name);
  const inner = fs
    .readdirSync(outerPath, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.startsWith("KLEWE"));
  if (!inner) throw new Error(`Could not find the inner KLEWE folder inside ${outerPath}`);

  return path.join(outerPath, inner.name);
}

const ROOT = resolveRoot();

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function normalizeName(v: string): string {
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

async function uploadOne(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

interface ModelJob {
  model: string;
  files: string[]; // full local paths, in final order
}

// Builds "product name" -> model code from the same Excel used to import
// Klewe data, so the loose "Copy of <Product Name>.tif" files at the root of
// the folder (extra/alternate photos, not organized into a model subfolder)
// can be attributed to the right model.
function buildNameToModel(): Map<string, string> {
  const wb = XLSX.readFile("./Klewe.xlsx");
  const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets["Sheet1"], { defval: null });
  const map = new Map<string, string>();
  for (const r of rows) {
    const name = r["Product Name"];
    const model = r["Model No"];
    if (name && model) map.set(normalizeName(String(name)), String(model).trim());
  }
  return map;
}

function collectJobs(nameToModel: Map<string, string>): { jobs: ModelJob[]; unmatchedLooseFiles: string[] } {
  const byModel = new Map<string, ModelJob>();
  const unmatchedLooseFiles: string[] = [];

  const entries = fs.readdirSync(ROOT, { withFileTypes: true });

  // 1. Per-model folders: <model>/<model>.<ext> (and anything else inside).
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const model = entry.name.trim();
    const modelPath = path.join(ROOT, entry.name);
    const files = fs
      .readdirSync(modelPath, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => f.name)
      .filter((name) => IMAGE_EXT.has((name.split(".").pop() || "").toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => path.join(modelPath, name));

    if (files.length === 0) continue;
    byModel.set(model.toUpperCase(), { model, files: [...files] });
  }

  // 2. Loose "Copy of <Product Name>.<ext>" files at the root — extra photos
  // for a model that (per the folders above) may already have one.
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = (entry.name.split(".").pop() || "").toLowerCase();
    const isImageish = IMAGE_EXT.has(ext) || ext === "tif" || ext === "tiff";
    if (!isImageish) continue;

    const match = entry.name.match(/^Copy of (.+)\.[^.]+$/i);
    if (!match) continue;
    const productName = normalizeName(match[1]);
    // Exact match first; fall back to stripping a trailing " 2"-style suffix,
    // which marks a second/alternate photo of the same product rather than a
    // different one (e.g. "HELIOSTEPPER 2" -> "HELIOSTEPPER").
    const model =
      nameToModel.get(productName) ??
      nameToModel.get(productName.replace(/\s+\d+$/, ""));

    if (!model) {
      unmatchedLooseFiles.push(entry.name);
      continue;
    }

    const key = model.toUpperCase();
    if (!byModel.has(key)) byModel.set(key, { model, files: [] });
    byModel.get(key)!.files.push(path.join(ROOT, entry.name));
  }

  return { jobs: Array.from(byModel.values()), unmatchedLooseFiles };
}

async function convertTiffToJpeg(filePath: string): Promise<Buffer> {
  const tmpOut = path.join(os.tmpdir(), `klewe-tiff-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
  try {
    // Spawn `node` directly (not `npx`, a .cmd shim on Windows that needs a
    // shell — and a shell here would re-split these paths on spaces) with
    // tsx's require hook, so Node's own argv passing handles the spaces and
    // special characters in these paths correctly, unescaped.
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
      } catch (err: any) {
        // A handful of these TIFFs individually trip libtiff's built-in
        // cumulative-allocation safety cap (a compiled-in C-level limit —
        // not something reachable from sharp's JS API to raise). Every model
        // already has its own primary photo from its own folder; these loose
        // TIFFs are supplementary extras, so skip just this one file rather
        // than failing the whole model over a bonus image.
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
  console.log("Fetching existing Klewe product models from Supabase...");
  const { data: rows, error } = await supabase
    .from("ledlum_products")
    .select("model")
    .eq("collection", COLLECTION);
  if (error) throw error;
  const modelRowSet = new Set((rows || []).map((r: any) => r.model.toUpperCase()));
  console.log(`Loaded ${modelRowSet.size} Klewe product models from DB.\n`);

  const nameToModel = buildNameToModel();
  console.log("Scanning local Klewe folder...");
  const { jobs, unmatchedLooseFiles } = collectJobs(nameToModel);
  console.log(`Found ${jobs.length} models with images (folder + loose files merged).`);
  if (unmatchedLooseFiles.length > 0) {
    console.log(`Loose files that didn't match any product name: ${unmatchedLooseFiles.join(", ")}`);
  }

  const matchedJobs = jobs.filter((j) => modelRowSet.has(j.model.toUpperCase()));
  const unmatchedJobs = jobs.filter((j) => !modelRowSet.has(j.model.toUpperCase()));
  console.log(`Matched to DB: ${matchedJobs.length}`);
  console.log(`No DB match (will skip): ${unmatchedJobs.length}`);
  if (unmatchedJobs.length > 0) console.log("Unmatched:", unmatchedJobs.map((j) => j.model).join(", "));

  const noImageModels = [...modelRowSet].filter((m) => !jobs.some((j) => j.model.toUpperCase() === m));
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
  const allSkipped = results.flatMap((r) => r.skipped.map((f) => `${r.model}: ${f}`));
  console.log(`\nUpload complete. Success: ${successResults.length}, Failed: ${failedResults.length}`);
  if (allSkipped.length > 0) {
    console.log(`Skipped ${allSkipped.length} supplementary TIFF(s) that couldn't convert:`);
    allSkipped.forEach((s) => console.log(`  ${s}`));
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
  console.log(`\nDone. ${updated} Klewe product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
