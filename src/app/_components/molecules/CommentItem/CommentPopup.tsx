import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import { useModalVisible } from '@/hooks/useModalVisible';
import { Comment } from '@/interfaces/comment';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import ConfirmModal from '../../modals/confirm/ConfirmModal';

export const PopupMenu = ({
  comment,
  dataCy,
}: {
  comment: Comment;
  dataCy?: string;
}) => {
  const popupRef = useRef<HTMLUListElement>(null);
  const {
    modalIsOpen: popupIsOpen,
    toggleModal: togglePopup,
    closeModal: closePopup,
  } = useModalVisible(); // 팝업

  // Delete 관련
  const {
    modalIsOpen: deleteModalIsOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModalVisible(); // deleteComment 모달
  const { onClick: onDelete, isLoading: onDeleteLoading } = useDeleteComment(
    comment,
    closeDeleteModal
  );

  // 팝업이 열리면 다른 곳을 누르면 해당 팝업이 꺼지는 이벤트 핸들러 등록
  // 팝업이 닫히면 이벤트 핸들러 제거
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    if (popupIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup, popupIsOpen]);

  return (
    <div>
      <IoEllipsisHorizontal
        onClick={togglePopup}
        className="cursor-pointer"
        data-cy={`${dataCy}-popup-openButton`}
      />
      {popupIsOpen && (
        <ul
          ref={popupRef}
          className="absolute z-30 bg-white border border-gray-200 border-solid rounded-md -right-2"
        >
          <li
            onClick={openDeleteModal}
            className="px-5 py-1 text-sm text-red-600 border-b cursor-pointer hover:bg-gray-100"
            data-cy={`${dataCy}-popup-deleteButton`}
          >
            삭제하기
          </li>
        </ul>
      )}
      {deleteModalIsOpen && (
        <ConfirmModal
          message="댓글을 삭제하시겠습니까?"
          closeModal={closeDeleteModal}
          isLoading={onDeleteLoading}
          onSubmit={onDelete}
        />
      )}
    </div>
  );
};
