import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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
const COLLECTION = "indoor";
const CATEGORY = "ALUMINIUM EMPTY PROFILES";
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

function resolveRoot(): string {
  const downloads = "C:/Users/Admin/Downloads";
  const outer = fs
    .readdirSync(downloads, { withFileTypes: true })
    .find((d) => d.isDirectory() && d.name.toLowerCase().startsWith("aluminium empty profiles"));
  if (!outer) throw new Error("Could not find the extracted 'Aluminium Empty Profiles' folder under Downloads");
  return path.join(downloads, outer.name, "Aluminium Empty Profiles");
}

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Files are named after the model with "/" swapped for "_" (a "/" can't be in a
// file name), e.g. "LLP-14_60.png" -> "LLP-14/60". A couple of them
// ("LLP-17.4_07", "LLP-23_9.8") lost their ".png" extension in the export, so
// only strip a real ".png" suffix and check the file bytes, not the name.
function fileToModel(name: string): string {
  return name.replace(/\.png$/i, "").replace(/_/g, "/");
}

async function main() {
  const ROOT = resolveRoot();
  console.log(`Source: ${ROOT}\n`);

  const { data: rows, error } = await supabase
    .from("ledlum_products")
    .select("model")
    .eq("collection", COLLECTION)
    .eq("category", CATEGORY);
  if (error) throw error;
  const dbModels = new Set((rows || []).map((r: any) => r.model));

  const jobs: { model: string; file: string }[] = [];
  for (const name of fs.readdirSync(ROOT)) {
    const file = path.join(ROOT, name);
    if (!fs.statSync(file).isFile()) continue;
    if (!fs.readFileSync(file).subarray(0, 4).equals(PNG_MAGIC)) {
      console.log(`Skipping non-PNG file: ${name}`);
      continue;
    }
    const model = fileToModel(name);
    if (!dbModels.has(model)) {
      console.log(`No DB product for file ${name} (model ${model}) — skipped`);
      continue;
    }
    jobs.push({ model, file });
  }

  const covered = new Set(jobs.map((j) => j.model));
  const noImage = [...dbModels].filter((m) => !covered.has(m));
  console.log(`Matched: ${jobs.length}/${dbModels.size}`);
  if (noImage.length) console.log(`Products with no image in folder: ${noImage.join(", ")}`);

  if (process.env.DRY_RUN === "1") {
    jobs.forEach((j) => console.log(`  ${j.model} <- ${path.basename(j.file)}`));
    console.log("\nDRY RUN — nothing uploaded.");
    return;
  }

  let updated = 0;
  for (const job of jobs) {
    const key = `product/${slugify(COLLECTION)}/${slugify(job.model)}/1.png`;
    await r2.send(
      new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: fs.readFileSync(job.file), ContentType: "image/png" })
    );
    const url = `${PUBLIC_URL.replace(/\/$/, "")}/${key}`;

    const { data, error: updateErr } = await supabase
      .from("ledlum_products")
      .update({ hero_image: url, gallery_images: [url] })
      .eq("collection", COLLECTION)
      .eq("model", job.model)
      .select("id");
    if (updateErr) console.log(`  FAILED update for ${job.model}: ${updateErr.message}`);
    else if (!data || data.length === 0) console.log(`  WARNING: update for ${job.model} matched 0 rows`);
    else {
      updated++;
      console.log(`  [${updated}/${jobs.length}] ${job.model} -> ${url}`);
    }
  }
  console.log(`\nDone. ${updated} Aluminium Empty Profile rows updated with images.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
