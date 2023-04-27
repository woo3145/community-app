'use client';
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';
import { useSWRConfig } from 'swr';
import { Avatar } from '../../_components/atoms/Avatar';
import Button from '../../_components/atoms/Button';
import { AvatarCrop } from '../avatarCrop/avatarCrop';
import { toast } from 'react-toastify';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

import styles from './styles.module.scss';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useEditProfile } from '@/hooks/useEditProfile';
import { ModalHeader } from '@/app/_components/molecules/ModalHeader';
import { ModalFooter } from '@/app/_components/molecules/ModalFooter';
import { useModalVisible } from '@/hooks/useModalVisible';

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
  const {
    modalIsOpen: cropModalIsOpen,
    openModal: openCropModal,
    closeModal: closeCropModal,
  } = useModalVisible();

  const {
    preview,
    setPreview,
    imageFile,
    setImageFile,
    uploadImage,
    handleImage,
  } = useUploadImage(openCropModal);

  const [nameType, setNameType] = useState<boolean>(profile.nameType); // false: 이름, true: 닉네임
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<EditProfileFormValue>({
    defaultValues: {
      nickname: nameType && profile.nickname ? profile.nickname : profile.name,
      description: profile.description || '',
    },
    mode: 'all',
  });

  const { onSubmit, isApiLoading } = useEditProfile(
    profile,
    nameType,
    imageFile,
    uploadImage,
    closeModal
  );

  const PreventEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const text = watch().description;
      if (text[text.length - 1] == '\n') event.preventDefault(); // 엔터 2번이상 입력 막기
    }
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
        <ModalHeader title="커뮤니티 프로필" closeModal={closeModal} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.body}>
            <h3>커뮤니티 기본정보</h3>
            <p>woo3145 커뮤니티에서 사용되는 정보입니다.</p>
            <div className={styles.avatarContainer}>
              <div className={styles.avatarPreview}>
                <input
                  type="file"
                  name="image"
                  id="input-image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImage}
                />
                <label htmlFor="input-image">
                  <Avatar
                    src={preview ? preview : profile.avatar || ''}
                    size="lg"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
              </div>
              {cropModalIsOpen && preview && (
                <AvatarCrop
                  modalIsOpen={cropModalIsOpen}
                  closeModal={closeCropModal}
                  preview={preview}
                  setPreview={setPreview}
                  setImageFile={setImageFile}
                />
              )}
            </div>
            <div className={styles.nameInputBox}>
              <h4>
                이름 <span>*</span>
              </h4>

              <div className={styles.nameTypeRadioBox}>
                <input
                  type="radio"
                  name="userNameType"
                  id={'userNameDefault'}
                  value="default"
                  checked={nameType === false}
                  onClick={() => {
                    setNameType(false);
                    setValue('nickname', profile.name);
                  }}
                  readOnly
                />
                <label htmlFor="userNameDefault">기본</label>
                <input
                  type="radio"
                  name="userNameType"
                  id={'userNameNickName'}
                  value="default"
                  checked={nameType === true}
                  readOnly
                  onClick={() => {
                    setNameType(true);
                    setValue('nickname', profile.nickname || '');
                  }}
                />
                <label htmlFor="userNameNickName">닉네임</label>
              </div>

              <input
                {...register('nickname', {
                  maxLength: 8,
                  minLength: 2,
                })}
                placeholder="한글/영어/숫자만 가능(2~8자)"
                disabled={!nameType}
              />
            </div>

            <div className={styles.descriptionInputBox}>
              <h4>한줄소개</h4>
              <textarea
                onKeyDown={PreventEnter}
                {...register('description', { maxLength: 150 })}
              />
              <p>{watch().description?.length}/150</p>
            </div>
          </div>

          <ModalFooter text="완료" isValid={!isApiLoading && isValid} />
        </form>
      </div>
    </ReactModal>
  );
};
