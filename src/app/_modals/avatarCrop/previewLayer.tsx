'use client';
import { useEffect } from 'react';

interface Props {
  image?: HTMLImageElement;
  imageSize: { width: number; height: number };
}

export const PreviewLayer = ({ image, imageSize }: Props) => {
  const drawImage = (canvas: HTMLCanvasElement | null) => {
    if (!image || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    // 벡터 이미지를 위한 배경
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(0, 0, imageSize.width, imageSize.height);

    context.drawImage(image, 0, 0, imageSize.width, imageSize.height);
  };

  const refCallback = (canvas: HTMLCanvasElement) => {
    if (canvas) {
      drawImage(canvas);
    }
  };

  useEffect(() => {
    return () => {
      if (!image) return;
      URL.revokeObjectURL(image.src);
    };
  }, [image]);

  return <canvas ref={refCallback} className="block" />;
};
