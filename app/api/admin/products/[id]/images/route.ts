import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { uploadFile, deleteFile, buildProductKey } from "@/lib/r2";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

// This route is excluded from proxy.ts's matcher and checks auth itself —
// large multipart uploads (>~8-10MB) were failing with "Failed to parse body
// as FormData" purely because proxy.ts's matcher covered this path. Any route
// middleware/proxy intercepts gets routed through a much weaker body parser
// for large multipart bodies in Next.js, regardless of what the middleware
// code does or which runtime the route itself declares.
export const runtime = "nodejs";

function isAuthed(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

type ProductRow = {
  id: number;
  model: string;
  collection: string;
  hero_image: string | null;
  gallery_images: string[];
};

async function loadProduct(id: string): Promise<ProductRow | null> {
  const { data, error } = await supabaseAdmin
    .from("ledlum_products")
    .select("id, model, collection, hero_image, gallery_images")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as ProductRow;
}

function nextSequence(galleryImages: string[]): number {
  let max = 0;
  for (const url of galleryImages) {
    const filename = url.split("/").pop() || "";
    const n = parseInt(filename, 10);
    if (!isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

function urlToKey(url: string): string | null {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!base || !url.startsWith(base + "/")) return null;
  return url.slice(base.length + 1);
}

function contentTypeFor(ext: string): string {
  switch (ext.toLowerCase()) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const formData = await request.formData().catch(() => null);
  const files = (formData?.getAll("files") || []).filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  let seq = nextSequence(product.gallery_images || []);
  const newUrls: string[] = [];

  for (const file of files) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = buildProductKey(product.collection, product.model, `${seq}.${ext}`);
    const { url } = await uploadFile({
      key,
      body: buffer,
      contentType: file.type || contentTypeFor(ext),
    });
    newUrls.push(url);
    seq += 1;
  }

  const galleryImages = [...(product.gallery_images || []), ...newUrls];
  const heroImage = product.hero_image || newUrls[0];

  const { data, error } = await supabaseAdmin
    .from("ledlum_products")
    .update({ hero_image: heroImage, gallery_images: galleryImages })
    .eq("id", id)
    .select("id, model, collection, hero_image, gallery_images")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const { heroUrl } = await request.json().catch(() => ({ heroUrl: null }));
  if (typeof heroUrl !== "string" || !(product.gallery_images || []).includes(heroUrl)) {
    return NextResponse.json({ error: "heroUrl must be one of the product's existing gallery images" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("ledlum_products")
    .update({ hero_image: heroUrl })
    .eq("id", id)
    .select("id, model, collection, hero_image, gallery_images")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const product = await loadProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const url = request.nextUrl.searchParams.get("url");
  const purge = request.nextUrl.searchParams.get("purge") === "true";
  if (!url) return NextResponse.json({ error: "Missing url query param" }, { status: 400 });

  const galleryImages = (product.gallery_images || []).filter((u) => u !== url);
  const heroImage = product.hero_image === url ? galleryImages[0] || null : product.hero_image;

  if (purge) {
    const key = urlToKey(url);
    if (key) await deleteFile(key).catch(() => {});
  }

  const { data, error } = await supabaseAdmin
    .from("ledlum_products")
    .update({ hero_image: heroImage, gallery_images: galleryImages })
    .eq("id", id)
    .select("id, model, collection, hero_image, gallery_images")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}
