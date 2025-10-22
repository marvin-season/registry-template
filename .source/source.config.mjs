// plugin/remark/remarkInstall.ts
import { map } from "unist-util-map";
function remarkInstall() {
  return (tree) => {
    map(tree, (node, index, parent) => {
      if (node.type === "code" && node.lang === "package-add") {
        const attrValue = node.value;
        const value = `npx shadcn@latest add "https://marvin-season.github.io/registry-template//r/${attrValue}.json"`;
        parent?.children.splice(index ?? 0, 0, {
          type: "code",
          lang: "bash",
          meta: `title="shadcn"`,
          value
        });
        Object.assign(node, {
          type: "code",
          lang: "ts",
          value
        });
      }
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
      remarkInstall,
      [remarkNpm, { persist: { id: "package-manager" } }]
    ]
  }
});
export {
  source_config_default as default,
  docs,
  registry
};
