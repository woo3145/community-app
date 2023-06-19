'use client';
import React, { MouseEvent, useCallback, useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  onRequestClose: () => void;
}

export const Modal = ({
  children,
  shouldCloseOnOverlayClick = true,
  onRequestClose,
}: Props) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  const onOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!shouldCloseOnOverlayClick) return;
      if (e.target === overlay.current || e.target === wrapper.current) {
        closeModal();
      }
    },
    [closeModal, shouldCloseOnOverlayClick, overlay, wrapper]
  );

  // 모달창 존재 시 body 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        left:0;
        overflow-y: scroll;
        width: 100%;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div
      ref={overlay}
      onClick={onOverlayClick}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 mx-auto bg-black/40"
    >
      <div
        ref={wrapper}
        className="w-full h-full px-6 bg-white rounded-md shadow-md xl:py-12 py-14 xl:w-auto xl:h-auto xl:rounded-md xl:-translate-y-1/2 xl:-translate-x-1/2 xl:absolute left-1/2 top-1/2"
      >
        {children}
      </div>
    </div>
  );
};
