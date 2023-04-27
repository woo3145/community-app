'use client';
import { cropImage } from '@/libs/client/imageUtils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactModal from 'react-modal';

import styles from './avatarCrop.module.scss';
import { CropLayer } from './cropLayer';
import { PreviewLayer } from './previewLayer';
import { useImageCrop } from '@/hooks/useImageCrop';
import { ModalHeader } from '@/app/_components/molecules/ModalHeader';
import { ModalFooter } from '@/app/_components/molecules/ModalFooter';

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
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}

export const AvatarCrop = ({
  modalIsOpen,
  closeModal,
  preview,
  setPreview,
  setImageFile,
}: Props) => {
  const { image, imageSize, dragArea, setDragArea, initImage } =
    useImageCrop(preview);

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
        <ModalHeader title="프로필 사진 만들기" closeModal={closeModal} />

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

        <ModalFooter text="완료" onClick={onClickCropImage} />
      </div>
    </ReactModal>
  );
};
