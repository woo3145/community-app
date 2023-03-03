import { AuthorProfile } from '@/app/_common/profile/author_profile';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './article_card.module.scss';

interface Props {
  article: IArticle;
}

export const ArticleCard = ({ article }: Props) => {
  const images = '';
  console.log(article);
  return (
    <article className={styles.container}>
      <div className={styles.verticleBox}>
        <div className={styles.header}>
          <AuthorProfile
            size={'sm'}
            userId={article.userId}
            createAt={article.createAt}
          />
        </div>

        <Link href={`/post/${article.id}`} className={styles.body}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
          <div className={styles.bottom}>
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>{article.likeCount}</span>
            </div>
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>{article.commentCount}</span>
            </div>
          </div>
        </Link>
      </div>
      {images && <div>Image</div>}
    </article>
  );
};
