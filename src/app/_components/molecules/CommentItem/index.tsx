'use client';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useMe } from '@/hooks/swr/useMe';
import { useState } from 'react';
import { DeleteConfirmModal } from '@/app/_modals/confirm/DeleteConfirmModal';

interface Props {
  comment: Comment;
  isLink?: boolean; // 해당 댓글의 게시물의 링크를 연결할지
}

const PopupMenu = ({ comment }: { comment: Comment }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.popupMenu}>
      <IoEllipsisHorizontal
        onClick={() => setIsOpen(!isOpen)}
        className={styles.icon}
      />
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.bubblePoint}></div>
          <div onClick={() => setModalIsOpen(true)}>삭제하기</div>
        </div>
      )}
      <DeleteConfirmModal
        comment={comment}
        modalIsOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export const CommentItem = ({ comment, isLink = false }: Props) => {
  const { me } = useMe();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <AuthorProfile
            profile={comment.user?.profile}
            createAt={comment.createAt}
            size="sm"
          />
          {me && me.id == comment.userId && <PopupMenu comment={comment} />}
        </div>

        {isLink ? (
          <Link href={`/post/${comment.postId}`}>
            <div className={styles.content}>{comment.content}</div>
          </Link>
        ) : (
          <div className={styles.content}>{comment.content}</div>
        )}
      </div>
    </div>
  );
};
