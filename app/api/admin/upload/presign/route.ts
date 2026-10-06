import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminSession";
import { buildCmsKey, getPresignedUploadUrl, getPublicUrl } from "@/lib/r2";

export const runtime = "nodejs";

// For files too big to pass through a server function (videos, large PDFs):
// returns a short-lived URL the browser PUTs the file to directly.
// Needs a CORS rule on the R2 bucket allowing PUT from the site's origin.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const body = await request.json().catch(() => ({}));
  const filename = typeof body.filename === "string" ? body.filename : "";
  const contentType = typeof body.contentType === "string" && body.contentType ? body.contentType : "application/octet-stream";
  if (!filename) return NextResponse.json({ error: "filename is required" }, { status: 400 });

  const ext = (filename.split(".").pop() || "bin").toLowerCase();
  const kind = contentType.startsWith("image/") ? "image" : contentType.startsWith("video/") ? "video" : "file";
  const key = buildCmsKey(kind, filename, ext);

  try {
    const uploadUrl = await getPresignedUploadUrl({ key, contentType, expiresInSeconds: 900 });
    return NextResponse.json({ uploadUrl, url: getPublicUrl(key) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Could not prepare upload" }, { status: 500 });
  }
}
