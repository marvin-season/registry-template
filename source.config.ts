
import { defineDocs, defineConfig, metaSchema, frontmatterSchema,  } from 'fumadocs-mdx/config';
import z from 'zod';
import { remarkGitTimeline } from './plugin/remark/remark-git-timeline';
import { gitCommitLogSchema } from './types';

const docsSchema = frontmatterSchema.extend({
  author: z.string(),
  timeline: z.boolean().optional().default(true),
  lastModified: z.string().optional(),
  gitCommitLogs: gitCommitLogSchema,
})
export const docs = defineDocs({
  docs: {
    schema: docsSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export const registry = defineDocs({
  dir: 'registry',
  docs: {
    schema: docsSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    remarkPlugins: [
      remarkGitTimeline,
    ],
  },
});