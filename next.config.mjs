import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: { unoptimized: true },
    turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
};

export default nextConfig;
