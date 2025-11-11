'use client';

import dynamic from 'next/dynamic';
import LazyBlock from '~/registry/blocks/lazy-block/lazy-block';
import { sleep } from '~/registry/utils/common';

const Heaven = dynamic(
  async () => {
    await sleep(3000);
    return import('./heaven');
  },
  {
    ssr: false,
    loading: () => 'Heaven Loading...',
  },
);

const Bulky = dynamic(
  async () => {
    await sleep(3000);
    return import('./bulky');
  },
  {
    ssr: false,
    loading: () => 'Bulky Loading...',
  },
);

export default function Demo() {
  return (
    <div className="max-h-[600px] border overflow-y-scroll">
      <div className="h-[600px]">
        <h1>Index Page</h1>
      </div>
      <LazyBlock minHeight="200px" seo={<h2>Heaven SEO</h2>}>
        <Heaven />
      </LazyBlock>
      <LazyBlock minHeight="200px" seo={<h2>Bulky SEO</h2>}>
        <Bulky />
      </LazyBlock>
    </div>
  );
}
