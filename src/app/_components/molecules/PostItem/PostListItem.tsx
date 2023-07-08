import Link from 'next/link';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';

import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import PostLikeCount from './PostLikeCount';
import PostCommentCount from './PostCommentCount';
import LoadingSkeleton from './LoadingSkeleton';
import PostTitle from './PostTitle';
import PostContent from './PostContent';
import PostTags from './PostTags';
import PostThumbnail from './PostThumbnail';

interface Props {
  isLoading: boolean;
  post?: PostWithIsLikedAndIsCommented; // isLoading 일때 undefined
  dataCy?: string;
}

export const PostListItem = ({ post, isLoading, dataCy }: Props) => {
  if (isLoading || !post) {
    return <LoadingSkeleton />;
  }

  return (
    <article
      className="flex flex-col px-3 py-5 border-b border-gray-200 border-solid xl:flex-row md:px-6 xl:px-7"
      data-cy={dataCy}
    >
      <div className="w-full space-y-1">
        <AuthorProfile
          size={'sm'}
          profile={post.user?.profile}
          createAt={post.createAt}
          isLoading={isLoading}
        />

        <Link href={`/post/${post.id}`}>
          <div className="pl-11">
            <PostTitle title={post.title} />
            <PostContent content={post.content} />
            <PostTags tags={post.tags} />

            <div className="flex w-full gap-3">
              <PostLikeCount isLiked={post.isLiked} count={post._count.likes} />
              <PostCommentCount
                isCommented={post.isCommented}
                count={post._count.comments}
              />
            </div>
          </div>
        </Link>
      </div>
      {post.imageUrl && (
        <Link
          href={`/post/${post.id}`}
          className={'relative shrink-0 xl:pl-5 z-0'}
          prefetch={false}
        >
          <PostThumbnail src={post.imageUrl} alt={post.title} />
        </Link>
      )}
    </article>
  );
};
