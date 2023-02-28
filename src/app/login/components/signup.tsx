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
    formState: { isValid },
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
      const response = await (
        await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        })
      ).json();
      if (response.error) {
        setValue('password', '');
        setValue('checkPassword', '');
        setMessage(response.error);
        return;
      }
      // 가입 성공
      await signIn('credentials', {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (e) {
      setMessage('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };
  const password = watch('password');
  const passwordValid = passwordRegex.test(password);
  const passwordClassName = passwordValid ? styles.valid : styles.inValid;

  const checkPassword = watch('checkPassword');
  const checkPasswordValid = password === checkPassword;
  const checkPasswordClassName = checkPasswordValid
    ? styles.valid
    : styles.inValid;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <IoChevronBackOutline onClick={onPrevPage} />
          </div>
          <div className={styles.center}>회원가입</div>
          <div className={styles.right}></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" value={email} disabled={true} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="name">이름</label>
            <input
              className={styles.focusInput}
              type="text"
              placeholder="이름을 입력해주세요."
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              className={password ? passwordClassName : styles.focusInput}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', {
                required: true,
              })}
            />
            {password && !passwordValid && (
              <p className={styles.errorMessage}>
                올바르지 않은 비밀번호입니다.
              </p>
            )}
            <input
              className={
                checkPassword ? checkPasswordClassName : styles.focusInput
              }
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              {...register('checkPassword', {
                required: true,
                pattern: passwordRegex,
              })}
            />
            {checkPassword && !checkPasswordValid && (
              <p className={styles.errorMessage}>
                비밀번호가 서로 일치하지 않습니다.
              </p>
            )}
            {password &&
              passwordValid &&
              checkPassword &&
              checkPasswordValid && (
                <p className={styles.successMessage}>
                  사용 가능한 비밀번호입니다.
                </p>
              )}
            <p className={styles.helpText}>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상으로
              입력해주세요.
            </p>

            {message && <p className={styles.errorMessage}>{message}</p>}
          </div>

          <button
            type="submit"
            className={isValid ? styles.validButton : ''}
            disabled={!isValid}
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};
