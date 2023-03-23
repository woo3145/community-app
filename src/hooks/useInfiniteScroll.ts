import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (data: any, callback: () => void) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
              observer.unobserve(entry.target); // 옵저버를 해제하여 콜백 중복요청 방지
            }
          });
        },
        {
          threshold: [1],
        }
      );

      io.observe(bottomRef.current);
      return () => io.disconnect();
    }
    // 데이터가 변경되면 새로운 옵저버 연결
  }, [bottomRef, data, callback]);

  return bottomRef;
};
