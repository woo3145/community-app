import { loadImage, resizeImage } from '@/libs/client/imageUtils';
import { useCallback, useState } from 'react';

export interface ImageSize {
  width: number;
  height: number;
}

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

  // 이미지 정보 저장
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

  return { image, imageSize, dragArea, setDragArea, initImage };
};
