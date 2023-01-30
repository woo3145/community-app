import { Inter } from '@next/font/google';
import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function LogIn() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Woo3145 Community</span>
        </div>

        <form>
          <h1>로그인</h1>

          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
            />
          </div>

          <button>이메일로 계속하기</button>
        </form>
      </div>
    </div>
  );
}
