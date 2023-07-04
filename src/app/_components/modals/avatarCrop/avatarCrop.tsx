'use client';
import { cropImage } from '@/libs/client/imageUtils';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { CropLayer } from './cropLayer';
import { PreviewLayer } from './previewLayer';
import { useImageCrop } from '@/hooks/useImageCrop';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { Modal } from '../Modal';

interface Props {
  closeModal: () => void;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  onCancel: () => void;
}

export const AvatarCrop = ({
  closeModal,
  preview,
  setPreview,
  setImageFile,
  onCancel,
}: Props) => {
  const { image, imageSize, dragArea, setDragArea, initImage, crop } =
    useImageCrop(preview);

  useEffect(() => {
    initImage();
  }, [initImage]);

  const onClickCropImage = async () => {
    const imageFile = await crop();
    if (imageFile) {
      setImageFile(imageFile);
      setPreview(URL.createObjectURL(imageFile));
    }
    closeModal();
  };

  // 닫기 전에 preview 되돌리기
  const cancelAndCloseModal = () => {
    onCancel();
    closeModal();
  };

  return (
    <Modal
      onRequestClose={cancelAndCloseModal}
      shouldCloseOnOverlayClick={false} // 오버레이 클릭 시 닫기 막음(오버레이로 닫으면 crop이 안되고 원본으로 저장되기 때문)
    >
      <ModalHeader
        title="프로필 사진 만들기"
        closeModal={cancelAndCloseModal}
      />
      <div className="w-full min-w-[460px] max-h-[630px]" data-cy="crop-modal">
        <div className="py-2">
          <div className="relative flex items-center justify-center bg-black">
            <PreviewLayer image={image} imageSize={imageSize} />
            <CropLayer
              imageSize={imageSize}
              dragArea={dragArea}
              setDragArea={setDragArea}
            />
          </div>
        </div>
      </div>
      <ModalFooter
        text="완료"
        onClick={onClickCropImage}
        buttonDataCy="crop-button"
      />
    </Modal>
  );
};
