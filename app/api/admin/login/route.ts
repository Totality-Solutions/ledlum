import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  createSessionToken,
  verifyPassword,
  ADMIN_SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, password_hash, active, email_verified_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Login is unavailable right now" }, { status: 500 });
  }
  if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  }
  // Only revealed once the password has checked out.
  if (!user.email_verified_at) {
    return NextResponse.json(
      { error: "Please verify your email first — check your inbox for the link.", unverified: true },
      { status: 403 }
    );
  }

  await supabaseAdmin
    .from("admin_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", user.id);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user.id), SESSION_COOKIE_OPTIONS);
  return response;
}
