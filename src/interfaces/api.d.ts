import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { Post } from '@/libs/server/postUtils/postFetchTypes';

interface ApiResponse {
  message: string;
  error?: string;
}

interface GetPostResponse extends ApiResponse {
  post: Post;
}

interface GetPostIsLikedResponse extends ApiResponse {
  isLiked: boolean;
}

interface GetUserCommentsResponse extends ApiResponse {
  data: Comment[];
}

interface LikePostResponse extends ApiResponse {
  isLiked: boolean;
  likeCount: number;
}
