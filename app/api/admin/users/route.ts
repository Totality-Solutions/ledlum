import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminSession";
import { hashPassword, MIN_PASSWORD_LENGTH } from "@/lib/adminAuth";

const USER_COLUMNS = "id, email, name, role, active, last_login_at, created_at";

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

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request, "admin");
  if (auth instanceof NextResponse) return auth;

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = body.role === "admin" ? "admin" : "editor";

  if (!name || !email.includes("@")) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .insert({ name, email, role, password_hash: hashPassword(password) })
    .select(USER_COLUMNS)
    .single();
  if (error) {
    const message = error.code === "23505" ? "A user with this email already exists" : error.message;
    return NextResponse.json({ error: message }, { status: 400 });
  }
  return NextResponse.json({ user: data });
}
