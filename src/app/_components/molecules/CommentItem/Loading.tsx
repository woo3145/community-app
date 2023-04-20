import styles from './styles.module.scss';

export const CommentItemLoading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
