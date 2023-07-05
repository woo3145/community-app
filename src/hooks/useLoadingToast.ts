import { useCallback, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';

// API호출에 대한 로딩 상태와 toast알림을 관리하는 hook
export const useLoadingToast = () => {
  const toastId = useRef<Id>();

  const showLoadingToast = useCallback((message?: string) => {
    const id = toast.loading(message ? message : '처리중 입니다.');
    toastId.current = id;
  }, []);

  const removeLoadingToast = useCallback(() => {
    if (toastId.current !== undefined) {
      toast.dismiss(toastId.current);
      toastId.current = undefined;
    }
  }, []);

  return { showLoadingToast, removeLoadingToast };
};
