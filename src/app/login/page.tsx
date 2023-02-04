'use client';

import { useState } from 'react';
import { EmailLogin } from './components/emailLogin';
import { Signup } from './components/signup';
import styles from './page.module.scss';

export default function LogIn() {
  const [email, setEmail] = useState<string | null>();
  const [type, setType] = useState<string | null>(null);

  const onPrevPage = () => {
    setEmail(null);
    setType(null);
  };

  const onClick = () => {
    // email 체크 후 존재하면 로그인,
    // 없으면 가입 컴포넌트로 이동하여 다음 절차 수행
    setType('signup');
  };

  if (type === 'signup' && email) {
    return <Signup onPrevPage={onPrevPage} email={email} />;
  }

  if (type === 'emailLogin' && email) {
    return <EmailLogin onPrevPage={onPrevPage} email={email} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Woo3145 Community</span>
        </div>

        <form>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
          </div>

          <button onClick={onClick}>이메일로 계속하기</button>
        </form>
      </div>
    </div>
  );
}
