import { createImageUrlBuilder } from '@sanity/image-url';
import { getClient } from './sanity';

export function urlFor(source: any) {
  const client = getClient();
  return createImageUrlBuilder(client).image(source);
}