export const siteConfig = {
  name: "Rolta Electricals",
  legalName: "Rolta Electricals Private Limited",
  description:
    "Rolta Electricals is an enterprise engineering partner delivering turnkey electrical, automation, and infrastructure projects across industrial and commercial sectors.",
  url: "https://www.roltaelectricals.com",
  locale: "en_US",
  logo: "/logo.svg",
  defaultOgImage: "/og-default.png",
  contact: {
    email: "hello@roltaelectricals.com",
    phone: "+91-98765-43210",
    address: "Plot 42, Industrial Estate, Pune, Maharashtra, India",
  },
  businessHours: {
    weekday: "09:00-18:00",
    weekend: "10:00-14:00",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/rolta-electricals",
    twitter: "https://twitter.com/roltaelectricals",
    youtube: "https://youtube.com/@roltaelectricals",
  },
  keywords: [
    "electrical engineering",
    "industrial automation",
    "project management",
    "solar energy integration",
    "panel manufacturing",
    "smart infrastructure",
  ],
  authors: [{ name: "Rolta Electricals Marketing" }],
  twitter: {
    card: "summary_large_image" as const,
    creator: "@roltaelectricals",
    site: "@roltaelectricals",
  },
};

export type SiteConfig = typeof siteConfig;
