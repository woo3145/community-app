import { AuthorBox } from '@/app/_common/author_box';
import Link from 'next/link';
import styles from './postContents.module.scss';

interface Props {
  article: IArticle;
}

export const PostContents = ({ article }: Props) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.autor}>
          <AuthorBox author={article.author} createAt={'7시간 전'} href={'/'} />
        </div>

        <h1 className={styles.title}>{article.title}</h1>
      </div>

      <div className={styles.body}>{article.contents}</div>

      <div className={styles.tags}>
        {article.tags.map((tag) => {
          return (
            <Link key={tag.id} href={`/${tag.id}`} className={styles.tag}>
              {tag.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
