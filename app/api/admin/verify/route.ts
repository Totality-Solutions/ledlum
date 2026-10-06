import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createSessionToken, ADMIN_SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "@/lib/adminAuth";
import { readActionToken } from "@/lib/adminTokens";

// Confirms an email address from the link in the verification email, then
// signs the user in.
export async function POST(request: NextRequest) {
  const { token } = await request.json().catch(() => ({}));
  const user = await readActionToken(token, ["verify"]);
  if (!user) {
    return NextResponse.json({ error: "This link is invalid, expired or has already been used" }, { status: 400 });
  }
  if (!user.active) {
    return NextResponse.json({ error: "This account has been disabled" }, { status: 403 });
  }

  const now = new Date().toISOString();
  const { error } = await supabaseAdmin
    .from("admin_users")
    .update({ email_verified_at: now, last_login_at: now })
    .eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user.id), SESSION_COOKIE_OPTIONS);
  return response;
}
