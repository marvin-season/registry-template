import { readFileSync } from 'node:fs'
import path from 'node:path'
import { globSync } from 'glob'
import { map } from 'unist-util-map'
import type { Root } from 'mdast'
import type { Transformer } from 'unified'

// eslint-disable-next-line n/prefer-global/process
const registryPath = path.join(process.cwd(), 'src/registry')

export function registrySourceCodePlugin(): Transformer<Root, Root> {
  return (tree) => {
  return tree // todo: implement this plugin
    map(tree, (node) => {
      if (
        node.type !== 'mdxJsxFlowElement' ||
        node.name !== 'RegistrySourceCode'
      )
        return node

      const attrValue = node.attributes[0].value
      const files = globSync(`${registryPath}/**/${attrValue}/index.{ts,tsx}`)
      const file = files[0]
      if (!file) return node

      const ext = file.split('.').pop()
      const content = readFileSync(file, 'utf-8')

      Object.assign(node, {
        type: 'code',
        lang: ext ?? 'ts',
        meta: `title=\"${attrValue}.${ext}\"`,
        value: content,
      })
      return node
    })
  }
}
