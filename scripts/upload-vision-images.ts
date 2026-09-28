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
const COLLECTION = "indoor";
const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp"]);

// Folder names in the Drive export don't match the DB model codes ("_" for "/",
// "Ma" for "mA", spaces for dashes), so map them explicitly rather than guess.
const FOLDER_TO_MODEL: Record<string, string> = {
  "AD+S1": "AD+S1",
  "AD1": "AD1",
  "AP1": "AP1",
  "ASM-001(ZB)": "ASM-001(ZB)",
  "ASM-002(ZB)": "ASM-002(ZB)",
  "BLE SWITCH-GRAY_BLACK": "BLE-SWITCH GRAY/BLACK",
  "BLE-REMOTE": "BLE-REMOTE",
  "RF REMOTE": "RF-REMOTE",
  "RF SWITCH-GRAY_BLACK": "RF-SWITCH GRAY/BLACK",
  "SMART-RELAY": "SMART-RELAY",
  "TUNDRIV_RF+BLE_15-22v_300Ma(7W)": "TUNDRIV_RF+BLE 15-22V/300mA (7W)",
  "TUNDRIV_RF+BLE_18-24v_270Ma(7W)": "TUNDRIV_RF+BLE 18-24V/270mA (7W)",
  "TUNDRIV_RF+BLE_18-24v_600Ma(14W)": "TUNDRIV_RF+BLE 18-24V/600mA (14W)",
  "TUNDRIV_RF+BLE_36_100-300Ma(5-12W)": "TUNDRIV_RF+BLE 36/100-300mA (5-12W)",
  "TUNDRIV_RF+BLE_36_350-500Ma(15-20W)": "TUNDRIV_RF+BLE 36/350-500mA (15-20W)",
  "TUNDRIV_RF+BLE_36_600-750Ma(24-30W)": "TUNDRIV_RF+BLE 36/600-750mA (24-30W)",
  "TUNDRIV_RF+BLE_48MAG": "TUNDRIV_RF+BLE 48VMAG",
  "TUNDRIV_RF+BLE_54v_300Ma(18W)": "TUNDRIV_RF+BLE 54V/300mA (18W)",
  "TUNDRIV_RF+BLE_CV_12-24v_8A(90-180W)": "TUNDRIV_RF+BLE CV_12-24V/8A (90-180W)",
  "TUNDRIV_RF+BLE_RD_36_170mA(7W)": "TUNDRIV_RF+BLE RD_36/170mA (7W)",
  "TUNDRIV_RF+BLE_RD_36_270mA(12W)": "TUNDRIV_RF+BLE RD_36/270mA (12W)",
  "TUNDRIV_RF+BLE_RD_36_450mA(18W)": "TUNDRIV_RF+BLE RD_36/450 (18W)",
  "UNI-GW": "UNI-GW",
  "UNI-IRBL": "UNI-IRBL",
};

// White products on a white background score like drawings in inkRatio(), so
// for these the photo is picked by hand (verified visually).
const HERO_OVERRIDE: Record<string, string> = {
  "ASM-002(ZB)": "ASM-002(ZB).jpg",
  "TUNDRIV_RF+BLE_36_100-300Ma(5-12W)": "TUNDRIV_RF+BLE_36.100-300mA(15-20W).jpg",
  "TUNDRIV_RF+BLE_36_600-750Ma(24-30W)": "TUNDRIV_RF+BLE_36.600-750mA(24-30W).jpg",
};

function resolveRoot(): string {
  const downloads = "C:/Users/Admin/Downloads";
  const outer = fs
    .readdirSync(downloads, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.toUpperCase().startsWith("VISION"));
  if (!outer) throw new Error("Could not find the extracted 'VISION' folder under Downloads");
  const outerPath = path.join(downloads, outer.name);
  const inner = fs
    .readdirSync(outerPath, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.toUpperCase().startsWith("VISION"));
  if (!inner) throw new Error(`Could not find the inner 'VISION' folder inside ${outerPath}`);
  return path.join(outerPath, inner.name);
}

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Each folder has a product photo and a white-background dimension drawing, but
// the file names don't say which is which (e.g. "AD1.jpg" is the drawing and
// "AD-1.jpg" the photo). Share of non-near-white pixels tells them apart: line
// drawings are almost entirely white, photos aren't. Higher = more photo-like.
async function inkRatio(filePath: string): Promise<number> {
  const { data, info } = await sharp(filePath)
    .resize(200, 200, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let ink = 0;
  const pixels = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i] < 200 || data[i + 1] < 200 || data[i + 2] < 200) ink++;
  }
  return ink / pixels;
}

async function uploadOne(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;
}

async function main() {
  const ROOT = resolveRoot();
  console.log(`Source: ${ROOT}\n`);

  const { data: rows, error } = await supabase
    .from("ledlum_products")
    .select("id, model")
    .eq("collection", COLLECTION)
    .eq("category", "VISION SERIES");
  if (error) throw error;
  const dbModels = new Set((rows || []).map((r: any) => r.model));

  const folders = fs.readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  const unmappedFolders = folders.filter((f) => !FOLDER_TO_MODEL[f]);
  const missingInDb = Object.values(FOLDER_TO_MODEL).filter((m) => !dbModels.has(m));
  const dbWithoutFolder = [...dbModels].filter((m) => !Object.values(FOLDER_TO_MODEL).includes(m) || !folders.some((f) => FOLDER_TO_MODEL[f] === m));
  if (unmappedFolders.length) console.log("Folders with no mapping (skipped):", unmappedFolders.join(", "));
  if (missingInDb.length) throw new Error(`Mapped models not found in DB: ${missingInDb.join(", ")}`);
  if (dbWithoutFolder.length) console.log("Vision products with no image folder:", dbWithoutFolder.join(", "));

  const jobs: { model: string; files: string[] }[] = [];
  for (const folder of folders) {
    const model = FOLDER_TO_MODEL[folder];
    if (!model) continue;
    const dir = path.join(ROOT, folder);
    const files = fs
      .readdirSync(dir)
      .filter((n) => IMAGE_EXT.has((n.split(".").pop() || "").toLowerCase()))
      .map((n) => path.join(dir, n));
    const scored = await Promise.all(files.map(async (f) => ({ f, ink: await inkRatio(f) })));
    // Photo first (hero), dimension drawing after.
    const hero = HERO_OVERRIDE[folder];
    scored.sort((a, b) =>
      hero ? Number(path.basename(b.f) === hero) - Number(path.basename(a.f) === hero) : b.ink - a.ink
    );
    jobs.push({ model, files: scored.map((s) => s.f) });
    console.log(
      `${model}\n` + scored.map((s, i) => `   ${i + 1}. ${path.basename(s.f)}  (ink ${(s.ink * 100).toFixed(1)}%)`).join("\n")
    );
  }

  if (process.env.DRY_RUN === "1") {
    console.log(`\nDRY RUN — ${jobs.length} models ready, nothing uploaded.`);
    return;
  }

  let updated = 0;
  for (const job of jobs) {
    const urls: string[] = [];
    for (let i = 0; i < job.files.length; i++) {
      const ext = (job.files[i].split(".").pop() || "jpg").toLowerCase();
      const finalExt = ext === "jpeg" ? "jpg" : ext;
      const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
      const key = `product/${slugify(COLLECTION)}/${slugify(job.model)}/${i + 1}.${finalExt}`;
      urls.push(await uploadOne(key, fs.readFileSync(job.files[i]), contentType));
    }

    // Exact match, not ilike: "_" in these model codes is an ilike wildcard.
    const { data, error: updateErr } = await supabase
      .from("ledlum_products")
      .update({ hero_image: urls[0], gallery_images: urls })
      .eq("collection", COLLECTION)
      .eq("model", job.model)
      .select("id");
    if (updateErr) console.log(`  FAILED update for ${job.model}: ${updateErr.message}`);
    else if (!data || data.length === 0) console.log(`  WARNING: update for ${job.model} matched 0 rows`);
    else {
      updated++;
      console.log(`  [${updated}/${jobs.length}] ${job.model} — ${urls.length} image(s)`);
    }
  }
  console.log(`\nDone. ${updated} Vision product rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
