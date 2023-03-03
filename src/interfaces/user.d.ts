interface IProfile {
  id: number;
  name?: string;
  nickname?: string;
  avatar?: string;
  jobs?: any; // 임시
  annual: number;
  userId: string;
}

interface IMyProfile extends IProfile {
  interestTags: any;
}
