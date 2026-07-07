export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export const cdnImg = (path: string) => `${CDN_URL}${path.startsWith('/') ? '' : '/'}${path}`;
