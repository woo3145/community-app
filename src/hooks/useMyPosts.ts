import { MutableRefObject, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import { useInfiniteScroll } from './useInfiniteScroll';

interface UseMyPostsReturn {
  data: { posts: PostItem[] }[];
  bottomRef: MutableRefObject<null>;
  isReachedEnd: boolean;
  isLoading: boolean;
  isError: boolean;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('게시글을 가져오지 못했습니다.');
  }
  return response.json();
};

const POST_LIMIT = 6;

export const useMyPosts = (): UseMyPostsReturn => {
  const { data, error, size, setSize } = useSWRInfinite<{ posts: PostItem[] }>(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.posts?.length) return null; // 끝에 도달

      return `/api/my/posts?&page=${pageIndex}&limit=${POST_LIMIT}`;
    },
    fetcher,
    { revalidateFirstPage: false } // 항상 첫페이지 유효성 재확인
  );

  const isReachedEnd =
    data !== undefined && data[data.length - 1]?.posts.length < POST_LIMIT;
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
