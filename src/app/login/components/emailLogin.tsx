import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackOutline } from 'react-icons/io5';
import styles from './signup.module.scss';

interface Props {
  onPrevPage: () => void;
  email: string;
}

interface FormData {
  password: string;
}

export const EmailLogin = ({ onPrevPage, email }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormData>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const { password } = data;

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (e) {
      console.log('error : ', e);
      setMessage('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              className={message ? styles.inValid : styles.focusInput}
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
            {message && <p className={styles.errorMessage}>{message}</p>}
          </div>

          <button
            type="submit"
            className={isValid ? styles.validButton : ''}
            disabled={!isValid}
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
};
