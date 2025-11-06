import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/source';

export default function BlogLayout({ children }: LayoutProps<'/blog'>) {
  return (
    <DocsLayout tree={blogSource.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
