import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

// Use correct check for static build
const isStatic = process.env.EXPORT_STATIC === "true";

const staticOptions: NextConfig = {
  output: "export", // ./out folder will be deployed to GitHub Pages
  images: {
    unoptimized: true,
  },
  basePath: "/registry-template",
  assetPrefix: "/registry-template/",
};

const options: NextConfig = isStatic ? staticOptions : {
  output: "standalone",
};

const withMDX = createMDX({
});
export default withMDX(options);
