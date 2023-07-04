import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

import { EditProfileFormValue } from '@/app/_components/modals/MyProfileModifyModal';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { _editProfile } from '@/libs/client/apis';
import { useMe } from './swr/useMe';
import { Me, Profile } from '@/interfaces/user';
import { EditProfileBody } from '@/interfaces/api';
import { useMyPosts } from './scrollSwr/useMyPosts';
import { useMyRecents } from './scrollSwr/useMyRecents';
import { useMyComments } from './scrollSwr/useMyComments';
import { useMyLikes } from './scrollSwr/useMyLikes';
import { mergeNewlines } from '@/libs/textareaHelper';
import { useApiLoading } from './useApiLoading';

// 프로필 수정
export const useEditProfile = (
  profile: Profile,
  nameType: boolean,
  imageFile: File | null,
  uploadImage: () => Promise<string>,
  callback: () => void
) => {
  const { me, updateCache: updateMe } = useMe();
  const { updateUserCache: updateUserInMyPosts } = useMyPosts();
  const { updateUserCache: updateUserInMyRecents } = useMyRecents();
  const { updateUserCache: updateUserInMyComments } = useMyComments();
  const { updateUserCache: updateUserInMyLikes } = useMyLikes();
  const { data: session } = useSession();
  const { startLoading, finishLoading, isLoading } = useApiLoading({
    showToast: true,
  });

  const updateCache = (updatedData: EditProfileBody) => {
    if (!me) return;
    const newUser: Me = {
      ...me,
      profile: {
        ...me.profile,
        ...updatedData,
      },
    };
    // 유저 변경 데이터 캐시 업데이트
    updateMe(newUser); // 내정보
    updateUserInMyPosts(newUser); // 내 작성글
    updateUserInMyRecents(newUser); // 최근에 읽은 글
    updateUserInMyComments(newUser); // 내 댓글
    updateUserInMyLikes(newUser); // 내가 좋아요 한 글
  };

  const onSubmit = async (data: EditProfileFormValue) => {
    if (isLoading) return;

    try {
      if (!session?.user) {
        throw new Error('로그인이 필요합니다.');
      }
      const { nickname, description } = data;
      const mergedDescription = mergeNewlines(description);
      if (nameType && !nickname) {
        throw new Error('닉네임을 입력해 주세요.');
      }
      if (
        !imageFile &&
        mergedDescription === profile.description &&
        nameType === profile.nameType &&
        (!nameType || (nameType && nickname === profile.nickname))
      ) {
        // 변경할 내용 없음
        if (callback) callback();
        return;
      }
      startLoading();

      // (이미지 업로드 후 url받아오기)
      const avatar = imageFile ? await uploadImage() : profile.avatar;
      await _editProfile(session.user.id, {
        nickname,
        description: mergedDescription,
        avatar,
        nameType,
      });

      const updatedData: EditProfileBody = {
        nickname,
        description: mergedDescription,
        avatar,
        nameType,
      };

      // 성공
      toast.success('성공적으로 업데이트 되었습니다.');
      updateCache(updatedData);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      finishLoading();
    }
  };

  return { onSubmit, isApiLoading: isLoading };
};
