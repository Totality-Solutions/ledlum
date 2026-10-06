import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { sendAdminActionEmail } from "@/lib/adminEmails";

// Admin-triggered emails for a user: re-send their invite (not yet
// verified) or send a password reset link (verified).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, name, password_hash, email_verified_at, active")
    .eq("id", id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.active) return NextResponse.json({ error: "Enable the user first" }, { status: 400 });

  const purpose = user.email_verified_at ? "reset" : "invite";
  try {
    await sendAdminActionEmail(request, user, purpose);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sent: purpose });
}
