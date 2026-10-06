import { NextResponse } from "next/server";
import { getContents, getPublishedPosts } from "@/lib/cms/content";

export async function GET() {
  const [posts, content] = await Promise.all([
    getPublishedPosts(),
    getContents(["site.settings", "collections"] as const),
  ]);
  const base = content["site.settings"].siteUrl.replace(/\/$/, "");
  const urls = [
    `${base}/`,
    `${base}/about`,
    `${base}/project`,
    `${base}/contact`,
    `${base}/blog`,
    ...content.collections.items.filter((c) => c.visible).map((c) => `${base}/product/${c.slug}`),
    ...posts.map((p) => `${base}/blog/${p.slug}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `<url>
      <loc>${u}</loc>
      <changefreq>weekly</changefreq>
    </url>`
      )
      .join("\n")}
  </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
