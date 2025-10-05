import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      "cdn.pixabay.com",
      "pbs.twimg.com",
      "media.licdn.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
