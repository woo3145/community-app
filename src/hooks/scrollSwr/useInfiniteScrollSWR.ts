import { MutableRefObject } from 'react';

import useSWRInfinite from 'swr/infinite';
import { KeyedMutator } from 'swr';

import { useInfiniteScroll } from '../useInfiniteScroll';
import { isServerError } from '@/libs/typeGuards';

interface UseInfiniteScrollSWRReturn<T> {
  data: { data: T }[];
  bottomRef: MutableRefObject<null>;
  mutate: KeyedMutator<
    {
      data: T;
    }[]
  >;
  isReachedEnd: boolean;
  isLoading: boolean;
  isError: boolean;
}
interface UseInfiniteScrollSWROption {
  limit?: number; // 한페이지당 불러올 데이터 수
  query?: string; // 추가적인 쿼리 ex) tag_id=7&title=test
  revalidateFirstPage?: boolean; // 항상 첫페이지 유효성 재확인
}

const DEFAULT_LIMIT = 6;

// 페이지네이션을 지원하는 api에서 무한스크롤로 데이터를 받아오는 훅
export const useInfiniteScrollSWR = <T extends any[]>(
  url: string,
  {
    limit = DEFAULT_LIMIT,
    query = '',
    revalidateFirstPage = true,
  }: UseInfiniteScrollSWROption = {}
): UseInfiniteScrollSWRReturn<T> => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<{
    data: T;
  }>(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.data?.length) return null; // 끝에 도달

      return `${url}?page=${pageIndex}&limit=${limit}&${query}`;
    },
    {
      revalidateFirstPage: revalidateFirstPage,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404 / 401.
        if (isServerError(error)) {
          if (error.statusCode === 404 || error.statusCode === 401) return;
        } else {
          if (error?.status === 404 || error?.status === 401) return;
        }

        // Only retry up to 10 times.
        if (retryCount >= 5) return;

        // Retry after 3 seconds.
        setTimeout(() => revalidate({ retryCount }), 3000);
      },
    }
  );

  const isReachedEnd =
    error ||
    (Array.isArray(data) && data[data.length - 1]?.data?.length < limit);
  // 마지막으로 가져온 데이터의 크기가 limit보다 적으면 더이상 가져올 데이터 없음

  const isLoading =
    (!data && !error) ||
    (0 < size && data !== undefined && data.length !== size);
  // 첫페이지 요청이 아님 && 데이터는 그대로고 사이즈만 증가한 상태

  // IntersectionObserver로 콜백함수를 실행시켜주는 ref
  const bottomRef = useInfiniteScroll(data, () => {
    if (!isReachedEnd) setSize(size + 1);
  });

  return {
    data: data ? data : [],
    mutate,
    bottomRef,
    isReachedEnd: isReachedEnd,
    isLoading,
    isError: error !== undefined,
  };
};
