import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  checkSetupKey,
  createSessionToken,
  hashPassword,
  ADMIN_SESSION_COOKIE,
  MIN_PASSWORD_LENGTH,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/adminAuth";

async function countUsers(): Promise<number | null> {
  const { count, error, status } = await supabaseAdmin
    .from("admin_users")
    .select("id", { count: "exact", head: true });
  // A HEAD count against a missing table comes back with no error object and
  // a null count, so treat a null count as "table not there".
  return error || status >= 400 || count === null ? null : count;
}

// GET: lets the login page know whether first-time setup is still needed.
export async function GET() {
  const count = await countUsers();
  if (count === null) {
    return NextResponse.json(
      { error: "admin_users table not found — run supabase/migrations/006_create_cms_tables.sql" },
      { status: 500 }
    );
  }
  return NextResponse.json({ needsSetup: count === 0 });
}

// POST: creates the first admin. Only works while there are zero users, and
// requires the old ADMIN_PASSWORD env var as a setup key.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const setupKey = typeof body.setupKey === "string" ? body.setupKey : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const count = await countUsers();
  if (count === null) {
    return NextResponse.json({ error: "admin_users table not found" }, { status: 500 });
  }
  if (count > 0) {
    return NextResponse.json({ error: "Setup has already been completed" }, { status: 403 });
  }
  if (!checkSetupKey(setupKey)) {
    return NextResponse.json({ error: "Incorrect setup key" }, { status: 401 });
  }
  if (!name || !email.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
      { status: 400 }
    );
  }

  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .insert({ name, email, password_hash: hashPassword(password), role: "admin" })
    .select("id")
    .single();
  if (error || !user) {
    return NextResponse.json({ error: error?.message || "Could not create user" }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
