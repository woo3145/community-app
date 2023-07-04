import { _uploadImage } from '@/libs/client/apis';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useCallback, useState } from 'react';

// 이미지 업로드에 관련된 상태와 함수를 관리하는 hook
export const useUploadImage = (callback?: () => void) => {
  const { data: session } = useSession();
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 이미지를 선택하고 프리뷰를 생성함
  const handleImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length || !event.target.files[0]) {
        return;
      }
      const file = event.target.files[0];

      const reader = new FileReader();
      setImageFile(file);
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setPreview(e.target.result);
          if (callback) callback();
        }
      };
      event.target.value = ''; // 같은 이미지를 선택 할 수 있도록 값 초기화
    },
    [callback]
  );

  // 이미지 상태를 초기화함
  const resetImage = useCallback((prevImage?: string) => {
    setImageFile(null);
    setPreview(prevImage ? prevImage : '');
  }, []);

  // 이미지를 업로드하고 URL을 반환함
  const uploadImage = useCallback(async () => {
    if (!session) {
      throw new Error('로그인이 필요합니다.');
    }
    if (!imageFile) {
      throw new Error('이미지 파일이 존재하지 않습니다.');
    }
    try {
      // (이미지 업로드 후 url받아오기)
      const { data: imagePath } = await _uploadImage(imageFile);
      return imagePath;
    } catch (e) {
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  }, [session, imageFile]);

  return {
    preview,
    setPreview,
    imageFile,
    setImageFile,
    uploadImage,
    handleImage,
    resetImage,
  };
};
