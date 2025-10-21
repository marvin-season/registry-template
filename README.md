# Getting Started

This is a template for creating a custom registry using Next.js. Powered by [Fumadocs](https://fumadocs.dev) & [Shadcn](https://ui.shadcn.com).

## Create

- create a `component` & `lib` & `hook` in registry folder
- add it in `registry.json`
- build the registry

```sh
pnpm run registry:build
```

- serve the registry

```sh
pnpm run dev
```

- open the browser and navigate to `http://localhost:3000/r/utils.json`

you should see the utils json file

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "utils",
  "type": "registry:lib",
  "title": "Utils",
  "description": "A library to utils functions",
  "files": [
    {
      "path": "registry/utils/index.ts",
      "content": "export async function sleep(ms: number) {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}",
      "type": "registry:lib"
    }
  ]
}
```

if you want to share it you should deploy it to a public network which can be accessed by anyone.

## How to use

```sh
pnpm dlx shadcn@latest add https://marvin-season.github.io/registry-template/r/example-form.json
```

or config registry in components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  // ...
  "registries": {
    "@registry": "https://marvin-season.github.io/registry-template/r/{name}.json"
  }
}
```

```sh
pnpm dlx shadcn@latest add @template/example-form
```

## Reference

[Shadcn NameSpace](https://ui.shadcn.com/docs/registry/namespace#configuration)

## About Fumadocs

[Fumadocs](https://fumadocs.dev) is a documentation tool for React. It is a modern, lightweight, and easy-to-use documentation tool that allows you to create beautiful documentation for your React projects.
