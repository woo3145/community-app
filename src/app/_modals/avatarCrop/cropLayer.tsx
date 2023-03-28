'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  image?: HTMLImageElement;
  imageSize: { width: number; height: number };
}

export const CropLayer = ({ image, imageSize }: Props) => {
  const cropRef = useRef<HTMLCanvasElement>(null);
  const [dragArea, setDragArea] = useState({
    x: imageSize.width / 4,
    y: imageSize.height / 4,
    width: 100,
    height: 100,
  });

  const resetDragArea = () => {
    setDragArea({ x: 0, y: 0, width: 0, height: 0 });
  };

  // 레이어 생성
  useEffect(() => {
    if (!cropRef?.current || !imageSize) return;
    const canvas = cropRef.current;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    return () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, imageSize.width, imageSize.height);
    };
  }, [cropRef, imageSize]);

  // 배경 어둡게
  const drawBackground = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!imageSize) return;

      context.clearRect(0, 0, imageSize.width, imageSize.height);
      context.fillStyle = 'rgb(0,0,0,0.4)';
      context.fillRect(0, 0, imageSize.width, imageSize.height);
    },
    [imageSize]
  );
  // 드래그 영역 그리기
  const drawDragArea = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.clearRect(
        dragArea.x,
        dragArea.y,
        dragArea.width,
        dragArea.height
      );
    },
    [dragArea]
  );

  const drawImage = useCallback(async () => {
    const canvas = cropRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    drawBackground(context);
    drawDragArea(context);
  }, [cropRef, drawBackground, drawDragArea]);

  useEffect(() => {
    drawImage();
  }, [drawImage]);

  const onMouseDownHandler = ({
    buttons,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cropRef?.current || !setDragArea) return;
    if (buttons !== 1) return;

    resetDragArea();

    const canvas = cropRef.current;
    const canvasPosition = canvas.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    setDragArea({ x, y, width: 0, height: 0 });
  };

  const onMouseMoveHandler = ({
    buttons,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!cropRef?.current || !setDragArea) return;
    if (buttons !== 1) return;

    const canvas = cropRef.current;
    const canvasPosition = canvas.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    const width = x - dragArea.x;
    const height = y - dragArea.y;

    const quadrate = width < height ? width : height; // 박스를 벗어나지 못하도록 더 적게 드래그 된 방향의 길이로 정사각형 크기 생성
    console.log(quadrate);
    setDragArea((area) => ({
      ...area,
      width: 0 <= quadrate ? quadrate : 0, // 반대로 드래그하면 반대방향으로 드래그 영역이 생기기 때문에 반대방향 드래그 막아놈
      height: 0 <= quadrate ? quadrate : 0,
    }));
  };

  return (
    <canvas
      ref={cropRef}
      style={{
        position: 'absolute',
        cursor: 'crosshair',
        top: 0,
      }}
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
    />
  );
};
