import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const options: NextConfig = isProduction ? {
  output: "export", // ./out folder will be deployed to GitHub Pages
  images: {
    unoptimized: true,
  },
  basePath: "/registry-template",
  assetPrefix: "/registry-template/",
} : {};

const nextConfig: NextConfig = {
  ...options
};

export default nextConfig;
