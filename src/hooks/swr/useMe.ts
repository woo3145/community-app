import { Me } from '@/interfaces/user';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

interface UseMeResponse {
  me: Me | null;
  isLoading: boolean;
  isError: boolean;
}

// 로그인한 사용자 정보 불러오기
export const useMe = (): UseMeResponse => {
  const { data: session } = useSession();
  const { data, error } = useSWR<{ user: Me }>(
    session ? `/api/me` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('유저정보를 가져오지 못했습니다.');
      }
      return response.json();
    }
  );

  if (!session || !data) {
    return {
      me: null,
      isLoading: false,
      isError: false,
    };
  }

  return {
    me: data?.user || null,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
