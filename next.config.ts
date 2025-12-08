import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reemplazo oficial del antiguo experimental.ppr
  cacheComponents: true,

  // Habilita la optimización automática de imágenes remotas en Next 16
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // ← CORRECCIÓN IMPORTANTE
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
