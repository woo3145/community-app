import { AuthorBox } from '@/app/_common/author_box';
import { Inter } from '@next/font/google';
import Link from 'next/link';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function PostDetail() {
  const author: IAuthor = {
    id: 1,
    name: '이창우',
    job: '개발',
    career: '신입',
  };

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <div className={styles.aside_container}>
          <div className={styles.aside_container_top}>
            <Link href={'/'}>
              <div className={styles.author_box}>
                <div className={styles.userAvatar}></div>
                <div>
                  <p className={styles.user_name}>이창우</p>
                  <div className={styles.user_career}>
                    <span>개발</span>
                    <span>신입</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      <section className={styles.postDetail}>
        <article className={styles.contentsBox}>
          <div className={styles.header}>
            <div className={styles.autor}>
              <AuthorBox author={author} createAt={'7시간 전'} href={'/'} />
            </div>

            <h1 className={styles.title}>title</h1>
          </div>
          <div className={styles.body}>
            내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
            내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
            내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
            내용내용 내용
          </div>
          <div className={styles.tags}>
            <Link href={'/'} className={styles.tag}>
              고민
            </Link>
            <Link href={'/'} className={styles.tag}>
              취업
            </Link>
          </div>
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

        <div className={styles.commentsContainer}>
          <div className={styles.emptyMessage}>
            <IoChatbubbleOutline />
            <p>첫 댓글을 남겨주세요.</p>
          </div>

          <div className={styles.commentWrite}>
            <div className={styles.commentWrite_top}>
              <AuthorBox author={{ id: 1, name: '이창우' }} href={'/'} />
            </div>
            <div className={styles.commentWrite_bottom}>
              <form>
                <textarea placeholder="댓글 남기기" />
                <div className={styles.button_wrapper}>
                  <button>등록</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
