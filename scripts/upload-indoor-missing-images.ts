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
const COLLECTION = "indoor";
const DOWNLOADS = "C:/Users/Admin/Downloads";
const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);

// Only these models are touched — the Premium series export contains every
// Premium product, and the ones not listed here already have images.
const TARGET_MODELS = [
  "L+LSL-004A", "L+LSL-007A", "L+LSL-016B", "L+LSL-016C", "L+LSL-023B",
  "LLF-1001-FR3 (2PC)", "LLF-1001-FR3 (5PC)",
  "LLF-1002-FR3 (2PC)", "LLF-1002-FR3 (5PC)",
  "LLF-1003-FR3 (2PC)", "LLF-1003-FR3 (3PC)",
  "LLF-1028-TR", "LLF-1030-TR", "LLF-1032-TR", "LLF-1034-TR", "LLF-1036-TR",
  "LLF-1038-TR", "LLF-1042-TR", "LLF-1044-TR", "LLF-1046-TR",
  "LLF-220", "LLF-254B",
  "LLWL-048D", "LLWL-100", "LLWL-101", "LLWL-106", "LLWL-107", "LLWL-108",
];

// Downloads are matched by name prefix so a re-download with a new Drive
// timestamp still works. The strip-plus folder name has a trailing space.
function findDownload(prefix: string): string {
  const hit = fs.readdirSync(DOWNLOADS, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.startsWith(prefix));
  if (!hit) throw new Error(`Could not find a download folder starting with "${prefix}"`);
  return path.join(DOWNLOADS, hit.name);
}

function firstSubdir(dir: string): string {
  const sub = fs.readdirSync(dir, { withFileTypes: true }).find((d) => d.isDirectory());
  if (!sub) throw new Error(`No subfolder inside ${dir}`);
  return path.join(dir, sub.name);
}

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function isImage(name: string): boolean {
  return IMAGE_EXT.has((name.split(".").pop() || "").toLowerCase());
}

function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}

// Same order upload-product-images.ts gives existing products (numbered photo
// like "28.jpg" first, then alphabetical), except a file named exactly after
// the model always leads — "LLWL-108.png" before "Copy of LLWL-108.png".
function orderFiles(files: string[], model: string): string[] {
  const numeric = (n: string) => parseInt(n, 10);
  return [...files].sort((a, b) => {
    const ea = baseName(a).toUpperCase() === model.toUpperCase();
    const eb = baseName(b).toUpperCase() === model.toUpperCase();
    if (ea !== eb) return ea ? -1 : 1;
    const na = numeric(a), nb = numeric(b);
    if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
    if (!isNaN(na) !== !isNaN(nb)) return !isNaN(na) ? -1 : 1;
    return a.localeCompare(b);
  });
}

function imagesIn(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).filter((f) => f.isFile() && isImage(f.name)).map((f) => f.name);
}

// model -> ordered list of full file paths
function collectJobs(dbModels: Set<string>): Map<string, string[]> {
  const jobs = new Map<string, string[]>();
  const add = (model: string, dir: string, files: string[]) => {
    if (!TARGET_MODELS.includes(model) || !files.length) return;
    jobs.set(model, orderFiles(files, model).map((f) => path.join(dir, f)));
  };

  // Strip Plus: one loose file per model, named after it.
  const strip = firstSubdir(findDownload("LED Strip Light Plus Series"));
  for (const f of imagesIn(strip)) add(baseName(f), strip, [f]);

  // Premium: one folder per model. The TR variants live in folders without the
  // "-TR" suffix ("LLF-1028" holds LLF-1028-TR's images) — there's no plain
  // LLF-1028 product, so the suffix is only added when the bare name isn't one.
  const premium = firstSubdir(findDownload("LLF "));
  for (const d of fs.readdirSync(premium, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    const model = dbModels.has(d.name) ? d.name : dbModels.has(`${d.name}-TR`) ? `${d.name}-TR` : d.name;
    const dir = path.join(premium, d.name);
    add(model, dir, imagesIn(dir));
  }

  // Loose Drive exports (wall lights; LLF-220 / LLF-254B): one folder per model.
  for (const outer of fs.readdirSync(DOWNLOADS, { withFileTypes: true })) {
    if (!outer.isDirectory() || !outer.name.startsWith("drive-download-20260928T092")) continue;
    const root = path.join(DOWNLOADS, outer.name);
    for (const d of fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
      const dir = path.join(root, d.name);
      add(d.name, dir, imagesIn(dir));
    }
  }

  return jobs;
}

async function main() {
  const { data: rows, error } = await supabase
    .from("ledlum_products")
    .select("model, website")
    .eq("collection", COLLECTION)
    .in("model", TARGET_MODELS);
  if (error) throw error;
  const dbModels = new Set((rows || []).map((r: any) => r.model));
  const hidden = (rows || []).filter((r: any) => r.website !== "W").map((r: any) => r.model);

  const notInDb = TARGET_MODELS.filter((m) => !dbModels.has(m));
  if (notInDb.length) throw new Error(`Target models not in DB: ${notInDb.join(", ")}`);

  const jobs = collectJobs(dbModels);
  const noImages = TARGET_MODELS.filter((m) => !jobs.has(m));

  for (const [model, files] of jobs) {
    console.log(`${model}${hidden.includes(model) ? "  (hidden on site: website != W)" : ""}`);
    files.forEach((f, i) => console.log(`   ${i + 1}. ${path.relative(DOWNLOADS, f)}`));
  }
  console.log(`\nWith images: ${jobs.size}/${TARGET_MODELS.length}`);
  if (noImages.length) console.log(`No images found: ${noImages.join(", ")}`);

  if (process.env.DRY_RUN === "1") {
    console.log("\nDRY RUN — nothing uploaded.");
    return;
  }

  let updated = 0;
  for (const [model, files] of jobs) {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const ext = (files[i].split(".").pop() || "jpg").toLowerCase();
      const finalExt = ext === "jpeg" ? "jpg" : ext;
      const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
      const key = `product/${slugify(COLLECTION)}/${slugify(model)}/${i + 1}.${finalExt}`;
      await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(files[i]), ContentType: contentType }));
      urls.push(`${PUBLIC_URL.replace(/\/$/, "")}/${key}`);
    }

    // Exact match, not ilike: "_" / "%" would be wildcards and "+" / "()" appear in these codes.
    const { data, error: updateErr } = await supabase
      .from("ledlum_products")
      .update({ hero_image: urls[0], gallery_images: urls })
      .eq("collection", COLLECTION)
      .eq("model", model)
      .select("id");
    if (updateErr) console.log(`  FAILED update for ${model}: ${updateErr.message}`);
    else if (!data || data.length === 0) console.log(`  WARNING: update for ${model} matched 0 rows`);
    else {
      updated++;
      console.log(`  [${updated}/${jobs.size}] ${model} — ${urls.length} image(s)`);
    }
  }
  console.log(`\nDone. ${updated} indoor product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
