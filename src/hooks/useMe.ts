import useSWR from 'swr';

interface UseMeResponse {
  profile: IMyProfile | null;
  isLoading: boolean;
  isError: boolean;
}

export const useMe = (): UseMeResponse => {
  const { data, error } = useSWR<{ profile: IMyProfile }>(
    `/api/me`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('유저 프로필을 가져오지 못했습니다.');
      }
      return response.json();
    }
  );

  return {
    profile: data?.profile || null,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
