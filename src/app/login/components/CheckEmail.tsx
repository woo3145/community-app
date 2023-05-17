'use client';

import { ChangeEvent, useState } from 'react';
import { Signup } from './signup';
import { EmailLogin } from './emailLogin';
import InputField from '@/app/_components/atoms/InputField';
import Button from '@/app/_components/atoms/Button';

interface CheckEmailResponse {
  registed: boolean;
}

export default function CheckEmail() {
  const [email, setEmail] = useState<string>('');
  const [type, setType] = useState<string | null>(null);

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
    <div className="w-full py-10" data-cy={'checkEmail-container'}>
      <div className="w-full max-w-md mx-auto card p-5">
        <div className="text-center py-5 text-2xl font-bold">
          <span>Woo3145 Community</span>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            dataCy="checkEmail-email-input"
          />

          <Button
            type="submit"
            text="이메일로 계속하기"
            isValid={4 < email.length}
            isWide
            uiSize="lg"
            dataCy="checkEmail-continue-button"
            className="mt-3"
          />
        </form>
      </div>
    </div>
  );
}
