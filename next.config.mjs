/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/tafseel-website",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/tafseel-website",
  },
};

export default nextConfig;
