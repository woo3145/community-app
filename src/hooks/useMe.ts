import useSWR from 'swr';

interface UseMeResponse {
  me: IMe | null;
  isLoading: boolean;
  isError: boolean;
}

export const useMe = (): UseMeResponse => {
  const { data, error } = useSWR<{ user: IMe }>(
    `/api/me`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('유저정보를 가져오지 못했습니다.');
      }
      return response.json();
    }
  );

  return {
    me: data?.user || null,
    isLoading: !data && !error,
    isError: error !== undefined,
  };
};
