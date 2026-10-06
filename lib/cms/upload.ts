// Client-side upload helper for the admin panel.
//
// Small files go through /api/admin/upload (images are converted to WebP
// there). Server functions can't take large request bodies, so big images are
// first scaled down in the browser, and big videos/PDFs are PUT straight to
// R2 with a presigned URL from /api/admin/upload/presign.

const DIRECT_LIMIT = 4.5 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 2400;

async function shrinkImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of [0.9, 0.8, 0.7, 0.6]) {
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (blob && blob.size <= DIRECT_LIMIT) {
      return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
    }
  }
  throw new Error("Image is too large even after resizing — please compress it first.");
}

async function uploadDirect(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
  return data.url;
}

async function uploadPresigned(file: File): Promise<string> {
  const contentType = file.type || "application/octet-stream";
  const res = await fetch("/api/admin/upload/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not prepare upload");

  try {
    const put = await fetch(data.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    if (!put.ok) throw new Error(`Storage returned ${put.status}`);
  } catch (err: any) {
    throw new Error(
      `Large-file upload failed (${err.message}). The R2 bucket needs a CORS rule allowing PUT from this site.`
    );
  }
  return data.url;
}

export async function uploadMedia(file: File): Promise<string> {
  if (file.size <= DIRECT_LIMIT) return uploadDirect(file);

  const isRasterImage = file.type.startsWith("image/") && !["image/gif", "image/svg+xml"].includes(file.type);
  if (isRasterImage) return uploadDirect(await shrinkImage(file));

  return uploadPresigned(file);
}
