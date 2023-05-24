'use client';

import Button from '@/app/_components/atoms/Button';
import InputField from '@/app/_components/atoms/InputField';
import Message from '@/app/_components/atoms/Message';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import { _signup } from '@/libs/client/apis';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';

interface Props {
  onPrevPage: () => void;
  email: string;
}

interface FormData {
  name: string;
  password: string;
  checkPassword: string;
}

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

export const Signup = ({ onPrevPage, email }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
    setValue,
  } = useForm<FormData>();

  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const { password, checkPassword, name } = data;
      if (password !== checkPassword) {
        setValue('password', '');
        setValue('checkPassword', '');
        setMessage('비밀번호가 일치하지 않습니다.');
        return;
      }

      await _signup({
        email,
        password,
        name,
      });

      // 가입 성공
      await signIn('credentials', {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (e) {
      setValue('password', '');
      setValue('checkPassword', '');
      errorHandlerWithToast(e);
    }
  };
  const password = watch('password');
  const passwordValid = passwordRegex.test(password);

  const checkPassword = watch('checkPassword');
  const checkPasswordValid = password === checkPassword;

  return (
    <div className="w-full py-10">
      <div className="w-full max-w-md p-5 mx-auto card">
        <div className="flex items-center justify-between text-xl mb-7">
          <div className="w-20">
            <IoChevronBackOutline
              onClick={onPrevPage}
              data-cy={'prev-button'}
              className="cursor-pointer"
            />
          </div>
          <div className="font-bold">회원가입</div>
          <div className="w-20"></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-cy={'signup-container'}
          className="space-y-3"
        >
          <InputField
            label="이메일"
            id="email"
            type="email"
            value={email}
            disabled={true}
            dataCy="signup-email-input"
          />

          <InputField
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            dataCy="signup-name-input"
            {...register('name', {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />

          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            dataCy="signup-password-input"
            {...register('password', {
              required: true,
              pattern: passwordRegex,
            })}
          />
          {password && !passwordValid && (
            <Message
              text="올바르지 않은 비밀번호입니다."
              type="error"
              position="center"
              dataCy="signup-wrongPassword-message"
              className="mb-3"
            />
          )}
          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한번 입력해주세요."
            dataCy="signup-checkPassword-input"
            {...register('checkPassword', {
              required: true,
              pattern: passwordRegex,
              validate: (value, formValues) => value === formValues.password,
            })}
          />
          {checkPassword && !checkPasswordValid && (
            <Message
              text="비밀번호가 서로 일치하지 않습니다."
              type="error"
              position="center"
              dataCy="signup-notMatchPassword-message"
              className="mb-3"
            />
          )}
          {passwordValid && checkPasswordValid && (
            <Message
              text="사용 가능한 비밀번호입니다."
              type="success"
              position="center"
              dataCy="signup-successPassword-message"
              className="mb-3"
            />
          )}
          <Message
            text="영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상으로 입력해주세요."
            type="guide"
            position="left"
            className="mb-3"
          />

          <Button
            type="submit"
            text="가입하기"
            isValid={isValid}
            isWide
            uiSize="lg"
            dataCy="signup-submit-button"
            className="mt-3"
          />
        </form>
      </div>
    </div>
  );
};
