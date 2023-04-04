import Image from 'next/image';
import styles from './postContents.module.scss';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';

interface Props {
  post: PostItem;
}

export const PostContents = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.autor}>
          <AuthorProfile
            profile={post.user?.profile}
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
