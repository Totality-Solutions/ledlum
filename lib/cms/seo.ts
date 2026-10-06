import "server-only";
import type { Metadata } from "next";
import { buildMetadata, type BuildMetadataOptions } from "@/lib/seo";
import { getContent } from "./content";

type PageKey = "home" | "about" | "project" | "blog" | "contact";

// Page metadata with the title/description editable under
// Admin → Site settings & SEO. Falls back to `fallback` and then to the site
// default description.
export async function buildCmsMetadata(
  page: PageKey,
  options: BuildMetadataOptions = {}
): Promise<Metadata> {
  const [seo, site] = await Promise.all([getContent("seo.pages"), getContent("site.settings")]);
  const title = seo[`${page}Title`] || options.title;
  const description = seo[`${page}Description`] || options.description || site.seoDescription;
  return buildMetadata({ ...options, title, description, site });
}
