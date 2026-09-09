import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role key bypasses RLS — only ever import this from server-side
// admin routes (never from a "use client" component or public API route).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
