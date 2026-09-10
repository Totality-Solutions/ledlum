import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginPage || isLoginApi) return NextResponse.next();

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authed = verifySessionToken(token);

  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // The image-upload route is excluded here and checks auth itself instead
  // (see app/api/admin/products/[id]/images/route.ts) — any route covered by
  // middleware/proxy gets routed through a much weaker body parser for large
  // multipart uploads in Next.js, which made uploads over ~8-10MB fail with
  // "Failed to parse body as FormData" even though the route itself is fine.
  matcher: ["/admin/:path*", "/api/admin/((?!products/[^/]+/images).*)"],
};
