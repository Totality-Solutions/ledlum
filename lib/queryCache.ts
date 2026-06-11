const g = globalThis as any;
if (!g.__productCache) {
  g.__productCache = new Map<string, { data: any; expiry: number }>();
}
const cache: Map<string, { data: any; expiry: number }> = g.__productCache;

const DEFAULT_TTL = 5 * 60 * 1000;

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached(key: string, data: any, ttl = DEFAULT_TTL) {
  cache.set(key, { data, expiry: Date.now() + ttl });
}
