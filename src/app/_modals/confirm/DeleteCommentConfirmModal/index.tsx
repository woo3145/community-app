'use client';
import ReactModal from 'react-modal';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import Button from '@/app/_components/atoms/Button';

const customStyles: ReactModal.Styles = {
  overlay: {
    zIndex: 30,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  comment: Comment;
}

export const DeleteCommentConfirmModal = ({
  modalIsOpen,
  closeModal,
  comment,
}: Props) => {
  const { isApiLoading, onClick } = useDeleteComment(comment, closeModal);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="w-[390px] h-auto">
        <div className="text-2xl font-bold py-5 text-center">
          댓글을 삭제하시겠습니까?
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            onClick={closeModal}
            theme="cancel"
            text="취소"
            wide
            size="lg"
          />
          <Button
            type="button"
            onClick={onClick}
            theme="warning"
            text="삭제하기"
            wide
            size="lg"
            isValid={!isApiLoading}
          />
        </div>
      </div>
    </ReactModal>
  );
};
