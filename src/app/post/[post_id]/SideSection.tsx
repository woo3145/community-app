import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import Link from 'next/link';
import { PostLikeButton } from './PostLikeButton';
import { PostCommentButton } from './CommentButton';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const SideSection = ({ post }: Props) => {
  return (
    <div className="fixed w-[258px] pr-10">
      <div className="pb-7 border-b border-solid border-gray-200">
        <Link href={`/profile/${post.user?.profile?.userId} `}>
          <AuthorProfile
            isLoading={false}
            profile={post.user ? post.user.profile : null}
            size={'md'}
          />
        </Link>
      </div>
      <div className="flex mt-3">
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
