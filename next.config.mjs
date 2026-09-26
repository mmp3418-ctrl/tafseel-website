/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === "production" ? "/tafseel-website" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // Exposed to client so <img>/<video> src paths include the GitHub Pages subpath
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
