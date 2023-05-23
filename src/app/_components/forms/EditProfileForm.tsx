'use client';

import { AvatarCrop } from '@/app/_components/modals/avatarCrop/avatarCrop';
import { useModalVisible } from '@/hooks/useModalVisible';
import { useUploadImage } from '@/hooks/useUploadImage';
import { useState } from 'react';
import { EditProfileFormValue } from '@/app/_components/modals/MyProfileModifyModal';
import { useForm } from 'react-hook-form';
import { useEditProfile } from '@/hooks/useEditProfile';
import { Avatar } from '@/app/_components/atoms/Avatar';

import { ModalFooter } from '@/app/_components/modals/ModalFooter';
import InputField from '../atoms/InputField';
import { Profile } from '@/interfaces/user';

interface Props {
  profile: Profile;
  closeModal: () => void;
}

export const EditProfileForm = ({ profile, closeModal }: Props) => {
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
    resetImage,
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

  // 취소하면 원래 유저 프로필 이미지로 preview 초기화
  const onCancel = () => {
    resetImage(profile.avatar);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-2">
        <h3 className="text-lg font-bold">커뮤니티 기본정보</h3>
        <p className="text-sm text-gray-500">
          woo3145 커뮤니티에서 사용되는 정보입니다.
        </p>
        <div className="flex items-center justify-center py-7">
          <div className="w-24 h-24">
            <input
              type="file"
              name="image"
              id="input-image"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
            <label htmlFor="input-image" className="cursor-pointer">
              <Avatar
                src={preview ? preview : profile.avatar || ''}
                uiSize="lg"
                className="cursor-pointer"
              />
            </label>
          </div>
          {cropModalIsOpen && preview !== profile.avatar && (
            <AvatarCrop
              modalIsOpen={cropModalIsOpen}
              closeModal={closeCropModal}
              preview={preview}
              setPreview={setPreview}
              setImageFile={setImageFile}
              onCancel={onCancel}
            />
          )}
        </div>
        <div className="mb-8">
          <h4 className="mb-2 text-sm font-bold text-gray-400">
            이름 <span className="text-red-600">*</span>
          </h4>

          <div className="flex items-center mb-3">
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
              className="w-5 h-5 m-0"
            />
            <label htmlFor="userNameDefault" className="pl-2 mr-3 text-sm">
              기본
            </label>
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
              className="w-5 h-5 m-0"
            />
            <label htmlFor="userNameNickName" className="pl-2 text-sm">
              닉네임
            </label>
          </div>
          <InputField
            id="nickname"
            type="text"
            placeholder="한글/영어/숫자만 가능(2~8자)"
            dataCy="editProfileName-password-input"
            {...register('nickname', {
              maxLength: 8,
              minLength: 2,
            })}
            disabled={!nameType}
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-bold text-gray-400">한줄소개</h4>
          <textarea
            {...register('description', { maxLength: 150 })}
            className="w-full h-[140px] resize-none card p-3 outline-1 outline-primary"
            placeholder="간단한 자기소개 글을 작성해 주세요."
          />
          <p className="text-sm text-right text-gray-400">
            {watch().description?.length}/150
          </p>
        </div>
      </div>

      <ModalFooter text="완료" isValid={!isApiLoading && isValid} />
    </form>
  );
};
