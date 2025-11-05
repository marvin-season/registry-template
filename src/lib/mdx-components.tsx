import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { File, Files, Folder, InstallCommand, PreviewCode } from '@/components/fumadocs-mdx-component';
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
