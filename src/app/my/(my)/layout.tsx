'use client';

import { Badge } from '@/app/_common/badge';
import { UserProfile } from '@/app/_common/profile/user_profile';
import { MyProfileModifyModal } from '@/app/_modals/myProfileModifyModal';
import { useMe } from '@/hooks/useMe';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { HiOutlinePencil } from 'react-icons/hi';

import styles from './layout.module.scss';

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, isLoading } = useMe();
  const { data: session, status } = useSession();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

  if (status !== 'loading' && !session) {
    redirect('/login');
  }

  if (isLoading || !me) {
    return <div>로딩 ... </div>;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.profileContainer}>
        <UserProfile profile={me.profile} size={'lg'} />
        <div className={styles.description}>한줄 소개 ..... </div>
        <div className={styles.tagSection}>
          <p>관심 주제</p>
          <div className={styles.tagList}>
            <Badge text={'개발'} />
            <Badge text={'데이터'} />
            {me.profile.interestTags.map((tag, idx) => {
              return <Badge key={idx} text={tag.title} />;
            })}
          </div>
        </div>
        <div className={styles.editButton} onClick={openModal}>
          <HiOutlinePencil />
          <span>수정하기</span>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
      {modalIsOpen && (
        <MyProfileModifyModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      )}
    </main>
  );
}
