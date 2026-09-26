/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/tafseel-website" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
