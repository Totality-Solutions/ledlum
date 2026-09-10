import dotenv from "dotenv";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

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

function slugify(v: string): string {
  return v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function listAllKeys(prefix: string): Promise<string[]> {
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

async function main() {
  console.log("Loading all product models from Supabase...");
  const allRows: { model: string; collection: string }[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("model, collection")
      .range(from, from + pageSize - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  console.log(`Loaded ${allRows.length} DB product rows.`);

  const validPrefixes = new Set(
    allRows.map((r) => `product/${slugify(r.collection || "indoor")}/${slugify(r.model)}/`)
  );

  console.log("Listing R2 objects under product/indoor/ and product/outdoor/...");
  const indoorKeys = await listAllKeys("product/indoor/");
  const outdoorKeys = await listAllKeys("product/outdoor/");
  const allKeys = [...indoorKeys, ...outdoorKeys];
  console.log(`Found ${allKeys.length} total objects (${indoorKeys.length} indoor, ${outdoorKeys.length} outdoor).`);

  const orphaned: string[] = [];
  const orphanedPrefixes = new Set<string>();
  for (const key of allKeys) {
    const match = key.match(/^(product\/[^/]+\/[^/]+\/)/);
    const prefix = match ? match[1] : null;
    if (!prefix || !validPrefixes.has(prefix)) {
      orphaned.push(key);
      if (prefix) orphanedPrefixes.add(prefix);
    }
  }

  console.log(`\nOrphaned objects (no matching DB row at all): ${orphaned.length}`);
  console.log(`Orphaned model-prefixes: ${orphanedPrefixes.size}`);

  fs.mkdirSync("./scripts/backups", { recursive: true });
  fs.writeFileSync("./scripts/backups/orphaned-r2-keys.json", JSON.stringify(orphaned, null, 2));
  fs.writeFileSync(
    "./scripts/backups/orphaned-r2-prefixes.json",
    JSON.stringify([...orphanedPrefixes].sort(), null, 2)
  );
  console.log("Wrote scripts/backups/orphaned-r2-keys.json and orphaned-r2-prefixes.json");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
