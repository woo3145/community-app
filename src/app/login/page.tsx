'use client';

import { useState } from 'react';
import { EmailLogin } from './components/emailLogin';
import { Signup } from './components/signup';
import styles from './page.module.scss';

interface CheckEmailResponse {
  registed: boolean;
}

export default function LogIn({ providers }: any) {
  const [email, setEmail] = useState<string | null>();
  const [type, setType] = useState<string | null>(null);

  const onPrevPage = () => {
    setEmail(null);
    setType(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`/api/auth/checkEmail?email=${email}`, {
      method: 'GET',
    });
    const data: CheckEmailResponse = await response.json();
    if (data.registed) {
      // 기존 유저
      setType('emailLogin');
    } else {
      // 신규 유저
      setType('signup');
    }
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

        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
            />
          </div>

          <button>이메일로 계속하기</button>
        </form>
      </div>
    </div>
  );
}
