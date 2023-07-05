'use client';
import Button from '@/app/_components/atoms/Button';
import { useDeletePost } from '@/hooks/useDeletePost';
import { useRouter } from 'next/navigation';
import { Modal } from '../Modal';

interface Props {
  closeModal: () => void;
  postId: number;
}

export const DeletePostConfirmModal = ({ closeModal, postId }: Props) => {
  const router = useRouter();
  const callback = () => {
    closeModal();
    router.replace('/');
  };
  const { isLoading, onClick } = useDeletePost(postId, callback);

  return (
    <Modal onRequestClose={closeModal} shouldCloseOnOverlayClick={false}>
      <div className="mx-auto w-[390px] h-auto" data-cy="deletePost-modal">
        <div className="py-5 text-2xl font-bold text-center">
          게시글을 삭제하시겠습니까?
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
            dataCy="deletePost-modal-cancel"
          />
          <Button
            type="button"
            onClick={onClick}
            theme="warning"
            text="삭제하기"
            isWide
            uiSize="lg"
            isValid={!isLoading}
            dataCy="deletePost-modal-confirm"
          />
        </div>
      </div>
    </Modal>
  );
};
