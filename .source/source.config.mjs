// plugin/remark/registrySourceCodePlugin.ts
import { readFileSync } from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import { map } from "unist-util-map";
var registryPath = path.join(process.cwd(), "src/registry");
function registrySourceCodePlugin() {
  return (tree) => {
    map(tree, (node) => {
      if (node.type !== "mdxJsxFlowElement" || node.name !== "RegistrySourceCode")
        return node;
      const attrValue = node.attributes[0].value;
      const files = globSync(`${registryPath}/**/${attrValue}/index.{ts,tsx}`);
      const file = files[0];
      if (!file) return node;
      const ext = file.split(".").pop();
      const content = readFileSync(file, "utf-8");
      Object.assign(node, {
        type: "code",
        lang: ext ?? "ts",
        meta: `title="${attrValue}.${ext}"`,
        value: content
      });
      return node;
    });
  };
}

// source.config.ts
import { remarkNpm } from "fumadocs-core/mdx-plugins";
import { defineDocs, defineConfig, metaSchema, frontmatterSchema } from "fumadocs-mdx/config";
import z from "zod";
var docsSchema = frontmatterSchema.extend({
  author: z.string(),
  timeline: z.boolean().optional().default(true),
  gitCommitLogs: z.array(
    z.object({
      hash: z.number(),
      date: z.string(),
      author_name: z.string(),
      message: z.string()
    })
  ).optional()
});
var docs = defineDocs({
  docs: {
    schema: docsSchema
  },
  meta: {
    schema: metaSchema
  }
});
var registry = defineDocs({
  dir: "registry",
  docs: {
    schema: docsSchema
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [
      registrySourceCodePlugin,
      remarkNpm
    ]
  }
});
export {
  source_config_default as default,
  docs,
  registry
};
