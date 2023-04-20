'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import ReactModal from 'react-modal';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

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
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  comment: Comment;
}

export const DeleteConfirmModal = ({
  modalIsOpen,
  setIsOpen,
  comment,
}: Props) => {
  const { mutate } = useSWRConfig();
  const [apiLoading, setApiLoading] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const onClickDeleteComment = async () => {
    if (apiLoading) return;

    const toastId = toast.loading('처리중 입니다.');
    setApiLoading(true);
    const response = await (
      await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
      })
    ).json();

    if (response.error) {
      toast.error('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
      toast.dismiss(toastId);
      setApiLoading(false);
      return;
    }
    // 성공
    toast.dismiss(toastId);
    setApiLoading(false);
    toast.success('성공적으로 업데이트 되었습니다.');
    mutate(`/api/posts/${comment.postId}/comments`);
    closeModal();
  };

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
              apiLoading ? styles.loading : ''
            }`}
            onClick={onClickDeleteComment}
          >
            삭제하기
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
