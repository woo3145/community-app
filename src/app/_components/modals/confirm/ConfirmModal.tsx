'use client';
import Button from '@/app/_components/atoms/Button';
import { Modal } from '../Modal';

interface Props {
  message: string;
  isLoading: boolean;
  closeModal: () => void;
  onSubmit: () => void;
}

export const ConfirmModal = ({
  message,
  isLoading,
  onSubmit,
  closeModal,
}: Props) => {
  return (
    <Modal onRequestClose={closeModal} shouldCloseOnOverlayClick={false}>
      <div className="mx-auto w-[390px] h-auto" data-cy="deleteComment-modal">
        <div className="py-5 text-2xl font-bold text-center">{message}</div>
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
            onClick={onSubmit}
            theme="warning"
            text="확인"
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

export default ConfirmModal;
