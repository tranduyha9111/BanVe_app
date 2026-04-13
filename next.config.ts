import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://drawingmarketplace.onrender.com/api/:path*",
      },
    ];
  },
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "", // không cần nếu https
        pathname: "/**", // cho phép tất cả đường dẫn
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "", // không cần nếu https
        pathname: "/**", // cho phép tất cả đường dẫn
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pic.bittopup.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-media.sforum.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drawingmarketplace.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
