// @ts-nocheck -- skip type checking
import * as registry_0 from "../registry/hooks/index.mdx?collection=registry&hash=1761051215483"
import * as docs_0 from "../content/docs/index.mdx?collection=docs&hash=1761051215483"
import { _runtime } from "fumadocs-mdx/runtime/next"
import * as _source from "../source.config"
export const docs = _runtime.docs<typeof _source.docs>([{ info: {"path":"index.mdx","fullPath":"content/docs/index.mdx"}, data: docs_0 }], [])
export const registry = _runtime.docs<typeof _source.registry>([{ info: {"path":"hooks/index.mdx","fullPath":"registry/hooks/index.mdx"}, data: registry_0 }], [])