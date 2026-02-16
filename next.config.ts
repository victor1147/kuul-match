import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.kuulmatch.com',
                port: '',
                pathname: '/public/uploads/**', // precise path matching (safer)
            },
            {
                protocol: 'https',
                hostname: 'api.kuulmatch.com',
                port: '', // Leave empty for standard https
                pathname: '/uploads/**', // Allow images from the uploads folder
            },
            {
                protocol: 'https',
                hostname: 'placehold.co', // Allow the placeholder service
            },
        ],
    },
    
};

export default nextConfig;
