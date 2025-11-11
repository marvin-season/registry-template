import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useIntersectionObserver } from '~/registry/hooks/use-intersection-observer';

interface LazyBlockProps {
  children: React.ReactNode;
  className?: string;
  options?: IntersectionObserverInit;
  seo?: ReactNode;
  minHeight?: string; // less than the real height of the block
}
export default function LazyBlock(props: LazyBlockProps) {
  const {
    children,
    className,
    options = { root: null, rootMargin: `-20px`, threshold: 0 },
    seo,
    minHeight = '1px',
  } = props;
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>(options);

  return (
    <div ref={ref} className={cn('relative', className)} style={{ minHeight }}>
      {isIntersecting && children}
      {!isIntersecting && seo && <div className="opacity-0 absolute w-full h-full pointer-events-none">{seo}</div>}
    </div>
  );
}
