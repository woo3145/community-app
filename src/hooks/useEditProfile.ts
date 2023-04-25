import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { API_BASE_URL, _editProfile } from '@/libs/client/apis';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

// 프로필 수정
export const useEditProfile = (
  profile: Exclude<Profile, null>,
  nameType: boolean,
  imageFile: File | null,
  uploadImage: () => Promise<string>,
  callback: () => void
) => {
  const { mutate } = useSWRConfig();

  const onSubmit = async (data: EditProfileFormValue) => {
    try {
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

      // (이미지 업로드 후 url받아오기)
      const imagePath = imageFile ? await uploadImage() : null;
      await _editProfile({
        nickname,
        description,
        imagePath,
        nameType,
      });

      // 성공
      mutate(`${API_BASE_URL}/me`);
      toast.success('성공적으로 업데이트 되었습니다.');
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
    }
  };

  return { onSubmit };
};
