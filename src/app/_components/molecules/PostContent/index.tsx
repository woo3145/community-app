import Image from 'next/image';
import styles from './styles.module.scss';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { Post } from '@/libs/server/postUtils/postFetchTypes';

interface Props {
  post: Post;
}

export const PostContent = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.autor}>
          <AuthorProfile
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
