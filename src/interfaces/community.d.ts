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
  isLiked: boolean;
  isCommented: boolean;
}

interface RecentlyViewdPost {
  viewdAt: Date;
  post: PostItem;
}

interface LikesPost {
  createAt: Date;
  post: PostItem;
}

interface Comment {
  id: number;
  content: string;

  userId?: string;
  postId?: number;

  user?: {
    profile: Profile;
  };

  createAt: Date;
  updateAt: Date;
}
