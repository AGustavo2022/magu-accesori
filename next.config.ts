import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  experimental: {
    ppr: 'incremental'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // 💡 Este es el dominio que debes permitir
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },
      // Si usas otros dominios de imágenes (ej: Cloudinary, S3, etc.), agrégalos aquí
    ],
  },
};


export default nextConfig;
