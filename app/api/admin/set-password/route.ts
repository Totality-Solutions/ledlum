import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  createSessionToken,
  hashPassword,
  ADMIN_SESSION_COOKIE,
  MIN_PASSWORD_LENGTH,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/adminAuth";
import { readActionToken } from "@/lib/adminTokens";

const INVALID = "This link is invalid, expired or has already been used";

// GET ?token= — tells the page who the link is for (invite vs reset).
export async function GET(request: NextRequest) {
  const user = await readActionToken(request.nextUrl.searchParams.get("token") || "", ["invite", "reset"]);
  if (!user || !user.active) return NextResponse.json({ error: INVALID }, { status: 400 });
  return NextResponse.json({ email: user.email, name: user.name, purpose: user.purpose });
}

// POST — accepts an invite or completes a password reset, then signs in.
// Opening the emailed link also proves the address, so it's marked verified.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  const user = await readActionToken(body.token, ["invite", "reset"]);
  if (!user || !user.active) return NextResponse.json({ error: INVALID }, { status: 400 });
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const update: Record<string, unknown> = {
    password_hash: hashPassword(password),
    email_verified_at: user.email_verified_at || now,
    last_login_at: now,
  };
  if (user.purpose === "invite" && typeof body.name === "string" && body.name.trim()) {
    update.name = body.name.trim();
  }

  const { error } = await supabaseAdmin.from("admin_users").update(update).eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user.id), SESSION_COOKIE_OPTIONS);
  return response;
}
