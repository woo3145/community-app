import { IoEllipsisHorizontal } from 'react-icons/io5';
import { DeleteCommentConfirmModal } from '../../modals/confirm/DeleteCommentConfirmModal';
import { useEffect } from 'react';
import { useModalVisible } from '@/hooks/useModalVisible';
import { Comment } from '@/interfaces/comment';

export const PopupMenu = ({
  comment,
  dataCy,
}: {
  comment: Comment;
  dataCy?: string;
}) => {
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
      <IoEllipsisHorizontal
        onClick={togglePopup}
        className="cursor-pointer"
        data-cy={`${dataCy}-popup-openButton`}
      />
      {popupIsOpen && (
        <div>
          <div className="absolute z-30 px-5 py-2 bg-white border border-gray-200 border-solid rounded-md -right-2">
            <div
              onClick={openModal}
              className="text-sm text-red-600 cursor-pointer"
              data-cy={`${dataCy}-popup-deleteButton`}
            >
              삭제하기
            </div>
          </div>
        </div>
      )}
      {modalIsOpen && (
        <DeleteCommentConfirmModal comment={comment} closeModal={closeModal} />
      )}
    </div>
  );
};
