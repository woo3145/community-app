import styles from './page.module.scss';

export default function Write() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.writeHeaderWrapper}>
        <div className={styles.writeHeader}>
          <button>등록하기</button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tagSection}></div>
        <div className={styles.title}>
          <input type="text" placeholder="제목을 입력해주세요." />
        </div>
        <div className={styles.content}>
          <textarea name="" id="" placeholder="내용을 작성해주세요."></textarea>
        </div>
      </div>
    </main>
  );
}
