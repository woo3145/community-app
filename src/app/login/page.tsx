'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Button from '../_components/atoms/Button';
import InputField from '../_components/atoms/InputField';
import { EmailLogin } from './components/emailLogin';
import { Signup } from './components/signup';
import styles from './page.module.scss';

export const metadata = {
  title: 'Woo3145 - Login',
};

interface CheckEmailResponse {
  registed: boolean;
}

export default function LogIn({ providers }: any) {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>('');
  const [type, setType] = useState<string | null>(null);
  if (session) {
    redirect('/');
  }

  const onPrevPage = () => {
    setEmail('');
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
          <InputField
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            text="이메일로 계속하기"
            isValid={4 < email.length}
            wide
            size="lg"
          />
        </form>
      </div>
    </div>
  );
}
