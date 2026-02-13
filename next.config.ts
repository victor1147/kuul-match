import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Allow the placeholder service
            },
        ],
    },
};

export default nextConfig;
