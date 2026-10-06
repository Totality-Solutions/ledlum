import { NextResponse } from "next/server";
import { getContent, getPublishedPosts } from "@/lib/cms/content";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const [posts, site] = await Promise.all([getPublishedPosts(), getContent("site.settings")]);
  const base = site.siteUrl.replace(/\/$/, "");
  const items = posts
    .map((p) => `
      <item>
        <title>${escape(p.title)}</title>
        <link>${base}/blog/${p.slug}</link>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        ${p.description ? `<description>${escape(p.description)}</description>` : ""}
      </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escape(site.siteName.trim())}</title>
      <link>${base}</link>
      <description>${escape(site.seoDescription)}</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
