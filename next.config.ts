import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
    // NEXT_PUBLIC_API_URL dự kiến có dạng: https://host/api
    const destinationOrigin = apiUrl.endsWith("/api")
      ? apiUrl.slice(0, -"/api".length)
      : apiUrl;

    if (!destinationOrigin) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${destinationOrigin}/api/:path*`,
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
