import { defineDocs, defineConfig, metaSchema, frontmatterSchema,  } from 'fumadocs-mdx/config';
import z from 'zod';

const docsSchema = frontmatterSchema.extend({
  author: z.string(),
  figma: z.url().optional(),
  timeline: z.boolean().optional().default(true),
  gitCommitLogs: z
    .array(
      z.object({
        hash: z.number(),
        date: z.string(),
        author_name: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
})
export const docs = defineDocs({
  dir: 'content/docs',
});

export const registry = defineDocs({
  dir: 'registry',
  docs: {
    schema: docsSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig();