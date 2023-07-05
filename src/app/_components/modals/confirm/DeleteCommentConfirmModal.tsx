'use client';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import Button from '@/app/_components/atoms/Button';
import { Comment } from '@/interfaces/comment';
import { Modal } from '../Modal';

interface Props {
  closeModal: () => void;
  comment: Comment;
}

export const DeleteCommentConfirmModal = ({ closeModal, comment }: Props) => {
  const { isLoading, onClick } = useDeleteComment(comment, closeModal);

  return (
    <Modal onRequestClose={closeModal} shouldCloseOnOverlayClick={false}>
      <div className="mx-auto w-[390px] h-auto" data-cy="deleteComment-modal">
        <div className="py-5 text-2xl font-bold text-center">
          댓글을 삭제하시겠습니까?
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            onClick={closeModal}
            theme="cancel"
            text="취소"
            isWide
            uiSize="lg"
            isValid={!isLoading}
            dataCy="deleteComment-modal-cancel"
          />
          <Button
            type="button"
            onClick={onClick}
            theme="warning"
            text="삭제하기"
            isWide
            uiSize="lg"
            isValid={!isLoading}
            dataCy="deleteComment-modal-confirm"
          />
        </div>
      </div>
    </Modal>
  );
};
