import styles from './styles.module.scss';

export const MyProfileLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.left}>
        <div></div>
      </div>
      <div className={styles.right}>
        <div></div>
        <div>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
