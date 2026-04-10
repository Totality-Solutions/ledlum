export type NavigationItem = {
  title: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { title: "Outdoor", href: "/product/outdoor" },
  { title: "Indoor", href: "/product/indoor" },
  { title: "Artizan", href: "/product/artizan" },
  { title: "Astara", href: "/product/astara" },
  { title: "Volaris", href: "/product/volaris" },
  { title: "Klewe", href: "/product/klewe" },
];

export const sideNavigation: NavigationItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
];