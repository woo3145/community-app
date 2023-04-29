'use client';

import { useToggleLike } from '@/hooks/useToggleLike';
import { useSession } from 'next-auth/react';
import { AiOutlineLike } from 'react-icons/ai';
import { usePostLikeCount } from '@/hooks/swr/usePostLikeCount';
import { usePostIsLiked } from '@/hooks/swr/usePostIsLiked';

import styles from './styles.module.scss';

interface Props {
  postId: number;
  isLiked: boolean;
  likeCount: number;
}

export const PostLikeButton = ({ postId, isLiked, likeCount }: Props) => {
  const { data: session } = useSession();

  // 클라이언트에서 좋아요 수, 여부 재요청
  const { likeCount: _likeCount, isLoading: isLoading_count } =
    usePostLikeCount(postId);
  const { isLiked: _isLiked, isLoading: isLoading_isLiked } = usePostIsLiked(
    postId,
    session?.user.id
  );

  // 클라이언트에서 받아오기 전에는 서버 컴포넌트에서 받아온 게시물의 데이터 사용
  const curIsLiked = isLoading_isLiked ? isLiked : _isLiked;
  const curLikeCount = isLoading_count ? likeCount : _likeCount;

  const { onClick } = useToggleLike(postId, curIsLiked);

  return (
    <div
      onClick={onClick}
      className={`${styles.likeButton} ${curIsLiked ? styles.isLiked : ''}`}
    >
      <AiOutlineLike />
      <span>{curLikeCount}</span>
    </div>
  );
};
