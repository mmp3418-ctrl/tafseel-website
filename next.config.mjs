const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/tafseel-website' : '',
  assetPrefix: isProd ? '/tafseel-website/' : '',
  trailingSlash: true,
};

export default nextConfig;