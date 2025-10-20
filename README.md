# Getting Started

This is a template for creating a custom registry using Next.js.

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