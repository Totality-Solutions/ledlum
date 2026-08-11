// Tracks image URLs already warmed into the browser's HTTP cache this session,
// so pagination/search don't redundantly re-trigger the same fetch when the
// user pages back and forth.
const preloaded = new Set<string>();

export function preloadImage(src: string | undefined | null) {
  if (!src || preloaded.has(src) || typeof window === "undefined") return;
  preloaded.add(src);
  const img = new window.Image();
  img.src = src;
}
