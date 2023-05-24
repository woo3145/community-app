'use client';

import InputField from '@/app/_components/atoms/InputField';
import { EmailLogin } from './EmailLogin';
import { Signup } from './Signup';
import { ChangeEvent, useState } from 'react';
import Button from '@/app/_components/atoms/Button';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

interface CheckEmailResponse {
  registed: boolean;
}

type LoginType = 'emailLogin' | 'signup';

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export const EmailCheck = ({ providers }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [type, setType] = useState<LoginType | null>(null);

  const onPrevPage = () => {
    setEmail('');
    setType(null);
  };

  // 이메일의 가입여부를 확인하여 리턴 컴포넌트 변경
  const onSubmitCheckEmail = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="w-full p-5 card">
      <div className="py-5 text-2xl font-bold text-center">
        <span>Woo3145 Community</span>
      </div>

      <form onSubmit={onSubmitCheckEmail} data-cy={'checkEmail-container'}>
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

      {providers && (
        <div>
          <div className="py-4 text-sm text-center text-gray-600">또는</div>
          {Object.values(providers).map((provider) => {
            if (provider.id === 'credentials') {
              return;
            }
            console.log(provider.id);
            return (
              <div key={provider.name}>
                <Button
                  type="button"
                  uiSize="lg"
                  onClick={() => signIn(provider.id)}
                  text={`Sign in with ${provider.name}`}
                  isWide
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
