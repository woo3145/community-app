'use client';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import Link from 'next/link';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useMe } from '@/hooks/swr/useMe';
import { DeleteCommentConfirmModal } from '@/app/_components/modals/confirm/DeleteCommentConfirmModal';
import Skeleton from 'react-loading-skeleton';
import { useModalVisible } from '@/hooks/useModalVisible';
import { useEffect } from 'react';

interface Props {
  isLoading: false;
  comment: Comment;
  isLink?: boolean; // 해당 댓글의 게시물의 링크를 연결할지
}

const PopupMenu = ({ comment }: { comment: Comment }) => {
  const {
    modalIsOpen: popupIsOpen,
    toggleModal: togglePopup,
    closeModal: closePopup,
  } = useModalVisible(); // 팝업
  const { modalIsOpen, openModal, closeModal } = useModalVisible(); // deleteComment 모달

  // 팝업이 열리면 다른 곳을 누르면 해당 팝업이 꺼지는 이벤트 핸들러 등록
  // 팝업이 닫히면 이벤트 핸들러 제거
  useEffect(() => {
    if (!popupIsOpen) return;
    document.addEventListener('click', closePopup);

    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, [closePopup, popupIsOpen]);

  return (
    <div>
      <IoEllipsisHorizontal onClick={togglePopup} className="cursor-pointer" />
      {popupIsOpen && (
        <div>
          <div className="absolute z-30 px-5 py-2 bg-white border border-gray-200 border-solid rounded-md -right-2">
            <div
              onClick={openModal}
              className="text-sm text-red-600 cursor-pointer"
            >
              삭제하기
            </div>
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
        <div className="border-b border-gray-200 border-solid">
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

        {isLink ? (
          <Link href={`/post/${comment.postId}`}>
            <div className="px-10 pt-2 pb-3 whitespace-pre-line">
              {comment.content}
            </div>
          </Link>
        ) : (
          <div className="px-10 pt-2 pb-3 whitespace-pre-line">
            {comment.content}
          </div>
        )}
      </div>
    </div>
  );
};
