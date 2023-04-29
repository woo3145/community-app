import Image from 'next/image';
import styles from './styles.module.scss';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { Post } from '@/libs/server/postUtils/postFetchTypes';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  post: Post;
}

export const PostContent = ({ post, isLoading }: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.autor}>
            <AuthorProfile isLoading={isLoading} size={'md'} />
          </div>
          <Skeleton
            width="60%"
            height={32}
            style={{ marginTop: 32, marginBottom: 32 }}
          />
        </div>

        <Skeleton height={400} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.autor}>
          <AuthorProfile
            isLoading={isLoading}
            profile={post.user ? post.user.profile : null}
            createAt={post.createAt}
            size={'md'}
          />
        </div>

        <h1 className={styles.title}>{post.title}</h1>
      </div>

      <div className={styles.body}>{post.content}</div>

      {post.imageUrl && (
        <Image src={post.imageUrl} width={800} height={800} alt="image" />
      )}
    </div>
  );
};
