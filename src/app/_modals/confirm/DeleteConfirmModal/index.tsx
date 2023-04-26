'use client';

import { Dispatch, SetStateAction } from 'react';
import ReactModal from 'react-modal';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { useDeleteComment } from '@/hooks/useDeleteComment';

import styles from './styles.module.scss';

const customStyles = {
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

export const DeleteConfirmModal = ({
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
      <div className={styles.container}>
        <div className={styles.message}>댓글을 삭제하시겠습니까?</div>
        <div className={styles.horizontalBox}>
          <div className={styles.cancelButton} onClick={closeModal}>
            취소
          </div>
          <div
            className={`${styles.deleteButton} ${
              isApiLoading ? styles.loading : ''
            }`}
            onClick={onClick}
          >
            삭제하기
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
