import { type InferPageType, loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';
import { registry } from '@/.source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource([...registry.docs], [...registry.meta]),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}
