import { Post } from '@/libs/server/postUtils/fetchTypes';
import { addIsLikedAndIsCommented } from '@/libs/server/postUtils/postFetch';

type PostItem = Post;

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
