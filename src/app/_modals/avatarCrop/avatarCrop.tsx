'use client';
import { cropImage } from '@/libs/client/imageUtils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

import styles from './avatarCrop.module.scss';
import { CropLayer } from './cropLayer';
import { PreviewLayer } from './previewLayer';
import { useImageCrop } from '@/hooks/useImageCrop';

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
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}

export const AvatarCrop = ({
  modalIsOpen,
  setIsOpen,
  preview,
  setPreview,
  setImageFile,
}: Props) => {
  const { image, imageSize, dragArea, setDragArea, initImage } =
    useImageCrop(preview);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    initImage();
  }, [initImage]);

  const onClickCropImage = async () => {
    if (!image) return;
    const croppedImage = await cropImage(image, imageSize, dragArea);
    if (!croppedImage) return;
    const imageFile = new File([croppedImage], 'avatar.jpeg');
    setImageFile(imageFile);
    setPreview(URL.createObjectURL(croppedImage));
    closeModal();
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
        <div className={styles.header}>
          <h2 className={styles.title}>프로필 사진 만들기</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            <IoCloseOutline />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.canvasContainer}>
            <PreviewLayer image={image} imageSize={imageSize} />
            <CropLayer
              imageSize={imageSize}
              dragArea={dragArea}
              setDragArea={setDragArea}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <button className={styles.submitButton} onClick={onClickCropImage}>
            완료
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
