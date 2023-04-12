import { addIsLikedAndIsCommented } from '@/libs/server/fetcher/postFetch';
import { Post } from '@/libs/server/postUtils/postFetchTypes';

export interface RecentlyViewdPost {
  viewdAt: Date;
  post: Post;
}

export interface LikesPost {
  createAt: Date;
  post: Post;
}
