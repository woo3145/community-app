import { useCallback, useRef, useState } from 'react';

// useRef에서 마운트 완료 유무를 체크하기 위한 Hook
export const useMountedRef = <T extends HTMLElement>() => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<T>();

  const handleRef = useCallback((node: T) => {
    setIsMounted(true);
    ref.current = node;
  }, []);

  return { isMounted, handleRef, ref };
};
