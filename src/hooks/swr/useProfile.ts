import { Profile } from '@/interfaces/user';
import { API_BASE_URL } from '@/libs/client/apis';
import useSWR from 'swr';

interface UseProfileResponse {
  profile: Profile | null;
  isLoading: boolean;
  isError: boolean;
}

// 유저 프로필 불러오기
export const useProfile = (userId?: string): UseProfileResponse => {
  const { data, error } = useSWR<{ data: Profile }>(
    userId ? `${API_BASE_URL}/user/${userId}/profile` : null
  );
  if (!userId) {
    return {
      profile: null,
      isLoading: false,
      isError: false,
    };
  }

  return {
    profile: data?.data || null,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
