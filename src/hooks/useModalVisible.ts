import { useState } from 'react';

export const useModalVisible = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return { modalIsOpen, openModal, closeModal };
};
