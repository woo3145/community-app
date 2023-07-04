import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useSWRConfig } from 'swr';

import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { API_BASE_URL, _createPost, _editProfile } from '@/libs/client/apis';
import { CreatePostFormValue } from '@/app/write/page';
import { mergeNewlines } from '@/libs/textareaHelper';
import { useApiLoading } from './useApiLoading';

// 프로필 수정
export const useCreatePost = (
  tags: SubTag[],
  imageFile: File | null,
  uploadImage: () => Promise<string>
) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const { startLoading, finishLoading, isLoading } = useApiLoading({
    showToast: true,
  });

  const router = useRouter();

  const refresh = async () => {
    mutate(`${API_BASE_URL}/my/posts`);
  };

  const onSubmit = async (data: CreatePostFormValue) => {
    if (isLoading) return;

    try {
      if (!session) {
        throw new Error('로그인이 필요합니다.');
      }
      const { title, content } = data;
      if (!title) throw new Error('제목을 입력해 주세요.');
      if (!content) throw new Error('내용을 입력해 주세요.');
      if (tags.length === 0 || 3 < tags.length) {
        throw new Error('태그의 수가 잘못되었습니다.');
      }
      startLoading();

      // (이미지 업로드 후 url받아오기)
      const imageUrl = imageFile ? await uploadImage() : '';
      const { data: postId } = await _createPost({
        title,
        content: mergeNewlines(content),
        imageUrl,
        published: true,
        tags: tags.map((tag) => tag.id),
      });

      // 성공
      refresh();
      router.replace(`/post/${postId}`);
    } catch (e) {
      errorHandlerWithToast(e);
    } finally {
      finishLoading();
    }
  };

  return { onSubmit, isApiLoading: isLoading };
};
