import { getProfileInclude } from './dataShapes';
import client from './index';

export const getProfileByUserId = async (userId: string) => {
  const profile = await client.profile.findUnique({
    where: { userId: userId },
    include: getProfileInclude(),
  });

  return profile;
};
