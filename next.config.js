/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.ibb.co",
        pathname: "/**",
      },
    ],
    // Increase cache time for better performance
    minimumCacheTTL: 60,
    // Disable image optimization for external images
    unoptimized: true,
  },
  // Increase the timeout for API routes
  experimental: {
    // Next.js 15 no longer supports serverExternalPackages
  },
};

module.exports = nextConfig;
