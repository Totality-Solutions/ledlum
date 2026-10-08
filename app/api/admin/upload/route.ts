import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminSession";
import { buildCmsKey, uploadFile } from "@/lib/r2";
import { generateImageVariants } from "@/lib/imageVariants";

// Excluded from proxy.ts's matcher (see the note there about multipart
// bodies) — checks auth itself.
export const runtime = "nodejs";

// Server function request bodies are capped (~6MB on Netlify), so larger
// files — videos, big PDFs — go straight to R2 via ./presign instead.
const MAX_BYTES = 4.5 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 2400;

// Images are re-encoded to WebP and capped in width here, so whatever an
// editor uploads (a 6000px phone photo, a PNG) stays light on the public site.
// GIF/SVG are stored untouched (animation / vector).
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large for direct upload" }, { status: 413 });
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const input = Buffer.from(await file.arrayBuffer());
  const isOptimizableImage =
    file.type.startsWith("image/") && !["image/gif", "image/svg+xml"].includes(file.type);

  // Loaded here rather than at the top of the file: if sharp's native binary
  // can't load on the server, the upload still goes through (the original
  // file, unconverted) instead of the whole route crashing.
  const sharp = isOptimizableImage
    ? await import("sharp").then((m) => m.default).catch((err) => {
        console.error("sharp failed to load; storing the original image:", err);
        return null;
      })
    : null;

  try {
    if (sharp) {
      const body = await sharp(input)
        .rotate()
        .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      const key = buildCmsKey("image", file.name, "webp");
      const { url } = await uploadFile({ key, body, contentType: "image/webp" });
      // Resized copies for the site's image loader (responsive srcset).
      await generateImageVariants(key, body);
      return NextResponse.json({ url });
    }

    const kind = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file";
    const key = buildCmsKey(kind, file.name, ext || "bin");
    const { url } = await uploadFile({
      key,
      body: input,
      contentType: file.type || "application/octet-stream",
    });
    await generateImageVariants(key, input);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("CMS upload failed:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
