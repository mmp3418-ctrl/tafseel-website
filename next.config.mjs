/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Required for GitHub Pages static export — Image Optimization API is unavailable
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
