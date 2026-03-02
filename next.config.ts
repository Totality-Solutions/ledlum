// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//   // uu

//   images: {
//     // remotePatterns: [
//     //   {
//     //     protocol: 'https',
//     //     hostname: 'images.unsplash.com',
//     //     pathname: '/**',
//     //   },
//     // ],
    
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },

//   // uu

// };

// export default nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
  // Use "as any" to satisfy the TS compiler for experimental properties
  experimental: {
    allowedDevOrigins: ["192.168.1.16"],
  } as any,
};

export default nextConfig;