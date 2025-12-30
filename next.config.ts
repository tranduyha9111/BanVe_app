import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
