// ledlum/lib/sanity.ts
import { createClient } from '@sanity/client';

const projectId = '10pzjknr';
const dataset = 'production';

const baseUrl = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}`;

export async function sanityFetch(query: string, params?: Record<string, unknown>) {
  const url = new URL(baseUrl);
  url.searchParams.set('query', query);
  if (params) {
    url.searchParams.set('$params', JSON.stringify(params));
  }
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.result;
}

let _client: ReturnType<typeof createClient>;

export function getClient() {
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion: '2021-10-21', useCdn: true });
  }
  return _client;
}