// ledlum/lib/sanity.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '10pzjknr',
  dataset: 'production',
  apiVersion: '2026-05-26', // Current date
  useCdn: false, // Set to true for production if you want faster loading
});