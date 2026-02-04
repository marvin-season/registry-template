'use client'

import { useRef, useSyncExternalStore } from 'react';

const useCD = (interval?: number, onCD?: (cd: number) => void) => {
  const timestamp = useRef<number>(Date.now());
  return useSyncExternalStore(
    (callback) => {
      const intervalId = setInterval(() => {
        timestamp.current = Date.now();
        onCD?.(timestamp.current);
        callback();
      }, interval || 1000);
      return () => clearInterval(intervalId);
    },
    () => timestamp.current,
    () => timestamp.current,
  );
};
export default useCD;
