const isProd = process.env.NODE_ENV === "production";
const repoBase = "/tafseel-website";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages project site: https://<user>.github.io/tafseel-website/
  basePath: isProd ? repoBase : "",
  // Must match basePath so /_next/static CSS+JS resolve under the repo path
  assetPrefix: isProd ? `${repoBase}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBase : "",
  },
};

export default nextConfig;
