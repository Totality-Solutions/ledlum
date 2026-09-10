// Client-safe: fetches the catalog through /api/products (server-side cached,
// shared across all visitors) instead of querying Supabase directly from the
// browser — every visitor querying Supabase independently is what took the
// database down under load. See lib/productsServer.ts for the actual query.
let inFlight: Promise<any[]> | null = null;

export async function getAllProducts(): Promise<any[]> {
  if (inFlight) return inFlight;

  inFlight = fetch("/api/products")
    .then(async (res) => {
      if (!res.ok) throw new Error(`/api/products returned ${res.status}`);
      const { products } = await res.json();
      return products || [];
    })
    .catch((err) => {
      console.error("getAllProducts error:", err);
      return [];
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export async function getProduct(model?: string): Promise<any> {
  if (!model) return null;

  const all = await getAllProducts();
  const normalized = model.toUpperCase().replace(/\s+/g, "+");
  return all.find((p: any) => (p.model || "").toUpperCase() === normalized) || null;
}

export async function getFamilyProducts(family?: string): Promise<any[]> {
  if (!family) return [];

  const all = await getAllProducts();
  return all
    .filter((p: any) => p.family === family)
    .sort((a: any, b: any) => (a.model || "").localeCompare(b.model || ""));
}

export async function getCategoryProducts(category?: string): Promise<any[]> {
  if (!category) return [];

  const all = await getAllProducts();
  return all.filter((p: any) => p.category === category);
}

export async function getAllProductsForCatalog(): Promise<any[]> {
  return getAllProducts();
}
