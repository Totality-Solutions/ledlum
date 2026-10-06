import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

// Signature-only check — cheap enough to run on every admin request. Route
// handlers still call requireAdmin() (lib/adminSession.ts), which also checks
// the user is active and enforces roles.
const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/admin/setup",
  "/api/admin/login",
  "/api/admin/setup",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Upload routes are excluded here and check auth themselves instead (see
  // app/api/admin/products/[id]/images/route.ts and app/api/admin/upload) —
  // any route covered by middleware/proxy gets routed through a much weaker
  // body parser for large multipart uploads in Next.js, which made uploads
  // over ~8-10MB fail with "Failed to parse body as FormData" even though the
  // route itself is fine.
  matcher: ["/admin/:path*", "/api/admin/((?!products/[^/]+/images|upload).*)"],
};
