import {useCallback, useInsertionEffect, useRef} from 'react';

/**
 * This should be use sparingly. It erases reactivity, i.e whenever
 * the input changes the function itself will remain the same but will return
 * the latest logic in the function which eliminate re-renders.
 */
export function useNonReactiveCallback<T extends Function>(fn: T): T {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);
  return useCallback(
    (...args: any) => {
      const latestFn = ref.current;
      return latestFn(...args);
    },
    [ref],
  ) as unknown as T;
}
