import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyPassword } from "@/lib/adminAuth";
import { sendAdminActionEmail } from "@/lib/adminEmails";

// Re-sends the verification email. Needs the password too, so it can't be
// used to spam someone's inbox knowing only their address.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const { data: user } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, name, password_hash, email_verified_at, active")
    .eq("email", email)
    .maybeSingle();

  if (!user || !user.active || user.email_verified_at || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  }

  try {
    await sendAdminActionEmail(request, user, "verify");
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
