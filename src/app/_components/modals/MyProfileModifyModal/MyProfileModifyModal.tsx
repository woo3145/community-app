'use client';

import { ModalHeader } from '../ModalHeader';
import { EditProfileForm } from '@/app/_components/forms/EditProfileForm';
import { Profile } from '@/interfaces/user';
import { Modal } from '../Modal';

interface Props {
  closeModal: () => void;
  profile: Profile;
}

export interface EditProfileFormValue {
  nickname: string;
  description: string;
}

export const MyProfileModifyModal = ({ closeModal, profile }: Props) => {
  return (
    <Modal onRequestClose={closeModal} shouldCloseOnOverlayClick={false}>
      <ModalHeader title="커뮤니티 프로필" closeModal={closeModal} />
      <EditProfileForm profile={profile} closeModal={closeModal} />
    </Modal>
  );
};
