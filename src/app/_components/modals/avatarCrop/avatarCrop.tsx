'use client';
import { cropImage } from '@/libs/client/imageUtils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactModal from 'react-modal';

import { CropLayer } from './cropLayer';
import { PreviewLayer } from './previewLayer';
import { useImageCrop } from '@/hooks/useImageCrop';
import { ModalFooter } from '../ModalFooter';
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
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  onCancel: () => void;
}

export const AvatarCrop = ({
  modalIsOpen,
  closeModal,
  preview,
  setPreview,
  setImageFile,
  onCancel,
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

  // 닫기 전에 preview 되돌리기
  const cancelAndCloseModal = () => {
    onCancel();
    closeModal();
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false} // 오버레이 클릭 시 닫기 막음(오버레이로 닫으면 crop이 안되고 원본으로 저장되기 때문)
    >
      <div className="w-full min-w-[460px] max-h-[630px]">
        <ModalHeader
          title="프로필 사진 만들기"
          closeModal={cancelAndCloseModal}
        />

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

        <ModalFooter text="완료" onClick={onClickCropImage} />
      </div>
    </ReactModal>
  );
};
