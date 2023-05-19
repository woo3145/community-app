import { FetchedPost } from '@/interfaces/post';

export const addIsLikedAndIsCommented = (
  post: FetchedPost,
  userId: string | undefined
) => {
  return {
    ...post,
    isLiked: userId ? post.likes.some((like) => like.userId === userId) : false,
    isCommented: userId
      ? post.comments.some((comment) => comment.userId === userId)
      : false,
  };
};
