import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

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
  reactStrictMode: true,
  ...options,
};


const withMDX = createMDX({

});
export default withMDX(nextConfig);
