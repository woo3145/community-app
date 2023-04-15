import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

interface Me {
  id: string;
  email: string;
  profile: Exclude<Profile, null>;
}
