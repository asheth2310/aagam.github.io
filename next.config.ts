import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mode: Live Server (Vercel)
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
