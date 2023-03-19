interface Profile {
  id: number;
  name?: string;
  nickname?: string;
  avatar?: string;
  jobs?: any; // 임시
  annual: number;
  userId: string;
}

interface MyProfile extends Profile {
  interestTags: any;
}

interface Me {
  id: string;
  email: string;
  profile: IMyProfile;
}
