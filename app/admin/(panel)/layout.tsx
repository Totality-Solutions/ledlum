import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminUser } from "@/lib/adminSession";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "LEDLUM CMS",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // proxy.ts already rejects missing/forged cookies; this also catches users
  // who were deactivated or deleted after logging in.
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell user={{ name: user.name, email: user.email, role: user.role }}>{children}</AdminShell>
  );
}
