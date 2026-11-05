import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Testimonial photos are https URLs entered in the Owner Console.
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
