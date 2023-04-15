'use client';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';
import { useSWRConfig } from 'swr';
import { Avatar } from '../_components/atoms/Avatar';
import Button from '../_components/atoms/Button';
import { AvatarCrop } from './avatarCrop/avatarCrop';

import styles from './myProfileModifyModal.module.scss';
import { toast } from 'react-toastify';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';

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
  profile: Exclude<Profile, null>;
}

interface FormData {
  nickname: string;
  description: string;
}

export const MyProfileModifyModal = ({
  modalIsOpen,
  setIsOpen,
  profile,
}: Props) => {
  const [preview, setPreview] = useState(profile.avatar || '');
  const [previewForEdit, setPreviewForEdit] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cropModalIsOpen, setCropModalIsOpen] = useState<boolean>(false);
  const openCropModal = () => {
    setCropModalIsOpen(true);
  };

  const [nameType, setNameType] = useState<boolean>(profile.nameType);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      nickname: nameType && profile.nickname ? profile.nickname : profile.name,
      description: profile.description || '',
    },
    mode: 'all',
  });

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !event.target.files[0]) {
      console.log('선택된 이미지가 없습니다.');
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setPreviewForEdit(e.target.result);
      }
    };
    openCropModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  const PreventEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const text = watch().description;
      if (text[text.length - 1] == '\n') event.preventDefault(); // 엔터 2번이상 입력 막기
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { nickname, description } = data;

      if (!nickname && nameType) {
        toast.error('닉네임을 입력해주세요.');
        return;
      }
      if (
        nameType === profile.nameType &&
        description === profile.description &&
        !imageFile
      ) {
        if (!nameType || (nameType && nickname === profile.nickname)) {
          // 변경할 내용 없음
          closeModal();
          return;
        }
      }

      // (이미지 업로드 후 url받아오기)
      let imagePath = '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const imageResponse = await (
          await fetch(`/api/upload/image`, {
            method: 'POST',
            body: formData,
          })
        ).json();

        if (imageResponse.filePath) imagePath = imageResponse.filePath;
      }

      const response = await (
        await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nameType,
            nickname,
            description,
            avatar: imagePath,
          }),
        })
      ).json();

      if (response.error) {
        toast.error('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      // 성공
      mutate('/api/me');
      toast.success('성공적으로 업데이트 되었습니다.');
      closeModal();
    } catch (e) {
      console.log('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
  });

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>커뮤니티 프로필</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            <IoCloseOutline />
          </button>
        </div>

        <form onSubmit={onSubmit}>
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
                    src={preview}
                    size="lg"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
              </div>
              {previewForEdit && (
                <AvatarCrop
                  modalIsOpen={cropModalIsOpen}
                  setIsOpen={setCropModalIsOpen}
                  previewForEdit={previewForEdit}
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

          <div className={styles.bottom}>
            <Button type="submit" text="완료" wide isValid={isValid} />
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
