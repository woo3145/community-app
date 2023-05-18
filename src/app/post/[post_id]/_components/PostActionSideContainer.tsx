import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import { PostLikeButton } from './PostLikeButton';
import { PostCommentButton } from './CommentButton';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostActionContainer = ({ post }: Props) => {
  return (
    <div className="flex space-x-14">
      {/* Like Button */}
      <PostLikeButton
        postId={post.id}
        isLiked={post.isLiked}
        likeCount={post._count.likes}
      />
      {/* Comment Button */}
      <PostCommentButton
        postId={post.id}
        isCommented={post.isCommented}
        commentCount={post._count.comments}
      />
    </div>
  );
};
