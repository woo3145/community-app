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
    <div className={`flex items-center ${isLiked ? 'text-primary' : ''}`}>
      <AiOutlineLike className="text-lg" />
      <span className="pt-1 pl-1 text-sm">{count}</span>
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
    <div className={`flex items-center ${isCommented ? 'text-primary' : ''}`}>
      <IoChatbubbleOutline className="text-lg" />
      <span className="pt-1 pl-1 text-sm">{count}</span>
    </div>
  );
};

interface Props {
  isLoading: boolean;
  post?: PostWithIsLikedAndIsCommented;
  dataCy?: string;
}

export const PostItem = ({ post, isLoading, dataCy }: Props) => {
  if (isLoading || !post) {
    return (
      <div className="py-5 border-b border-gray-200 border-solid px-7">
        <div className="mb-3">
          <AuthorProfile size={'sm'} isLoading={isLoading} />
        </div>
        <div>
          <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" count={2} />
          <ul className="flex gap-2">
            {['1', '2'].map((dumy, idx) => {
              return <Badge isLoading={isLoading} key={idx} text={dumy} />;
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <article
      className="flex flex-col px-3 py-5 border-b border-gray-200 border-solid xl:flex-row md:px-6 xl:px-7"
      data-cy={dataCy}
    >
      <div className="w-full">
        <div className="mb-1">
          <AuthorProfile
            size={'sm'}
            profile={post.user?.profile}
            createAt={post.createAt}
            isLoading={isLoading}
          />
        </div>

        <Link href={`/post/${post.id}`}>
          <div className="pl-11">
            <h3 className="text-xl font-bold break-all line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-500">{post.content}</p>
            <ul className="flex gap-2 py-2">
              {post.tags.map((tag, idx) => {
                return (
                  <Badge isLoading={isLoading} key={idx} text={tag.title} />
                );
              })}
            </ul>
            <div className="flex w-full gap-3">
              <LikeButton isLiked={post.isLiked} count={post._count.likes} />
              <CommentButton
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
          <Image
            src={post.imageUrl}
            width={200}
            height={150}
            loading="lazy"
            alt="image"
            placeholder="blur"
            blurDataURL={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Uw8AAh0BTZud3BwAAAAASUVORK5CYII='
            }
            style={{ objectFit: 'cover' }}
            className="rounded-md mt-4 w-full xl:w-[200px] h-[150px] bg-center"
          />
        </Link>
      )}
    </article>
  );
};
