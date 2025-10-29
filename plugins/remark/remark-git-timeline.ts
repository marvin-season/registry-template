import simpleGit from 'simple-git'
import type { Root } from 'mdast'
import type { Transformer } from 'unified'

interface GitCommitLog {
  hash: string
  date: string
  author_name: string
  message: string
}

// 获取 Git 提交历史
async function getGitCommitLogs(filePath: string): Promise<GitCommitLog[]> {
  try {
    const git = simpleGit()
    const gitCommitLogs = await git.log({
      file: filePath,
    })

    return gitCommitLogs.all.map((commit) => ({
      hash: commit.hash,
      date: new Date(commit.date).toLocaleString(),
      author_name: commit.author_name,
      message: commit.message,
    }))
  } catch (error) {
    console.warn('Failed to get git commit logs:', error)
    return []
  }
}

export function remarkGitTimeline(): Transformer<Root, Root> {
  return async (_tree, file) => {
    const resourcePath = (file as any)?.data?._compiler?.resourcePath

    if (!resourcePath) return

    const gitCommitLogs = await getGitCommitLogs(resourcePath)

    Object.assign(file.data, {
      ...file.data,
      frontmatter: {
        ...(file.data.frontmatter || {}),
        gitCommitLogs,
      },
    })
  }
}
