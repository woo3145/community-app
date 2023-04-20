import styles from './styles.module.scss';

export const PostItemLoading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <div className={styles.left}>
          <div></div>
        </div>
        <div className={styles.right}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
