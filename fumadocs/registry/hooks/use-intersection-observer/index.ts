"use client";

import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = <T extends Element = HTMLElement>(
  options: IntersectionObserverInit = {},
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 检查浏览器支持
    if (!window.IntersectionObserver) {
      console.warn("IntersectionObserver is not supported in this browser");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options]);

  return { ref, isIntersecting, entry };
};
