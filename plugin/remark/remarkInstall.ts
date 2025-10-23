import { map } from 'unist-util-map'
import type { Root } from 'mdast'
import type { Transformer } from 'unified'

export function remarkInstall(): Transformer<Root, Root> {
  return (tree) => {
    map(tree, (node, index, parent) => {
      if (node.type === 'code' && node.lang === 'package-add') {
        const attrValue = node.value
        const value = `npx shadcn@latest add "https://marvin-season.github.io/registry-template/r/${attrValue}.json"`

  
        Object.assign(node, {
          type: 'code',
          lang: 'ts',
          meta: `title=\"shadcn\"`,
          value,
        })
      }
      return node
    })
  }
}
