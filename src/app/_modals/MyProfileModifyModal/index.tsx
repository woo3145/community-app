'use client';
import ReactModal from 'react-modal';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import { EditMyProfileForm } from '@/app/_components/forms/EditProfileForm';

import { ModalHeader } from '../ModalHeader';

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
  profile: Exclude<Profile, null>;
}

export interface EditProfileFormValue {
  nickname: string;
  description: string;
}

export const MyProfileModifyModal = ({
  modalIsOpen,
  closeModal,
  profile,
}: Props) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={true}
    >
      <div className="w-[390px] h-auto">
        <ModalHeader title="커뮤니티 프로필" closeModal={closeModal} />

        <EditMyProfileForm profile={profile} closeModal={closeModal} />
      </div>
    </ReactModal>
  );
};
