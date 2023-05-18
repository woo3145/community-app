'use client';

import { CreateCommentForm } from '@/app/_components/forms/CreateCommentForm';
import { CommentItem } from '@/app/_components/molecules/CommentItem';
import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';
import { useComments } from '@/hooks/swr/useComments';
import { IoChatbubbleOutline } from 'react-icons/io5';

interface Props {
  postId: number;
}

interface CreateCommentForm {
  content: string;
}

const EmptyCommentMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="mb-3 text-6xl text-primary" />
      <p className="text-sm text-gray-500">첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export const CommentListContainer = ({ postId }: Props) => {
  const { comments, isLoading, isError } = useComments(postId);

  return (
    <div className="w-full">
      {comments.length === 0 &&
        isLoading &&
        [1, 2, 3, 4].map((i) => {
          return <CommentItem key={i} isLoading={isLoading} />;
        })}

      {!isLoading && comments.length === 0 && <EmptyCommentMessage />}

      {comments.map((comment, idx) => {
        return <CommentItem isLoading={false} key={idx} comment={comment} />;
      })}
    </div>
  );
};
