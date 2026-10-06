import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { SiteSettings } from "@/lib/cms/defaults";

export type BuildMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  openGraph?: Metadata["openGraph"];
  // CMS site settings (Admin → Site settings & SEO); falls back to
  // config/site.ts when omitted.
  site?: SiteSettings;
};

export function absoluteUrl(path: string, baseUrl: string = siteConfig.url) {
  if (!path) {
    return baseUrl;
  }

  try {
    return new URL(path).toString();
  } catch (error) {
    return new URL(path.replace(/^\//, ""), baseUrl).toString();
  }
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const site = options.site;
  const siteName = site?.siteName || siteConfig.name;
  const siteUrl = site?.siteUrl || siteConfig.url;
  const legalName = site?.legalName || siteConfig.legalName;

  const {
    title = siteName,
    description = site?.seoDescription || siteConfig.description,
    keywords = site?.keywords || siteConfig.keywords,
    canonical,
    ogImage,
    type = "website",
    openGraph,
  } = options;

  const isDefaultTitle = title === siteName;
  const resolvedTitle = isDefaultTitle ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical ? absoluteUrl(canonical, siteUrl) : siteUrl;
  const imageUrl = absoluteUrl(ogImage ?? (site?.defaultOgImage || siteConfig.defaultOgImage), siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description,
    keywords,
    alternates: canonical ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName,
      title: resolvedTitle,
      description,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} hero image`,
      }],
      ...openGraph,
    },
    twitter: {
      ...siteConfig.twitter,
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
    authors: siteConfig.authors,
    creator: legalName,
    publisher: legalName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  } satisfies Metadata;
}
