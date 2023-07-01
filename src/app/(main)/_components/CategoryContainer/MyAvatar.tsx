import { Avatar } from '@/app/_components/atoms/Avatar';
import { useMe } from '@/hooks/swr/useMe';
import Link from 'next/link';

export const MyAvatar = () => {
  const { me, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between w-10 h-10 shrink-0">
        <Avatar isLoading={isLoading} />
      </div>
    );
  }

  if (!me || !me.profile) {
    return (
      <Link
        href="/login"
        className="flex items-center justify-between w-10 h-10 shrink-0"
      >
        <Avatar src="" />
      </Link>
    );
  }

  return (
    <Link
      href="/my"
      className="flex items-center justify-between w-10 h-10 shrink-0"
    >
      <Avatar src={me.profile.avatar} />
    </Link>
  );
};
