import { IoChevronBackOutline } from 'react-icons/io5';
import styles from './signup.module.scss';

interface Props {
  onPrevPage: () => void;
  email: string;
}

export const Signup = ({ onPrevPage, email }: Props) => {
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
        <form>
          <div className={styles.inputBox}>
            <label htmlFor="email">이메일</label>
            <input id="email" type="email" value={email} disabled={true} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="name">이름</label>
            <input id="name" type="text" placeholder="이름을 입력해주세요." />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
            <input
              id="checkPassword"
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요."
            />
            <p>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상
              16자 이하로 입력해주세요.
            </p>
          </div>

          <button>가입하기</button>
        </form>
      </div>
    </div>
  );
};
