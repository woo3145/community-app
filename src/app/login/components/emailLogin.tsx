'use client';

import Button from '@/app/_components/atoms/Button';
import InputField from '@/app/_components/atoms/InputField';
import Message from '@/app/_components/atoms/Message';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface Props {
  email: string;
  onPrevPage: () => void;
}

interface FormData {
  password: string;
}

export const EmailLogin = ({ onPrevPage, email }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormData>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const { password } = data;

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });
      if (!result?.ok) {
        setMessage('비밀번호가 일치하지 않습니다.');
        reset();
      } else {
        router.push('/');
      }
    } catch (e) {
      setMessage('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
      reset();
    }
  };
  return (
    <div className="w-full py-10" data-cy={'emailLogin-container'}>
      <div className="w-full max-w-md mx-auto card p-5">
        <div className="flex items-center justify-between mb-7 text-xl">
          <div className="w-20">
            <IoChevronBackOutline
              onClick={onPrevPage}
              data-cy={'prev-button'}
            />
          </div>
          <div className="font-bold">이메일로 로그인</div>
          <div className="w-20"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            dataCy="emailLogin-password-input"
            {...register('password', {
              required: true,
              minLength: 2,
              onChange: () => {
                setMessage('');
              },
            })}
          />
          {message && (
            <Message
              text={message}
              type="error"
              position="center"
              className="mb-3"
              dataCy="emailLogin-wrongPassword-message"
            />
          )}

          <Button
            type="submit"
            text="다음"
            isValid={isValid}
            isWide
            uiSize="lg"
            dataCy="emailLogin-submit-button"
            className="mt-3"
          />
        </form>
      </div>
    </div>
  );
};
