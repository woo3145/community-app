import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
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

      if (!nickname && nameType) {
        toast.error('닉네임을 입력해주세요.');
        return;
      }
      if (
        nameType === profile.nameType &&
        description === profile.description &&
        !imageFile
      ) {
        if (!nameType || (nameType && nickname === profile.nickname)) {
          // 변경할 내용 없음
          if (callback) callback();
          return;
        }
      }

      // (이미지 업로드 후 url받아오기)
      let imagePath = await uploadImage();

      const response = await (
        await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nameType,
            nickname,
            description,
            avatar: imagePath,
          }),
        })
      ).json();

      if (response.error) {
        toast.error('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      // 성공
      mutate('/api/me');
      toast.success('성공적으로 업데이트 되었습니다.');
      if (callback) callback();
    } catch (e) {
      console.log('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return { onSubmit };
};
