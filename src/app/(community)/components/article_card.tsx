import { AuthorProfile } from '@/app/_common/profile/author_profile';
import Badge from '@/app/_components/atoms/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './article_card.module.scss';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <article className={styles.container}>
      <div className={styles.verticleBox}>
        <div className={styles.header}>
          <AuthorProfile
            size={'sm'}
            profile={article.user?.profile}
            createAt={article.createAt}
          />
        </div>

        <Link href={`/post/${article.id}`} className={styles.body}>
          <h3>{article.title}</h3>
          <p>{article.content} </p>
          <ul className={styles.tagList}>
            {article.tags.map((tag, idx) => {
              return <Badge key={idx} text={tag.title} size={'sm'} />;
            })}
          </ul>
          <div className={styles.bottom}>
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>{article._count.likes}</span>
            </div>
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>{article._count.comments}</span>
            </div>
          </div>
        </Link>
      </div>
      {article.imageUrl && (
        <Link href={`/post/${article.id}`} className={styles.imageContainer}>
          <Image
            src={article.imageUrl}
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
