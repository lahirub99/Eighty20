import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  output: 'standalone',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
