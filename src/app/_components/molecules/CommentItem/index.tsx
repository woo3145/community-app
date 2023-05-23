'use client';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { useMe } from '@/hooks/swr/useMe';
import { PopupMenu } from './CommentPopup';
import { CommentSkeleton } from './CommentSkeleton';
import { CommentContent } from './CommentContent';
import { Comment } from '@/interfaces/comment';

interface Props {
  isLoading: false;
  comment: Comment;
  isLink?: boolean; // 해당 댓글의 게시물의 링크를 연결할지
}

export const CommentItem = ({
  comment,
  isLink = false,
  isLoading,
}: Props | IsLoadingProps) => {
  const { me } = useMe();

  if (isLoading) {
    return <CommentSkeleton />;
  }
  return (
    <div className="px-10 pt-5">
      <div className="relative border-b border-gray-200 border-solid">
        <div className="flex justify-between">
          <AuthorProfile
            isLoading={isLoading}
            profile={comment.user?.profile}
            createAt={comment.createAt}
            size="sm"
          />
          {me && me.id == comment.userId && <PopupMenu comment={comment} />}
        </div>
        <CommentContent comment={comment} isLink={isLink} />
      </div>
    </div>
  );
};
