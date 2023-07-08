import Link from 'next/link';

const SignupButton = () => {
  return (
    <Link
      href={'/login'}
      className="text-sm font-semibold"
      data-cy={'header-login-link'}
    >
      회원가입/로그인
    </Link>
  );
};

export default SignupButton;
