interface IProfile {
  id: number;
  name?: string;
  nickname?: string;
  avatar?: string;
  jobs?: any; // 임시
  annual: number;
  userId?: string;
}

interface IAuthor {
  id: string;
  profile: IProfile;
}
