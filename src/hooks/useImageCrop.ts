import { cropImage, loadImage, resizeImage } from '@/libs/client/imageUtils';
import { useCallback, useState } from 'react';

export interface ImageSize {
  width: number;
  height: number;
}

// 크롭할 이미지에 관련된 상태와 함수를 관리하는 hook
export const useImageCrop = (preview: string) => {
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 0,
    height: 0,
  });
  const [image, setImage] = useState<HTMLImageElement>();
  const [dragArea, setDragArea] = useState<DragArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // 이미지를 불러오고 이미지 사이즈에 맞게 드래그 레이어 크기를 설정함
  const initImage = useCallback(async () => {
    const image = await loadImage(preview);
    const imageSize = resizeImage(image);
    setImage(image);
    setImageSize(imageSize);
    const minLength = Math.min(imageSize.width, imageSize.height);
    setDragArea({
      x: 0,
      y: 0,
      width: minLength,
      height: minLength,
    });
  }, [preview]);

  // 현재 상태로 이미지를 crop하고 이미지 파일을 반환
  const crop = useCallback(async () => {
    if (!image) return null;
    const croppedImage = await cropImage(image, imageSize, dragArea);
    if (!croppedImage) return null;
    const imageFile = new File([croppedImage], 'avatar.jpeg');

    return imageFile;
  }, [dragArea, image, imageSize]);

  return { image, imageSize, dragArea, setDragArea, initImage, crop };
};
