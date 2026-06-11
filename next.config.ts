import { createRequire } from "node:module";
import type { NextConfig } from "next";
import type { TurbopackRuleConfigCollection } from "next/dist/server/config-shared";
import { createMDX } from 'fumadocs-mdx/next';

const require = createRequire(import.meta.url);
const locatorWebpackLoader = require.resolve("@locator/webpack-loader");

const locatorLoaderOptions = { env: "development" as const };

const locatorRules: Record<string, TurbopackRuleConfigCollection> = {
  "**/*.{tsx,jsx}": {
    loaders: [
      {
        loader: locatorWebpackLoader,
        options: locatorLoaderOptions,
      },
    ],
  },
};

// Use correct check for static build
const isStatic = process.env.EXPORT_STATIC === "true";

console.debug('isStatic', process.env.EXPORT_STATIC);

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
  turbopack: {
    rules: locatorRules,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: locatorWebpackLoader,
            options: locatorLoaderOptions,
          },
        ],
      });
    }
    return config;
  },
};

const withMDX = createMDX({
});
export default withMDX(options);
