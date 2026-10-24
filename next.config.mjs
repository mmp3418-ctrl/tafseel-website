/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "wqmbrxyiivrmnekwaenl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
