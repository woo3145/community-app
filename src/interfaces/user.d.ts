interface Profile {
  id: number;
  name: string;
  nickname?: string;
  nameType: boolean;
  description?: string;
  avatar?: string;
  jobs?: any; // 임시
  annual: number;
  userId: string;
  interestTags: SubTag[];
}

interface Me {
  id: string;
  email: string;
  profile: Profile;
}
