import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.109","192.168.1.34","192.168.29.201"],
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  images: {
    // Assets are already served from CloudFront in optimized .webp/.jpeg format,
    // so we bypass Vercel's Image Optimization API (which was the main bottleneck
    // in production: cold re-encoding + Hobby-tier transformation cap made images
    // slow to appear and painting glitchy on scroll). Serving directly from
    // CloudFront is faster and free of the transformation quota.
    unoptimized: true,
    qualities: [75],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
        protocol: 'https',
        hostname: 'd1qlyda1dsr5ui.cloudfront.net',
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