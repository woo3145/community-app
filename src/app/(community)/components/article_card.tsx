import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './article_card.module.scss';

export const ArticleCard = () => {
  const images = '';
  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <Link href={`/profile/24`} className={styles.autor_box}>
          <div className={styles.autor_box_inner}>
            <div className={styles.user_avatar}></div>
            <div>
              <div className={styles.user_info}>
                <p className={styles.username}>woo3145</p>
              </div>
              <span className={styles.date}>2023.01.27</span>
            </div>
          </div>
        </Link>

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
