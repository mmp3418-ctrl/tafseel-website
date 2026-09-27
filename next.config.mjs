/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/tafseel-website" : "";

const nextConfig = {
  output: "export",
  // GitHub Pages lives under /tafseel-website; local `next dev` serves at /
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
