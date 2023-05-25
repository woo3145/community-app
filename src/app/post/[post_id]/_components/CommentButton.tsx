'use client';

import { IoChatbubbleOutline } from 'react-icons/io5';
import { useComments } from '@/hooks/swr/useComments';
import { usePostIsCommented } from '@/hooks/swr/usePostIsCommented';
import { useSession } from 'next-auth/react';

interface Props {
  postId: number;
  isCommented: boolean;
  commentCount: number;
}

// 댓글 입력칸으로 스크롤 이동하는 기능을 가짐
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

  // 댓글작성 컴포넌트로 스크롤
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
      className={`flex items-center justify-center cursor-pointer text-lg font-bold ${
        curIsCommented && 'text-primary'
      }`}
    >
      <IoChatbubbleOutline className="mr-1" />
      <span className="pt-0.5" data-cy="post-commentCount">
        {curCount}
      </span>
    </div>
  );
};
