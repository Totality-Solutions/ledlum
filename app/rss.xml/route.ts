import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content/posts";
import { siteConfig } from "@/config/site";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((p) => `
      <item>
        <title>${escape(p.title)}</title>
        <link>${siteConfig.url}/blog/${p.slug}</link>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        ${p.summary ? `<description>${escape(p.summary)}</description>` : ""}
      </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${escape(siteConfig.name)}</title>
      <link>${siteConfig.url}</link>
      <description>${escape(siteConfig.description)}</description>
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
