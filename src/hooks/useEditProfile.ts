import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { API_BASE_URL, _editProfile } from '@/libs/client/apis';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import { Id, toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// 프로필 수정
export const useEditProfile = (
  profile: Exclude<Profile, null>,
  nameType: boolean,
  imageFile: File | null,
  uploadImage: () => Promise<string>,
  callback: () => void
) => {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const refresh = () => {
    mutate(`${API_BASE_URL}/me`);
    mutate(`${API_BASE_URL}/my/likes`);
    mutate(`${API_BASE_URL}/my/recents`);
    mutate(`${API_BASE_URL}/my/posts`);
    mutate(`${API_BASE_URL}/my/comments`);
  };

  const handleApiLoading = (isLoading: boolean, toastId?: Id | null) => {
    setIsApiLoading(isLoading);
    if (toastId) {
      toast.dismiss(toastId);
    }
  };

  const onSubmit = async (data: EditProfileFormValue) => {
    let toastId: Id | null = null;
    try {
      if (isApiLoading) return;
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      const { nickname, description } = data;
      if (nameType && !nickname) {
        throw new Error('닉네임을 입력해주세요.');
      }
      if (
        !imageFile &&
        description === profile.description &&
        nameType === profile.nameType &&
        (!nameType || (nameType && nickname === profile.nickname))
      ) {
        // 변경할 내용 없음
        if (callback) callback();
        return;
      }
      toastId = toast.loading('처리중 입니다.');
      handleApiLoading(true);

      // (이미지 업로드 후 url받아오기)
      const imagePath = imageFile ? await uploadImage() : null;
      await _editProfile({
        nickname,
        description,
        imagePath,
        nameType,
      });

      // 성공
      toast.success('성공적으로 업데이트 되었습니다.');
      refresh();
      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
