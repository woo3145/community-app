import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import { PostCommentButton } from '../CommentButton';
import { PostLikeButton } from '../PostLikeButton';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostActionContainer = ({ post }: Props) => {
  return (
    <div className="flex">
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

      {/* 게시글 삭제 기능 예정*/}
    </div>
  );
};
