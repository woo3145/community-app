import { getProfileByUserId } from '@/libs/prisma/profile';

export type Profile = Exclude<
  Awaited<ReturnType<typeof getProfileByUserId>>,
  null
>;

interface Me {
  id: string;
  email: string;
  profile: Profile;
}
