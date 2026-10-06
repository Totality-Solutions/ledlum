import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminUser } from "@/lib/adminSession";
import { SECTION_GROUPS } from "@/lib/cms/schema";
import { Card, PageHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

async function count(table: string, filter?: (q: any) => any): Promise<number | null> {
  let query = supabaseAdmin.from(table).select("*", { count: "exact", head: true });
  if (filter) query = filter(query);
  const { count: n, error, status } = await query;
  // Missing table → no error but a null count.
  return error || status >= 400 || n === null ? null : n;
}

export default async function AdminDashboard() {
  const user = await getAdminUser();
  const [published, drafts, newSubmissions, products, liveProducts] = await Promise.all([
    count("cms_posts", (q) => q.eq("status", "published")),
    count("cms_posts", (q) => q.eq("status", "draft")),
    count("form_submissions", (q) => q.eq("status", "new")),
    count("ledlum_products"),
    count("ledlum_products", (q) => q.eq("website", "W")),
  ]);

  const stats = [
    { label: "New submissions", value: newSubmissions, href: "/admin/submissions" },
    { label: "Published posts", value: published, href: "/admin/blog" },
    { label: "Draft posts", value: drafts, href: "/admin/blog" },
    { label: "Products on website", value: liveProducts !== null && products !== null ? `${liveProducts} / ${products}` : null, href: "/admin/products" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <PageHeader title={`Welcome, ${user?.name ?? ""}`} description="Manage every page, post and product on the LEDLUM website." />

      {published === null && (
        <p className="mb-6 text-sm rounded-md px-3 py-2 border text-amber-300 border-amber-900 bg-amber-950/40">
          The CMS tables were not found. Run <code>supabase/migrations/006_create_cms_tables.sql</code> in the Supabase SQL editor.
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="p-4 hover:border-neutral-600 transition-colors">
              <p className="text-2xl font-semibold">{s.value ?? "—"}</p>
              <p className="text-xs text-neutral-400 mt-1">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">Edit the website</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SECTION_GROUPS.map((g) => (
          <Link key={g.slug} href={`/admin/pages/${g.slug}`}>
            <Card className="p-4 h-full hover:border-neutral-600 transition-colors">
              <p className="font-medium">{g.label}</p>
              <p className="text-xs text-neutral-500 mt-1">{g.sections.map((s) => s.label).join(" · ")}</p>
            </Card>
          </Link>
        ))}
        <Link href="/admin/blog">
          <Card className="p-4 h-full hover:border-neutral-600 transition-colors">
            <p className="font-medium">Blog posts</p>
            <p className="text-xs text-neutral-500 mt-1">Write, edit, publish or unpublish articles</p>
          </Card>
        </Link>
        <Link href="/admin/products">
          <Card className="p-4 h-full hover:border-neutral-600 transition-colors">
            <p className="font-medium">Products</p>
            <p className="text-xs text-neutral-500 mt-1">Specs, images and website visibility</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
