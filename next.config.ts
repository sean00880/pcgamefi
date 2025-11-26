import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  // Enable React Compiler (stable in Next 16)
  reactCompiler: true,

  // Turbopack configuration
  turbopack: {
    // Set root to this project directory to avoid workspace detection issues
    root: resolve(__dirname),
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Enable experimental features
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  // TypeScript strict mode
  typescript: {
    // Dangerously allow builds with type errors (set to false for strict)
    ignoreBuildErrors: false,
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
