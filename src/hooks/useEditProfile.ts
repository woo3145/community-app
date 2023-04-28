import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { _editProfile } from '@/libs/client/apis';
import { Profile } from '@/libs/server/profileUtils/profileFetchTypes';
import { Id, toast } from 'react-toastify';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMe } from './swr/useMe';
import { Me } from '@/interfaces/user';
import { EditProfileBody } from '@/interfaces/api';
import { useMyPosts } from './scrollSwr/useMyPosts';
import { useMyRecents } from './scrollSwr/useMyRecents';
import { useMyComments } from './scrollSwr/useMyComments';
import { useMyLikes } from './scrollSwr/useMyLikes';

// 프로필 수정
export const useEditProfile = (
  profile: Exclude<Profile, null>,
  nameType: boolean,
  imageFile: File | null,
  uploadImage: () => Promise<string>,
  callback: () => void
) => {
  const { me, mutate: mutateMe } = useMe();
  const { mutate: mutateMyPosts } = useMyPosts();
  const { mutate: mutateMyRecents } = useMyRecents();
  const { mutate: mutateMyComments } = useMyComments();
  const { mutate: mutateMyLikes } = useMyLikes();
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);

  const refresh = (updatedData: EditProfileBody) => {
    if (!me) return;
    const newUser: Me = {
      ...me,
      profile: {
        ...me.profile,
        ...updatedData,
      },
    };
    mutateMe({ data: newUser });
    mutateMyPosts((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((post) => {
            post.user = newUser;
            return post;
          }),
        };
      });
    });
    mutateMyRecents((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((recentlyviewdPost) => {
            if (me.id === recentlyviewdPost.post.userId) {
              recentlyviewdPost.post.user = newUser;
            }
            return recentlyviewdPost;
          }),
        };
      });
    });
    mutateMyComments((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((comment) => {
            comment.user = newUser;
            return comment;
          }),
        };
      });
    });
    mutateMyLikes((oldData) => {
      if (!oldData) return;
      return oldData.map((page) => {
        return {
          data: page.data.map((likePost) => {
            if (me.id === likePost.post.userId) {
              likePost.post.user = newUser;
            }
            return likePost;
          }),
        };
      });
    });
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
      const avatar = imageFile ? await uploadImage() : profile.avatar;
      await _editProfile({
        nickname,
        description,
        avatar,
        nameType,
      });

      const updatedData: EditProfileBody = {
        nickname,
        description,
        avatar,
        nameType,
      };

      // 성공
      toast.success('성공적으로 업데이트 되었습니다.');
      refresh(updatedData);
      handleApiLoading(false, toastId);
      if (callback) callback();
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
