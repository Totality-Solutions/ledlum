import { getAdminUser } from "@/lib/adminSession";
import { PageHeader } from "@/components/admin/ui";
import AccountForm from "./AccountForm";

export default async function AccountPage() {
  const user = await getAdminUser();
  if (!user) return null;
  return (
    <div className="p-4 md:p-8 max-w-xl">
      <PageHeader title="My account" description={`${user.email} · ${user.role}`} />
      <AccountForm userId={user.id} initialName={user.name} />
    </div>
  );
}
