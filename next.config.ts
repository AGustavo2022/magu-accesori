import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true // Rendering parcial (Progressive Page Rendering)
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
