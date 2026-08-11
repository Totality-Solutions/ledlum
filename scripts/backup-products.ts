import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function backup() {
  const all: any[] = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("ledlum_products")
      .select("*")
      .range(from, from + pageSize - 1);

    if (error) {
      console.log("Backup error:", error.message);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const outPath = `./scripts/backups/ledlum_products_${Date.now()}.json`;
  fs.mkdirSync("./scripts/backups", { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`Backed up ${all.length} rows to ${outPath}`);
}

backup();
