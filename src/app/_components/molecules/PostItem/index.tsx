import Badge from '@/app/_components/atoms/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';

import styles from './styles.module.scss';
import { Post } from '@/libs/server/postUtils/postFetchTypes';
import Skeleton from 'react-loading-skeleton';

const LikeButton = ({
  isLiked,
  count,
}: {
  isLiked: boolean;
  count: number;
}) => {
  return (
    <div className={`${styles.icon} ${isLiked ? styles.isLiked : ''}`}>
      <AiOutlineLike />
      <span>{count}</span>
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
    <div className={`${styles.icon} ${isCommented ? styles.isCommented : ''}`}>
      <IoChatbubbleOutline />
      <span>{count}</span>
    </div>
  );
};

interface Props {
  isLoading: false;
  post: Post;
}

export const PostItem = ({ post, isLoading }: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.verticleBox}>
            <div className={styles.header}>
              <AuthorProfile size={'sm'} isLoading={isLoading} />
            </div>
            <div className={styles.body}>
              <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
              <Skeleton width="100%" count={2} />
              <ul className={styles.tagList}>
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
        </div>
      </div>
    );
  }

  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.verticleBox}>
          <div className={styles.header}>
            <AuthorProfile
              size={'sm'}
              profile={post.user?.profile}
              createAt={post.createAt}
              isLoading={isLoading}
            />
          </div>

          <Link href={`/post/${post.id}`} className={styles.body}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <ul className={styles.tagList}>
              {post.tags.map((tag, idx) => {
                return (
                  <Badge isLoading={isLoading} key={idx} text={tag.title} />
                );
              })}
            </ul>
            <div className={styles.bottom}>
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
            className={styles.imageContainer}
            prefetch={false}
          >
            <Image
              src={post.imageUrl}
              width={200}
              height={150}
              alt="image"
              style={{ objectFit: 'cover' }}
              priority={true}
            />
          </Link>
        )}
      </div>
    </article>
  );
};
