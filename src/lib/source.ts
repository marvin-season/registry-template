import { docs, registry } from '@/.source';
import { InferPageType, loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource([...docs.docs, ...registry.docs], [...docs.meta, ...registry.meta]),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}