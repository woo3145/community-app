import { useState } from 'react';

export const useModalVisible = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return { modalIsOpen, openModal, closeModal, toggleModal };
};
