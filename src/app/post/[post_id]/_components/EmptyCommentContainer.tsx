import { IoChatbubbleOutline } from 'react-icons/io5';

export const EmptyCommentContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <IoChatbubbleOutline className="mb-3 text-6xl text-primary" />
      <p className="text-sm text-gray-500">첫 댓글을 남겨주세요.</p>
    </div>
  );
};
