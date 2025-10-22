import { map } from 'unist-util-map'
import type { Root } from 'mdast'
import type { Transformer } from 'unified'

export function remarkInstall(): Transformer<Root, Root> {
  return (tree) => {
    map(tree, (node, index, parent) => {
      if (node.type === 'code' && node.lang === 'package-add') {
        const attrValue = node.value
        const value = `npx shadcn@latest add "https://marvin-season.github.io/registry-template//r/${attrValue}.json"`
        parent?.children.splice(index ?? 0, 0, {
          type: 'code',
          lang: 'bash',
          meta: `title=\"shadcn\"`,
          value,
        })
  
        Object.assign(node, {
          type: 'code',
          lang: 'ts',
          value,
        })
      }
      return node
    })
  }
}
