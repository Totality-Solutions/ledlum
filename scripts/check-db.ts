import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { count: wCount } = await supabase
    .from("ledlum_products")
    .select("*", { count: "exact", head: true })
    .eq("website", "W");

  const { count: nullCount } = await supabase
    .from("ledlum_products")
    .select("*", { count: "exact", head: true })
    .is("website", null);

  console.log(`website=W: ${wCount}`);
  console.log(`website=null: ${nullCount}`);

  const { data: sample } = await supabase
    .from("ledlum_products")
    .select("model, website, family, category, group_name")
    .eq("group_name", "LED SMD CONCEALED DOWN LIGHT FI")
    .limit(5);

  console.log("\nLED SMD CONCEALED DOWN LIGHT FI samples:");
  sample?.forEach((r) =>
    console.log(`  ${r.model} | website:${r.website} | family:${r.family}`)
  );

  const { data: sample2 } = await supabase
    .from("ledlum_products")
    .select("model, website, family, category, group_name")
    .eq("group_name", "LED STRIP LIGHT DRIVERS NEW")
    .limit(5);

  console.log("\nLED STRIP LIGHT DRIVERS NEW samples:");
  sample2?.forEach((r) =>
    console.log(`  ${r.model} | website:${r.website} | family:${r.family}`)
  );
}

check();
