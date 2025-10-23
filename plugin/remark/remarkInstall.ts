import { map } from 'unist-util-map'
import type { Root } from 'mdast'
import type { Transformer } from 'unified'

/**
 * @deprecated use InstallCommand component instead
 */
export function remarkInstall(): Transformer<Root, Root> {
  return (tree) => {
    // 将 ```package-add pkg-name``` 代码块转换为 shadcn 安装命令
    // remarkNpm 插件会进一步处理，生成多包管理器切换的 Tabs
    map(tree, (node) => {
      if (node.type === 'code' && node.lang === 'package-add') {
        const pkgName = node.value.trim()
        const installCommand = `shadcn@latest add "https://marvin-season.github.io/registry-template/r/${pkgName}.json"`
        const withPMCommand = `pnpm dlx ${installCommand}`

        // 转换为 package-install 格式，供 remarkNpm 插件处理
        Object.assign(node, {
          type: 'code',
          lang: 'bash',
          meta: node.meta || 'title="shadcn"',
          value: withPMCommand,
        })
      }
      return node
    })
  }
}
