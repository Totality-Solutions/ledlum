import { createImageUrlBuilder } from '@sanity/image-url'; // Use named import
import { client } from './sanity';

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}