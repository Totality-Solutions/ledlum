import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { hashPassword, isAllowedSetupEmail, MIN_PASSWORD_LENGTH } from "@/lib/adminAuth";
import { sendAdminActionEmail } from "@/lib/adminEmails";

// Number of users who can actually log in (verified). null = table missing.
async function countVerifiedUsers(): Promise<number | null> {
  const { count, error, status } = await supabaseAdmin
    .from("admin_users")
    .select("id", { count: "exact", head: true })
    .not("email_verified_at", "is", null);
  // A HEAD count against a missing table/column comes back with no error
  // object and a null count, so treat a null count as "not there".
  return error || status >= 400 || count === null ? null : count;
}

// GET: lets the login page know whether first-time setup is still needed.
export async function GET() {
  const count = await countVerifiedUsers();
  if (count === null) {
    return NextResponse.json(
      { error: "Admin tables are missing — run the migrations in supabase/migrations (006 and 007)." },
      { status: 500 }
    );
  }
  return NextResponse.json({ needsSetup: count === 0 });
}

// POST: registers the first admin as unverified and emails them a
// verification link. Only works while nobody has a verified account, and only
// for addresses allowed by ADMIN_SETUP_EMAILS.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const count = await countVerifiedUsers();
  if (count === null) {
    return NextResponse.json({ error: "Admin tables are missing — run the migrations" }, { status: 500 });
  }
  if (count > 0) {
    return NextResponse.json({ error: "Setup has already been completed — please log in" }, { status: 403 });
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

  const allowed = isAllowedSetupEmail(email);
  if (allowed === null) {
    return NextResponse.json(
      {
        error:
          "Setup is locked: set ADMIN_SETUP_EMAILS in the server environment to the email allowed to become the first admin.",
      },
      { status: 403 }
    );
  }
  if (!allowed) {
    return NextResponse.json({ error: "This email isn't allowed to set up the admin" }, { status: 403 });
  }

  // Re-submitting (e.g. the email got lost) just updates the pending account.
  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .upsert(
      { name, email, password_hash: hashPassword(password), role: "admin", active: true, email_verified_at: null },
      { onConflict: "email" }
    )
    .select("id, email, name, password_hash, email_verified_at")
    .single();
  if (error || !user) {
    return NextResponse.json({ error: error?.message || "Could not create user" }, { status: 500 });
  }

  try {
    await sendAdminActionEmail(request, user, "verify");
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
  return NextResponse.json({ ok: true, email });
}
