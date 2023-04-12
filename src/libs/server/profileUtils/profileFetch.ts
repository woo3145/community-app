import client from '@/libs/server/prismaClient';

export const getProfileInclude = () => {
  return {
    job: true,
    interestTags: true,
  };
};

export const fetchProfileByUserId = async (userId: string) => {
  const profile = await client.profile.findUnique({
    where: { userId: userId },
    include: getProfileInclude(),
  });

  return profile;
};
