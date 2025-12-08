import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true, // reemplaza al viejo experimental.ppr
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
