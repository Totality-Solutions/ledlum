import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { unusablePasswordHash } from "@/lib/adminAuth";
import { sendAdminActionEmail } from "@/lib/adminEmails";

const USER_COLUMNS = "id, email, name, role, active, email_verified_at, last_login_at, created_at";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select(USER_COLUMNS)
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data, currentUserId: auth.id });
}

// Invites a user: creates the account without a usable password and emails
// them a link to choose one (which also verifies their address).
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = body.role === "admin" ? "admin" : "editor";

  if (!name || !email.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .insert({ name, email, role, password_hash: unusablePasswordHash(), email_verified_at: null })
    .select(`${USER_COLUMNS}, password_hash`)
    .single();
  if (error || !user) {
    const message = error?.code === "23505" ? "A user with this email already exists" : error?.message;
    return NextResponse.json({ error: message || "Could not create user" }, { status: 400 });
  }

  try {
    await sendAdminActionEmail(request, user, "invite");
  } catch (err: any) {
    return NextResponse.json(
      { error: `User created, but the invite email failed: ${err.message}. Use "Resend invite".` },
      { status: 502 }
    );
  }

  const { password_hash: _omit, ...safe } = user;
  return NextResponse.json({ user: safe });
}
