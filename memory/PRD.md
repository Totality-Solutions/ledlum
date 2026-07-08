# LEDLUM Site — Performance Fix

## Original problem
Site `https://ledlum.vercel.app/` (Next.js 16 on Vercel) works fine locally but on deployed prod:
- Images take a long time to load
- Painting during scroll feels glitchy
- Mobile browsers crash
- Assets already moved to S3 + CloudFront (`d1qlyda1dsr5ui.cloudfront.net`) — didn't help

## Root cause
1. **Vercel Next.js Image Optimization was the bottleneck.** Every image was proxied through
   `/_next/image?url=<cloudfront>&w=1200&q=75`. Vercel re-downloaded each image from
   CloudFront, re-encoded it, then served it. Cold-cache latency 500ms–2s per image and,
   on Hobby plan, throttled after 5000 transformations/month. Locally the dev optimizer is
   fast → looked fine.
2. **Two full-screen autoplaying videos on load** (`Preloader.mp4` + hero `home.mp4`).
   Decoding both simultaneously with dozens of images = mobile OOM crash.

## Fixes applied (2026-01)
- `next.config.ts` → `images.unoptimized: true`. Images now load directly from CloudFront
  (already `.webp/.jpeg`, already on a fast CDN). Removes the double optimization pass.
- `app/PreLoader.tsx` → skip fullscreen preloader video on mobile
  (`max-width:768px` or `navigator.deviceMemory <= 4`); user-visible content shows immediately.
- `components/sections/home/Hero.tsx` → replace hero background `<video>` with a static
  poster `<Image>` on mobile; video still runs on desktop.

## Deployment note
User must redeploy to Vercel for these changes to take effect (`git push` → Vercel
auto-deploys, or trigger a manual redeploy). After deploy, image URLs will resolve to
`https://d1qlyda1dsr5ui.cloudfront.net/ledlum/...` directly instead of `/_next/image?...`.

## Not changed (kept behavior identical)
- No design/UX changes
- Product data, routes, sections untouched
- No dependency changes
