import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendAdminActionEmail } from "@/lib/adminEmails";

// Emails a password reset link. Always answers the same way, so it can't be
// used to find out which addresses have accounts.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (email) {
    const { data: user } = await supabaseAdmin
      .from("admin_users")
      .select("id, email, name, password_hash, email_verified_at, active")
      .eq("email", email)
      .maybeSingle();

    if (user && user.active && user.email_verified_at) {
      await sendAdminActionEmail(request, user, "reset").catch((err) =>
        console.error("Password reset email failed:", err)
      );
    }
  }

  return NextResponse.json({ ok: true });
}
