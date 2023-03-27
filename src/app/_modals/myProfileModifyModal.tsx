'use client';
import { useMe } from '@/hooks/useMe';
import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';
import { Avatar } from '../_common/avatar';

import styles from './myProfileModifyModal.module.scss';

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
}

interface FormData {
  nickname: string;
  description: string;
}
type NameType = 'default' | 'nickname';

export const MyProfileModifyModal = ({ modalIsOpen, setIsOpen }: Props) => {
  const [nameType, setNameType] = useState<NameType>('default');
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
    setValue,
  } = useForm<FormData>();

  const { me, isLoading } = useMe();
  function closeModal() {
    setIsOpen(false);
  }

  const PreventEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      const text = watch().description;
      if (text[text.length - 1] == '\n') event.preventDefault(); // 엔터 2번이상 입력 막기
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data, nameType);
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
                <Avatar src={me?.profile.avatar} />
              </div>
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
                  checked={nameType === 'default'}
                  onClick={() => setNameType('default')}
                  readOnly
                />
                <label htmlFor="userNameDefault">기본</label>
                <input
                  type="radio"
                  name="userNameType"
                  id={'userNameNickName'}
                  value="default"
                  checked={nameType === 'nickname'}
                  readOnly
                  onClick={() => setNameType('nickname')}
                />
                <label htmlFor="userNameNickName">닉네임</label>
              </div>

              {nameType === 'default' && (
                <input
                  value={me?.profile.name}
                  placeholder="한글/영어/숫자만 가능(2~8자)"
                  disabled={true}
                />
              )}
              {nameType === 'nickname' && (
                <input
                  {...register('nickname', { maxLength: 8, minLength: 2 })}
                  placeholder="한글/영어/숫자만 가능(2~8자)"
                  defaultValue={me?.profile.nickname}
                />
              )}
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
            <button
              className={`${styles.submitButton} ${
                isValid ? styles.validButton : ''
              }`}
              disabled={!isValid}
            >
              완료
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
