'use client';
import { loadImage, resizeImage } from '@/libs/client/imageUtils';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

import styles from './avatarCrop.module.scss';
import { CropLayer } from './cropLayer';
import { PreviewLayer } from './previewLayer';

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
  previewForEdit: string;
  setPreviewForEdit: Dispatch<SetStateAction<string>>;
}

export const AvatarCrop = ({
  modalIsOpen,
  setIsOpen,
  previewForEdit,
  setPreviewForEdit,
}: Props) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState<HTMLImageElement>();

  function closeModal() {
    setIsOpen(false);
  }

  // 이미지 정보 저장
  const initImage = useCallback(async () => {
    const image = await loadImage(previewForEdit);
    const imageSize = resizeImage(image);
    setImage(image);
    setImageSize(imageSize);
  }, [previewForEdit]);

  useEffect(() => {
    initImage();
  }, [initImage]);

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
          <h2 className={styles.title}>프로필 사진 만들기</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.canvasContainer}>
            <PreviewLayer image={image} imageSize={imageSize} />
            <CropLayer image={image} imageSize={imageSize} />
          </div>
        </div>

        <div className={styles.bottom}>
          <button className={styles.submitButton}>완료</button>
        </div>
      </div>
    </ReactModal>
  );
};
