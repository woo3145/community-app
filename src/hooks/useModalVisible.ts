import { useCallback, useState } from 'react';

// 모달의 visible 상태를 관리하는 hook
export const useModalVisible = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);
  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  return { modalIsOpen, openModal, closeModal, toggleModal };
};
