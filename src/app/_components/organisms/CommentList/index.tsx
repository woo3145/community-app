'use client';

import { useComments } from '@/hooks/swr/useComments';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { CommentItem } from '../../molecules/CommentItem';
import { CreateCommentForm } from '../../forms/CreateCommentForm';
import { MyProfile } from '../../molecules/profile/MyProfile';

interface Props {
  postId: number;
}

interface CreateCommentForm {
  content: string;
}

const EmptyCommentMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="text-6xl mb-3 text-primary" />
      <p className="text-sm text-gray-500">첫 댓글을 남겨주세요.</p>
    </div>
  );
};

export const CommentList = ({ postId }: Props) => {
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

      <div className="mt-3 py-2 px-10">
        <div className="mb-3">
          <MyProfile />
        </div>
        <div className="relative">
          <CreateCommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
};
