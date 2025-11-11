'use client';

import { useIntersectionObserver } from './index';

export const Demo = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  return (
    <div className="h-[100px] overflow-y-scroll border">
      <span className="sticky top-0 text-xs">{isIntersecting ? 'Intersecting' : 'Not Intersecting'}</span>
      <div ref={ref} className="size-[20px] bg-red-500 my-[100px]"></div>
    </div>
  );
};
