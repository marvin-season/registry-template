import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { InstallCommand } from "@/components/InstallCommand";
import { PreviewCode } from "@/components/PreviewCode";
import { File, Folder, Files } from "@/components/files";
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Tab,
    Tabs,
    InstallCommand,
    PreviewCode,
    Files,
    File,
    Folder,
    ...defaultMdxComponents,
    ...components,
  };
}
