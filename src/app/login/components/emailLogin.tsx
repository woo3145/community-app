import { IoChevronBackOutline } from 'react-icons/io5';
import styles from './signup.module.scss';

interface Props {
  onPrevPage: () => void;
  email: string;
}

export const EmailLogin = ({ onPrevPage, email }: Props) => {
  const onClick = () => {
    // 로그인 성공 시 로그인 처리
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <IoChevronBackOutline onClick={onPrevPage} />
          </div>
          <div className={styles.center}>이메일로 로그인</div>
          <div className={styles.right}></div>
        </div>
        <form>
          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>

          <button>다음</button>
        </form>
      </div>
    </div>
  );
};
