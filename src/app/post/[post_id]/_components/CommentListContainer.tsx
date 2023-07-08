'use client';

import { CommentItem } from '@/app/_components/molecules/CommentItem/CommentItem';
import { useComments } from '@/hooks/swr/useComments';
import { EmptyCommentContainer } from './EmptyCommentContainer';

interface Props {
  postId: number;
}

export const CommentListContainer = ({ postId }: Props) => {
  const { comments, isLoading, isError } = useComments(postId);

  return (
    <div className="w-full">
      {comments.length === 0 &&
        isLoading &&
        [1, 2, 3, 4].map((i) => {
          return <CommentItem key={i} isLoading={isLoading} />;
        })}

      {!isLoading && comments.length === 0 && <EmptyCommentContainer />}

      {comments.map((comment, idx) => {
        return (
          <CommentItem
            dataCy={`comment-${idx}`}
            isLoading={false}
            key={idx}
            comment={comment}
          />
        );
      })}
    </div>
  );
};
