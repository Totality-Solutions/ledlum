import "server-only";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ADMIN_SESSION_COOKIE, verifySessionToken, type AdminRole } from "@/lib/adminAuth";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

async function loadActiveUser(userId: string | null): Promise<AdminUser | null> {
  if (!userId) return null;
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, name, role, active")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data || !data.active) return null;
  return { id: data.id, email: data.email, name: data.name, role: data.role };
}

// For server components (admin layout/pages).
export async function getAdminUser(): Promise<AdminUser | null> {
  const store = await cookies();
  return loadActiveUser(verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value));
}

// For route handlers: returns the user, or a ready-made 401/403 response.
// Usage:
//   const auth = await requireAdmin(request);
//   if (auth instanceof NextResponse) return auth;
export async function requireAdmin(
  request: NextRequest,
  role?: AdminRole
): Promise<AdminUser | NextResponse> {
  const user = await loadActiveUser(
    verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
  );
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (role === "admin" && user.role !== "admin") {
    return NextResponse.json({ error: "Only admins can do this" }, { status: 403 });
  }
  return user;
}
