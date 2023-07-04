import { useState } from 'react';
import { Id, toast } from 'react-toastify';

// API호출에 대한 로딩 상태와 toast알림을 관리하는 hook
export const useApiLoading = ({ showToast }: { showToast?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastId, setToastId] = useState<Id>();

  const startLoading = () => {
    setIsLoading(true);
    if (showToast) {
      setToastId(toast.loading('처리중 입니다.'));
    }
  };

  const finishLoading = () => {
    setIsLoading(false);
    if (showToast && toastId !== undefined) {
      toast.dismiss(toastId);
      setToastId(undefined);
    }
  };

  return { startLoading, finishLoading, isLoading };
};
