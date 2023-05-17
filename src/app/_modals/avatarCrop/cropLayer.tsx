'use client';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  imageSize: { width: number; height: number };
  dragArea: DragArea;
  setDragArea: Dispatch<SetStateAction<DragArea>>;
}

export const CropLayer = ({ imageSize, dragArea, setDragArea }: Props) => {
  // 드래그 영역 초기화
  const resetDragArea = () => {
    setDragArea({ x: 0, y: 0, width: 0, height: 0 });
  };

  // 배경 어둡게
  const drawBackground = (context: CanvasRenderingContext2D) => {
    if (!imageSize) return;

    context.clearRect(0, 0, imageSize.width, imageSize.height);
    context.fillStyle = 'rgb(0,0,0,0.4)';
    context.fillRect(0, 0, imageSize.width, imageSize.height);
  };

  // 드래그 영역 그리기
  const drawDragArea = (context: CanvasRenderingContext2D) => {
    context.clearRect(dragArea.x, dragArea.y, dragArea.width, dragArea.height);
  };

  const drawImage = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    drawBackground(context);
    drawDragArea(context);
  };

  const refCallback = (canvas: HTMLCanvasElement) => {
    if (canvas) {
      drawImage(canvas);
    }
  };

  const onMouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { buttons, clientX, clientY } = e;

    if (!setDragArea) return;
    if (buttons !== 1) return;

    resetDragArea();

    const canvasPosition = e.currentTarget.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    setDragArea({ x, y, width: 0, height: 0 });
  };

  const onMouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { buttons, clientX, clientY } = e;

    if (!setDragArea) return;
    if (buttons !== 1) return;

    const canvasPosition = e.currentTarget.getBoundingClientRect();

    const x = clientX - canvasPosition.x;
    const y = clientY - canvasPosition.y;

    const width = x - dragArea.x;
    const height = y - dragArea.y;

    const quadrate = width < height ? width : height; // 박스를 벗어나지 못하도록 더 적게 드래그 된 방향의 길이로 정사각형 크기 생성

    setDragArea((area) => ({
      ...area,
      width: 0 <= quadrate ? quadrate : 0, // 반대로 드래그하면 반대방향으로 드래그 영역이 생기기 때문에 반대방향 드래그 막아놈
      height: 0 <= quadrate ? quadrate : 0,
    }));
  };

  return (
    <canvas
      ref={refCallback}
      className="absolute top-0 cursor-crosshair"
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
    />
  );
};
