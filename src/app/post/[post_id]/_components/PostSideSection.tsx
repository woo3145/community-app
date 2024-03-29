import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import Link from 'next/link';
import { PostLikeButton } from './PostLikeButton';
import { PostCommentButton } from './CommentButton';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostSideSection = ({ post }: Props) => {
  return (
    <div className="fixed w-[258px] pr-10">
      <div className="border-b border-gray-200 border-solid pb-7">
        <AuthorProfile
          isLoading={false}
          profile={post.user ? post.user.profile : null}
          size={'md'}
        />
      </div>
      <div className="flex mt-3 space-x-14">
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
    </div>
  );
};
