import { useSession } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

// 이미지 업로드
export const useUploadImage = (callback: () => void) => {
  const { data: session } = useSession();
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !event.target.files[0]) {
      console.log('선택된 이미지가 없습니다.');
      return;
    }
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setPreview(e.target.result);
      }
    };
    if (callback) callback();
  };

  const uploadImage = async () => {
    if (!session) {
      throw new Error('로그인이 필요합니다.');
    }
    // (이미지 업로드 후 url받아오기)
    let imagePath = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      const imageResponse = await (
        await fetch(`/api/upload/image`, {
          method: 'POST',
          body: formData,
        })
      ).json();

      if (imageResponse.filePath) imagePath = imageResponse.filePath;
    }

    return imagePath;
  };

  return {
    preview,
    setPreview,
    imageFile,
    setImageFile,
    uploadImage,
    handleImage,
  };
};
