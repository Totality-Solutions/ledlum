"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SECTION_GROUPS } from "@/lib/cms/schema";
import type { AdminRole } from "@/lib/adminAuth";

type NavItem = { href: string; label: string; adminOnly?: boolean };

const NAV: { heading: string; items: NavItem[] }[] = [
  { heading: "", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    heading: "Pages",
    items: SECTION_GROUPS.filter((g) => !["layout", "settings", "collections"].includes(g.slug)).map((g) => ({
      href: `/admin/pages/${g.slug}`,
      label: g.label,
    })),
  },
  {
    heading: "Content",
    items: [
      { href: "/admin/blog", label: "Blog posts" },
      { href: "/admin/products", label: "Products" },
      { href: "/admin/pages/collections", label: "Product collections" },
      { href: "/admin/submissions", label: "Submissions" },
    ],
  },
  {
    heading: "Site",
    items: [
      { href: "/admin/pages/layout", label: "Header & footer" },
      { href: "/admin/pages/settings", label: "Settings & SEO" },
      { href: "/admin/users", label: "Users", adminOnly: true },
      { href: "/admin/account", label: "My account" },
    ],
  },
];

export default function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: AdminRole };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const sidebar = (
    <nav className="flex flex-col gap-6 p-4">
      {NAV.map((group) => (
        <div key={group.heading || "root"}>
          {group.heading && (
            <p className="px-3 mb-1 text-[11px] uppercase tracking-wider text-neutral-500">{group.heading}</p>
          )}
          <div className="flex flex-col">
            {group.items
              .filter((item) => !item.adminOnly || user.role === "admin")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm",
                    isActive(item.href) ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between gap-4 px-4 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden px-2 py-1 rounded-md text-neutral-300 hover:bg-neutral-800"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <Link href="/admin" className="font-semibold tracking-wide">
            LEDLUM <span className="text-neutral-500 font-normal">CMS</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white hidden sm:inline">
            View site ↗
          </a>
          <span className="text-neutral-400 hidden sm:inline">
            {user.name} <span className="text-neutral-600">· {user.role}</span>
          </span>
          <button onClick={logout} className="text-neutral-400 hover:text-white">
            Log out
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-60 shrink-0 border-r border-neutral-800 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          {sidebar}
        </aside>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-14 z-30 bg-neutral-950 overflow-y-auto">{sidebar}</div>
        )}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
