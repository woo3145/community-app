import Badge from '@/app/_components/atoms/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';

import styles from './styles.module.scss';

interface Props {
  post: PostItem;
}

export const PostItem = ({ post }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.verticleBox}>
        <div className={styles.header}>
          <AuthorProfile
            size={'sm'}
            profile={post.user?.profile}
            createAt={post.createAt}
          />
        </div>

        <Link href={`/post/${post.id}`} className={styles.body}>
          <h3>{post.title}</h3>
          <p>{post.content} </p>
          <ul className={styles.tagList}>
            {post.tags.map((tag, idx) => {
              return <Badge key={idx} text={tag.title} size={'sm'} />;
            })}
          </ul>
          <div className={styles.bottom}>
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>{post._count.likes}</span>
            </div>
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </Link>
      </div>
      {post.imageUrl && (
        <Link href={`/post/${post.id}`} className={styles.imageContainer}>
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
    </article>
  );
};
