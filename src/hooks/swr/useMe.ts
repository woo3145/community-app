import { Me } from '@/interfaces/user';
import { API_BASE_URL } from '@/libs/client/apis';
import { useSession } from 'next-auth/react';
import useSWR, { KeyedMutator } from 'swr';

interface UseMeResponse {
  me: Me | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  updateCache: (newUser: Me) => void;
}

// 로그인한 사용자 정보 불러오기
export const useMe = (): UseMeResponse => {
  const { data: session } = useSession();
  const { data, error, mutate } = useSWR<{ data: Me }>(
    session ? `${API_BASE_URL}/me` : null
  );

  if (!session) {
    return {
      me: null,
      isLoggedIn: false,
      isLoading: false,
      isError: false,
      updateCache: (newUser: Me) => {},
    };
  }

  const updateCache = (newUser: Me) => {
    mutate({ data: newUser });
  };

  return {
    me: data?.data || null,
    isLoading: !data && !error,
    isLoggedIn: !!data?.data,
    isError: error !== undefined,
    updateCache,
  };
};
