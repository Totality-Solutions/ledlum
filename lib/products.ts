// Client-safe: fetches the catalog through /api/products (server-side cached,
// shared across all visitors) instead of querying Supabase directly from the
// browser — every visitor querying Supabase independently is what took the
// database down under load. See lib/productsServer.ts for the actual query.
//
// Each function below passes its filter as a query param rather than fetching
// everything and filtering in the browser — /api/products applies it against
// the already-cached full catalog server-side, so a scoped request costs zero
// extra Supabase load but ships a much smaller payload than the full ~1.7MB
// catalog on every page view.
const inFlight = new Map<string, Promise<any[]>>();

async function fetchProducts(params: Record<string, string> = {}): Promise<any[]> {
  const qs = new URLSearchParams(params).toString();
  const key = qs;

  const existing = inFlight.get(key);
  if (existing) return existing;

  const promise = fetch(qs ? `/api/products?${qs}` : "/api/products")
    .then(async (res) => {
      if (!res.ok) throw new Error(`/api/products returned ${res.status}`);
      const { products } = await res.json();
      return products || [];
    })
    .catch((err) => {
      console.error("fetchProducts error:", err);
      return [];
    })
    .finally(() => {
      inFlight.delete(key);
    });

  inFlight.set(key, promise);
  return promise;
}

export async function getAllProducts(): Promise<any[]> {
  return fetchProducts();
}

export async function getProduct(model?: string): Promise<any> {
  if (!model) return null;
  const matches = await fetchProducts({ model });
  return matches[0] || null;
}

export async function getFamilyProducts(family?: string): Promise<any[]> {
  if (!family) return [];
  const matches = await fetchProducts({ family });
  return matches.sort((a: any, b: any) => (a.model || "").localeCompare(b.model || ""));
}

export async function getCategoryProducts(category?: string): Promise<any[]> {
  if (!category) return [];
  return fetchProducts({ category });
}

export async function getGroupProducts(groupName?: string): Promise<any[]> {
  if (!groupName) return [];
  return fetchProducts({ groupName });
}

export async function getAllProductsForCatalog(collection?: string): Promise<any[]> {
  return fetchProducts(collection ? { collection } : {});
}
