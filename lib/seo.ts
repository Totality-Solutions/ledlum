import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export type BuildMetadataOptions = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  openGraph?: Metadata["openGraph"];
};

export function absoluteUrl(path: string) {
  if (!path) {
    return siteConfig.url;
  }

  try {
    return new URL(path).toString();
  } catch (error) {
    return new URL(path.replace(/^\//, ""), siteConfig.url).toString();
  }
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    canonical,
    ogImage,
    type = "website",
    openGraph,
  } = options;

  const isDefaultTitle = title === siteConfig.name;
  const resolvedTitle = isDefaultTitle ? title : `${title} | ${siteConfig.name}`;
  const canonicalUrl = canonical ? absoluteUrl(canonical) : siteConfig.url;
  const imageUrl = absoluteUrl(ogImage ?? siteConfig.defaultOgImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description,
    keywords,
    alternates: canonical ? { canonical: canonicalUrl } : undefined,
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} hero image`,
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
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
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
