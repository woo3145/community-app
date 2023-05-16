'use client';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import Link from 'next/link';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useMe } from '@/hooks/swr/useMe';
import { DeleteCommentConfirmModal } from '@/app/_modals/confirm/DeleteCommentConfirmModal';
import Skeleton from 'react-loading-skeleton';
import { useModalVisible } from '@/hooks/useModalVisible';

interface Props {
  isLoading: false;
  comment: Comment;
  isLink?: boolean; // 해당 댓글의 게시물의 링크를 연결할지
}

const PopupMenu = ({ comment }: { comment: Comment }) => {
  const { modalIsOpen: popupIsOpen, toggleModal: togglePopup } =
    useModalVisible(); // 팝업
  const { modalIsOpen, openModal, closeModal } = useModalVisible(); // deleteComment 모달

  return (
    <div>
      <IoEllipsisHorizontal onClick={togglePopup} className="cursor-pointer" />
      {popupIsOpen && (
        <div className="absolute -right-2 py-2 px-5 bg-white border border-gray-200 border-solid rounded-md">
          <div
            onClick={openModal}
            className="text-red-600 text-sm cursor-pointer"
          >
            삭제하기
          </div>
        </div>
      )}
      <DeleteCommentConfirmModal
        comment={comment}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export const CommentItem = ({
  comment,
  isLink = false,
  isLoading,
}: Props | IsLoadingProps) => {
  const { me } = useMe();

  if (isLoading) {
    return (
      <div className="px-10 pt-5">
        <div className="border-b border-solid border-gray-200">
          <div className="flex justify-between">
            <AuthorProfile isLoading={isLoading} />
          </div>

          <Skeleton width="40%" style={{ marginBottom: 12, marginTop: 12 }} />
        </div>
      </div>
    );
  }
  return (
    <div className="px-10 pt-5">
      <div className="border-b border-solid border-gray-200">
        <div className="flex justify-between">
          <AuthorProfile
            isLoading={isLoading}
            profile={comment.user?.profile}
            createAt={comment.createAt}
            size="sm"
          />
          {me && me.id == comment.userId && <PopupMenu comment={comment} />}
        </div>

        {isLink ? (
          <Link href={`/post/${comment.postId}`}>
            <div className="pt-2 pb-3 px-10">{comment.content}</div>
          </Link>
        ) : (
          <div className="pt-2 pb-3 px-10">{comment.content}</div>
        )}
      </div>
    </div>
  );
};
