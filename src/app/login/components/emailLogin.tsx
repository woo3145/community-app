'use client';

import Button from '@/app/_components/atoms/Button';
import InputField from '@/app/_components/atoms/InputField';
import Message from '@/app/_components/atoms/Message';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import styles from './signup.module.scss';

interface Props {
  email: string;
  onPrevPage: () => void;
}

interface FormData {
  password: string;
}

export const EmailLogin = ({ onPrevPage, email }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
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
        return;
      }
    } catch (e) {
      setMessage('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  return (
    <div className={styles.wrapper} data-cy={'email-login-form'}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <IoChevronBackOutline onClick={onPrevPage} />
          </div>
          <div className={styles.center}>이메일로 로그인</div>
          <div className={styles.right}></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="비밀번호"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
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
              style={{ marginBottom: '12px' }}
            />
          )}

          <Button type="submit" text="다음" isValid={isValid} wide size="lg" />
        </form>
      </div>
    </div>
  );
};
