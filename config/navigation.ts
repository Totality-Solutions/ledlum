export type NavigationItem = {
  title: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { title: "LED Lum Outdoor", href: "/products/outdoor" },
  { title: "LED Lum Indoor", href: "/products/indoor" },
  { title: "Artizan", href: "/products/artizan" },
  { title: "Astara", href: "/products/astara" },
  { title: "Volaris", href: "/products/volaris" },
  { title: "Klewe", href: "/products/klewe" },
];

export const sideNavigation: NavigationItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
];