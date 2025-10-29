
import { defineDocs, defineConfig, metaSchema, frontmatterSchema,  } from 'fumadocs-mdx/config';
import z from 'zod';
import { remarkGitTimeline } from './plugins/remark/remark-git-timeline';
import { remarkMdxFiles } from 'fumadocs-core/mdx-plugins';
import { gitCommitLogSchema } from './types';

const docsSchema = frontmatterSchema.extend({
  author: z.string().optional().default('Marvin'),
  timeline: z.boolean().optional().default(true),
  lastModified: z.string().optional(),
  gitCommitLogs: gitCommitLogSchema,
})

export const registry = defineDocs({
  dir: 'fumadocs/registry',
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
      [remarkMdxFiles, {}]
    ],
  },
});