import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import useSWR from 'swr';

interface UseProfileResponse {
  profile: Profile | null;
  isLoading: boolean;
  isError: boolean;
}

export const useProfile = (userId?: string): UseProfileResponse => {
  const { data, error } = useSWR<{ profile: Profile }>(
    userId ? `/api/profile/${userId}` : null,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('유저 프로필을 가져오지 못했습니다.');
      }
      return response.json();
    }
  );
  if (!userId) {
    return {
      profile: null,
      isLoading: false,
      isError: false,
    };
  }

  return {
    profile: data?.profile || null,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
