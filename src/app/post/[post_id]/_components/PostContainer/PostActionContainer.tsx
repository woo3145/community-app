'use client';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import { PostCommentButton } from '../CommentButton';
import { PostLikeButton } from '../PostLikeButton';
import { useSession } from 'next-auth/react';
import { PostPopup } from './PostPopup';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostActionContainer = ({ post }: Props) => {
  const { data: session } = useSession();

  const isWriter = session && session.user.id === post.userId;

  return (
    <div className="flex items-center justify-between">
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

      {isWriter && <PostPopup post={post} dataCy="post" />}
    </div>
  );
};
