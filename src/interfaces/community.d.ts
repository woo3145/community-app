interface PostItem {
  id: number;
  title: string;
  content: string;
  tags: SubTag[];
  imageUrl?: string;

  userId?: string;

  user?: {
    profile: Profile;
  };

  createAt: Date;
  updateAt: Date;

  _count: {
    comments: number;
    likes: number;
  };
}

interface Comment {
  id: number;
  content: string;

  userId?: string;

  user?: {
    profile: Profile;
  };

  createAt: Date;
  updateAt: Date;
}
