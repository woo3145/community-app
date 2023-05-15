import Badge from '@/app/_components/atoms/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';

import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import Skeleton from 'react-loading-skeleton';

const LikeButton = ({
  isLiked,
  count,
}: {
  isLiked: boolean;
  count: number;
}) => {
  return (
    <div className={isLiked ? 'text-primary' : ''}>
      <AiOutlineLike className="text-lg" />
      <span className="text-sm pl-1 pt-1">{count}</span>
    </div>
  );
};

const CommentButton = ({
  isCommented,
  count,
}: {
  isCommented: boolean;
  count: number;
}) => {
  return (
    <div className={isCommented ? 'text-primary' : ''}>
      <IoChatbubbleOutline className="text-lg" />
      <span className="text-sm pl-1 pt-1">{count}</span>
    </div>
  );
};

interface Props {
  isLoading: false;
  post: PostWithIsLikedAndIsCommented;
}

export const PostItem = ({ post, isLoading }: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className="px-7 py-5 border-b border-solid border-gray-200">
        <div className="mb-3">
          <AuthorProfile size={'sm'} isLoading={isLoading} />
        </div>
        <div>
          <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" count={2} />
          <ul className="flex gap-2">
            {['1', '2'].map((dumy, idx) => {
              return (
                <Badge
                  isLoading={isLoading}
                  key={idx}
                  size={'sm'}
                  text={dumy}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <article className="flex px-7 py-5 border-b border-solid border-gray-200">
      <div className="w-full">
        <div className="mb-3">
          <AuthorProfile
            size={'sm'}
            profile={post.user?.profile}
            createAt={post.createAt}
            isLoading={isLoading}
          />
        </div>

        <Link href={`/post/${post.id}`}>
          <h3 className="text-xl font-bold mb-1">{post.title}</h3>
          <p className="text-gray-400">{post.content}</p>
          <ul className="flex pt-2 pb-3 gap-2">
            {post.tags.map((tag, idx) => {
              return <Badge isLoading={isLoading} key={idx} text={tag.title} />;
            })}
          </ul>
          <div className="flex w-full gap-2">
            <LikeButton isLiked={post.isLiked} count={post._count.likes} />
            <CommentButton
              isCommented={post.isCommented}
              count={post._count.comments}
            />
          </div>
        </Link>
      </div>
      {post.imageUrl && (
        <Link
          href={`/post/${post.id}`}
          className={'relative shrink-0 pl-5 z-0'}
          prefetch={false}
        >
          <Image
            src={post.imageUrl}
            width={200}
            height={150}
            alt="image"
            style={{ objectFit: 'cover' }}
            priority={true}
            className="rounded-md w-[200px] h-[150px]"
          />
        </Link>
      )}
    </article>
  );
};
