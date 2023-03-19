import { AuthorProfile } from '@/app/_common/profile/author_profile';
import styles from './postContents.module.scss';

interface Props {
  article: Article;
}

export const PostContents = ({ article }: Props) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.autor}>
          <AuthorProfile
            profile={article.user?.profile}
            createAt={article.createAt}
          />
        </div>

        <h1 className={styles.title}>{article.title}</h1>
      </div>

      <div className={styles.body}>{article.content}</div>
    </div>
  );
};
