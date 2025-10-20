import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // ./out folder will be deployed to GitHub Pages
  images: {
    unoptimized: true,
  },
  basePath: "/registry-template",
  assetPrefix: "/registry-template/",
};

export default nextConfig;
