import { signOut } from 'next-auth/react';

const SignoutButton = () => {
  const onClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      signOut();
    }
  };
  return (
    <div
      onClick={onClick}
      className="text-sm font-semibold text-red-500 cursor-pointer"
      data-cy={'header-signout-button'}
    >
      로그아웃
    </div>
  );
};

export default SignoutButton;
