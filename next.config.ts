import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Opções de configuração aqui */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
