// source.config.ts
import { defineDocs, defineConfig, metaSchema, frontmatterSchema } from "fumadocs-mdx/config";
import z from "zod";
var docsSchema = frontmatterSchema.extend({
  author: z.string(),
  figma: z.url().optional(),
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
  dir: "content/docs"
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
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs,
  registry
};
