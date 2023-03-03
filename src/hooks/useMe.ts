import { useSession } from 'next-auth/react';
import useSWR from 'swr';

interface UseMeResponse {
  me: IMe | null;
  isLoading: boolean;
  isError: boolean;
}

export const useMe = (): UseMeResponse => {
  const { data: session } = useSession();
  const { data, error } = useSWR<{ user: IMe }>(
    session ? `/api/me` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('유저정보를 가져오지 못했습니다.');
      }
      return response.json();
    }
  );

  if (!session) {
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
