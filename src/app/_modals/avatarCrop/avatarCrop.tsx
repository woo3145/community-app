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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState<HTMLImageElement>();
  const [dragArea, setDragArea] = useState<DragArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  function closeModal() {
    setIsOpen(false);
  }

  // 이미지 정보 저장
  const initImage = useCallback(async () => {
    const image = await loadImage(preview);
    const imageSize = resizeImage(image);
    setImage(image);
    setImageSize(imageSize);
    setDragArea({
      x: imageSize.width / 4,
      y: imageSize.width / 4,
      width: 100,
      height: 100,
    });
  }, [preview]);

  useEffect(() => {
    initImage();
  }, [initImage]);

  const onClickCropImage = async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context || !image) return;
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    context.drawImage(image, 0, 0, imageSize.width, imageSize.height);
    const cropedImage = context.getImageData(
      dragArea.x,
      dragArea.y,
      dragArea.width,
      dragArea.height
    );
    canvas.width = cropedImage.width;
    canvas.height = cropedImage.height;
    context.putImageData(cropedImage, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const imageFile = new File([blob], 'avatar.jpeg');
      setImageFile(imageFile);
      setPreview(canvas.toDataURL());
      closeModal();
    }, 'image/jpeg');
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
