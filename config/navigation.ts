export type NavigationItem = {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
};

export const primaryNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    description: "End-to-end electrical, automation, and maintenance offerings.",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Flagship engagements across manufacturing, commercial, and infrastructure.",
  },
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "Switchgear Systems", href: "/products/switchgear-systems" },
      { title: "Energy Monitoring", href: "/products/energy-monitoring" },
      { title: "Automation Panels", href: "/products/automation-panels" },
    ],
  },
  {
    title: "Catalog",
    href: "/catalog",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const footerNavigation: NavigationItem[] = [
  {
    title: "Solutions",
    href: "/services",
    children: [
      { title: "Design & Consulting", href: "/services#design" },
      { title: "Project Execution", href: "/services#execution" },
      { title: "Operations & Maintenance", href: "/services#maintenance" },
    ],
  },
  {
    title: "Industries",
    href: "/projects",
    children: [
      { title: "Manufacturing", href: "/projects#manufacturing" },
      { title: "Commercial", href: "/projects#commercial" },
      { title: "Infrastructure", href: "/projects#infrastructure" },
    ],
  },
  {
    title: "Resources",
    href: "/catalog",
    children: [
      { title: "Product Catalog", href: "/catalog" },
      { title: "Sustainability", href: "/about#sustainability" },
      { title: "Media", href: "/blog" },
    ],
  },
  {
    title: "Company",
    href: "/about",
    children: [
      { title: "Leadership", href: "/about#leadership" },
      { title: "Careers", href: "/about#careers" },
      { title: "Contact", href: "/contact" },
    ],
  },
];
