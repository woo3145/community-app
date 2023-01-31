import { AuthorBox } from '@/app/_common/author_box';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './article_card.module.scss';

interface Props {
  article: IArticle;
}

export const ArticleCard = ({ article }: Props) => {
  const images = '';

  return (
    <article className={styles.container}>
      <div className={styles.verticleBox}>
        <div className={styles.header}>
          <AuthorBox
            size={'sm'}
            author={article.author}
            href={`/profile/${article.author.id}`}
            createAt={article.createAt}
          />
        </div>

        <Link href={`/post/${article.id}`} className={styles.body}>
          <h3>{article.title}</h3>
          <p>{article.contents}</p>
          <div className={styles.bottom}>
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>{article.like_count}</span>
            </div>
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>{article.comment_count}</span>
            </div>
          </div>
        </Link>
      </div>
      {images && <div>Image</div>}
    </article>
  );
};
