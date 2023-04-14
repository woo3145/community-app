'use client';

import { IoChatbubbleOutline } from 'react-icons/io5';

import styles from './styles.module.scss';
import { useComments } from '@/hooks/useComments';
import { usePostIsCommented } from '@/hooks/usePostIsCommented';
import { useSession } from 'next-auth/react';

interface Props {
  postId: number;
  isCommented: boolean;
  commentCount: number;
}

export const PostCommentButton = ({
  isCommented,
  postId,
  commentCount,
}: Props) => {
  const { data: session } = useSession();

  // 클라이언트에서 댓글 수, 여부 재요청
  const { count, isLoading: isLoading_comments } = useComments(postId);
  const { isCommented: _isCommented, isLoading: isLoading_isCommented } =
    usePostIsCommented(postId, session?.user.id);

  const onClick = () => {
    const form = document.querySelector('form');
    if (!form) return;
    const absoluteTop = window.scrollY + form.getBoundingClientRect().top;
    window.scroll({
      top: absoluteTop,
      behavior: 'smooth',
    });
  };
  // 클라이언트에서 받아오기 전에는 서버 컴포넌트에서 받아온 게시물의 데이터 사용
  const curIsCommented = isLoading_isCommented ? isCommented : _isCommented;
  const curCount = isLoading_comments ? commentCount : count;
  return (
    <div
      onClick={onClick}
      className={`${styles.commentButton} ${
        curIsCommented ? styles.isCommented : ''
      }`}
    >
      <IoChatbubbleOutline />
      <span>{curCount}</span>
    </div>
  );
};
