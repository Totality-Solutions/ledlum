import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.109","192.168.1.34","192.168.29.201"],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  images: {
    // No runtime image optimizer (the hosted one was the production bottleneck:
    // cold re-encoding + transformation caps). Instead every R2 image has
    // pre-generated WebP copies at fixed widths (scripts/generate-image-variants.ts)
    // and this loader points srcset at the right one — resized images with
    // zero per-request work. Non-R2 images are passed through untouched.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    // 50 = "slow network" hint from components/common/SmartImage.tsx.
    qualities: [30, 50, 75],
    // Map onto the stored variant widths (384 / 768 / 1280 / 1920).
    deviceSizes: [384, 640, 768, 1080, 1280, 1920],
    imageSizes: [64, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        // Interim r2.dev public dev URL — swap to the custom domain's hostname
        // once one is connected to the bucket (r2.dev has rate limits not meant
        // for production traffic).
        protocol: 'https',
        hostname: 'pub-72e9e5cfa7cc4ff0a9cc7ba22a9d2341.r2.dev',
        pathname: '/ledlum/**',
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;