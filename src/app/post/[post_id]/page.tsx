import { AuthorBox } from '@/app/_common/author_box';
import { mockArticles } from '@/mocks/mockArticles';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { CommentsContainer } from './components/commentsContainer';
import { PostContents } from './components/postContents';
import { SideAuthorBox } from './components/sideAuthor_box';
import styles from './page.module.scss';

export default function PostDetail() {
  const article = mockArticles[0];

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <SideAuthorBox href="/" author={article.author} />
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <PostContents article={article} />

          <div className={styles.bottom}>
            {/* Like Button */}
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>0</span>
            </div>

            {/* Comment Button */}
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>0</span>
            </div>
          </div>
        </article>

        <CommentsContainer />
      </section>
    </main>
  );
}
