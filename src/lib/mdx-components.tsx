import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import {
  File,
  Folder,
  Files,
  InstallCommand,
  PreviewCode,
} from "@/components/fumadocs-mdx-component";
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
