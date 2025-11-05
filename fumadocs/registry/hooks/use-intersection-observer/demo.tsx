'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from './index';

export const Demo = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

	return (
		<div className="h-[100px] overflow-y-scroll border" ref={containerRef}>
			<span className="sticky top-0 text-xs">{isIntersecting ? 'Intersecting' : 'Not Intersecting'}</span>
			<div ref={ref} className="size-[20px] bg-red-500 my-[100px]"></div>
		</div>
	);
};
