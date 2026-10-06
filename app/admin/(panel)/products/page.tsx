import { getAdminUser } from "@/lib/adminSession";
import ProductsManager from "./ProductsManager";

export default async function AdminProductsPage() {
  const user = await getAdminUser();
  return <ProductsManager canDelete={user?.role === "admin"} />;
}
