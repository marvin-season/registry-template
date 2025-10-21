// @ts-nocheck -- skip type checking
import * as registry_1 from "../registry/new-york/blocks/hello-world/index.mdx?collection=registry&hash=1761053488243"
import * as registry_0 from "../registry/hooks/use-mobile/index.mdx?collection=registry&hash=1761053488243"
import * as docs_0 from "../content/docs/index.mdx?collection=docs&hash=1761053488243"
import { _runtime } from "fumadocs-mdx/runtime/next"
import * as _source from "../source.config"
export const docs = _runtime.docs<typeof _source.docs>([{ info: {"path":"index.mdx","fullPath":"content/docs/index.mdx"}, data: docs_0 }], [])
export const registry = _runtime.docs<typeof _source.registry>([{ info: {"path":"hooks/use-mobile/index.mdx","fullPath":"registry/hooks/use-mobile/index.mdx"}, data: registry_0 }, { info: {"path":"new-york/blocks/hello-world/index.mdx","fullPath":"registry/new-york/blocks/hello-world/index.mdx"}, data: registry_1 }], [])