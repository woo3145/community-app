import { IoChatbubbleOutline } from 'react-icons/io5';

export const EmptyPostContainer = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      data-cy="empty-post-container"
    >
      <IoChatbubbleOutline className="mb-3 text-6xl text-primary" />
      <p className="text-sm text-gray-500">등록된 게시물이 없습니다.</p>
      <p className="text-sm text-gray-500">첫번째 게시물을 작성해 보세요!</p>
    </div>
  );
};
