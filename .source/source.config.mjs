// source.config.ts
import { defineDocs, defineConfig, metaSchema, frontmatterSchema } from "fumadocs-mdx/config";
import z2 from "zod";

// plugin/remark/remark-git-timeline.ts
import simpleGit from "simple-git";
async function getGitCommitLogs(filePath) {
  try {
    const git = simpleGit();
    const gitCommitLogs = await git.log({
      file: filePath
    });
    return gitCommitLogs.all.map((commit) => ({
      hash: commit.hash,
      date: new Date(commit.date).toLocaleString(),
      author_name: commit.author_name,
      message: commit.message
    }));
  } catch (error) {
    console.warn("Failed to get git commit logs:", error);
    return [];
  }
}
function remarkGitTimeline() {
  return async (_tree, file) => {
    const resourcePath = file?.data?._compiler?.resourcePath;
    if (!resourcePath) return;
    const gitCommitLogs = await getGitCommitLogs(resourcePath);
    Object.assign(file.data, {
      ...file.data,
      frontmatter: {
        ...file.data.frontmatter || {},
        gitCommitLogs
      }
    });
  };
}

// types/index.ts
import z from "zod";
var gitCommitLogSchema = z.array(
  z.object({
    hash: z.number(),
    date: z.string(),
    author_name: z.string(),
    message: z.string()
  })
).optional();

// source.config.ts
var docsSchema = frontmatterSchema.extend({
  author: z2.string(),
  timeline: z2.boolean().optional().default(true),
  lastModified: z2.string().optional(),
  gitCommitLogs: gitCommitLogSchema
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
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [
      remarkGitTimeline
    ]
  }
});
export {
  source_config_default as default,
  docs,
  registry
};
