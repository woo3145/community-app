'use client';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  image?: HTMLImageElement;
  imageSize: { width: number; height: number };
}

export const PreviewLayer = ({ image, imageSize }: Props) => {
  const previewRef = useRef<HTMLCanvasElement>(null);

  const drawImage = useCallback(async () => {
    if (!image) return;
    const canvas = previewRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    console.log('Preview Draw');
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    context.drawImage(image, 0, 0, imageSize.width, imageSize.height);
  }, [image, imageSize, previewRef]);

  useEffect(() => {
    drawImage();
  }, [drawImage]);

  return <canvas ref={previewRef} style={{ display: 'block' }} />;
};
