import { AuthorBox } from '@/app/_common/author_box';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './article_card.module.scss';

export const ArticleCard = () => {
  const images = '';

  const author: IAuthor = {
    name: 'woo3145',
    job: '개발',
    carrer: '신입',
  };
  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <AuthorBox
            size={'sm'}
            author={author}
            href={'/profile/24'}
            createAt={'2023.01.27'}
          />
        </div>

        <Link href={`/post/14`} className={styles.body}>
          <h3>제목</h3>
          <p>내용</p>
          <div className={styles.bottom}>
            <div className={styles.icon}>
              <AiOutlineLike />
              <span>0</span>
            </div>
            <div className={styles.icon}>
              <IoChatbubbleOutline />
              <span>0</span>
            </div>
          </div>
        </Link>
      </div>
      {images && <div>Image</div>}
    </article>
  );
};
