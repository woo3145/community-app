'use client';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { useMe } from '@/hooks/swr/useMe';
import { PopupMenu } from './CommentPopup';
import { CommentSkeleton } from './CommentSkeleton';
import { CommentContent } from './CommentContent';
import { Comment } from '@/interfaces/comment';

interface Props {
  isLoading: boolean;
  comment?: Comment;
  isLink?: boolean; // 해당 댓글의 게시물의 링크를 연결할지
  dataCy?: string;
}

export const CommentItem = ({
  comment,
  isLink = false,
  isLoading,
  dataCy,
}: Props) => {
  const { me } = useMe();
  if (isLoading || !comment) {
    return <CommentSkeleton />;
  }

  return (
    <div className="px-10 pt-5" data-cy={dataCy}>
      <div className="relative border-b border-gray-200 border-solid">
        <div className="flex justify-between">
          <AuthorProfile
            isLoading={isLoading}
            profile={comment.user?.profile}
            createAt={comment.createAt}
            size="sm"
          />
          {me && me.id == comment.userId && (
            <PopupMenu comment={comment} dataCy={dataCy} />
          )}
        </div>
        <CommentContent comment={comment} isLink={isLink} />
      </div>
    </div>
  );
};
