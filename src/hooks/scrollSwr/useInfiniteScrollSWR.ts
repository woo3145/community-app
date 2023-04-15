import { MutableRefObject } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useInfiniteScroll } from '../useInfiniteScroll';

interface UseInfiniteScrollSWRReturn<T> {
  data: { data: T }[];
  bottomRef: MutableRefObject<null>;
  isReachedEnd: boolean;
  isLoading: boolean;
  isError: boolean;
}
interface UseInfiniteScrollSWROption {
  limit?: number; // 한번페이지당 불러올 데이터 수
  query?: string; // 추가적인 쿼리 ex) tag_id=7&title=test
  revalidateFirstPage?: boolean; // 항상 첫페이지 유효성 재확인
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('데이터를 불러오는중 에러가 발생했습니다.');
  }
  return response.json();
};

const DEFAULT_LIMIT = 6;

// 페이지네이션을 지원하는 api에서 무한스크롤로 데이터를 받아오는 훅
export const useInfiniteScrollSWR = <T extends any[]>(
  url: string,
  option?: UseInfiniteScrollSWROption
): UseInfiniteScrollSWRReturn<T> => {
  const limit = option?.limit ? option.limit : DEFAULT_LIMIT;
  const query = option?.query ? option.query : '';
  const revalidateFirstPage = option?.revalidateFirstPage
    ? option.revalidateFirstPage
    : true;

  const { data, error, size, setSize } = useSWRInfinite<{
    data: T;
  }>(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.data?.length) return null; // 끝에 도달

      return `${url}?page=${pageIndex}&limit=${limit}&${query}`;
    },
    fetcher,
    { revalidateFirstPage: revalidateFirstPage }
  );

  const isReachedEnd =
    data !== undefined && data[data.length - 1]?.data.length < limit;
  // 마지막으로 가져온 데이터의 크기가 limit보다 적으면 더이상 가져올 데이터 없음
  const isLoading =
    (!data && !error) ||
    (0 < size && data !== undefined && data.length !== size);
  // 첫페이지 요청이 아님 && 데이터는 그대로고 사이즈만 증가한 상태

  const bottomRef = useInfiniteScroll(data, () => {
    if (!isReachedEnd) setSize(size + 1);
  });

  return {
    data: data ? data : [],
    bottomRef,
    isReachedEnd: isReachedEnd,
    isLoading,
    isError: error !== undefined,
  };
};
