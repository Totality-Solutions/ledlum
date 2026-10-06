import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { hashPassword, MIN_PASSWORD_LENGTH } from "@/lib/adminAuth";

type Params = { params: Promise<{ id: string }> };

const USER_COLUMNS = "id, email, name, role, active, email_verified_at, last_login_at, created_at";

// Guards against an admin locking everyone out by demoting/disabling/deleting
// the last active admin.
async function wouldRemoveLastAdmin(id: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("admin_users")
    .select("id")
    .eq("role", "admin")
    .eq("active", true)
    .not("email_verified_at", "is", null);
  const admins = data || [];
  return admins.length <= 1 && admins.some((a) => a.id === id);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const body = await request.json().catch(() => ({}));
  const isSelf = id === auth.id;

  // Editors may only change their own name/password.
  if (auth.role !== "admin" && !isSelf) {
    return NextResponse.json({ error: "Only admins can do this" }, { status: 403 });
  }

  const update: Record<string, unknown> = {};
  if (typeof body.name === "string" && body.name.trim()) update.name = body.name.trim();
  if (typeof body.password === "string" && body.password) {
    if (body.password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }
    update.password_hash = hashPassword(body.password);
  }

  if (auth.role === "admin") {
    if (body.role === "admin" || body.role === "editor") update.role = body.role;
    if (typeof body.active === "boolean") update.active = body.active;

    const demoting = update.role === "editor" || update.active === false;
    if (demoting && (await wouldRemoveLastAdmin(id))) {
      return NextResponse.json({ error: "There must be at least one active admin" }, { status: 400 });
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .update(update)
    .eq("id", id)
    .select(USER_COLUMNS)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user: data });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  if (id === auth.id) {
    return NextResponse.json({ error: "You can't delete your own account" }, { status: 400 });
  }
  if (await wouldRemoveLastAdmin(id)) {
    return NextResponse.json({ error: "There must be at least one active admin" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("admin_users").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
