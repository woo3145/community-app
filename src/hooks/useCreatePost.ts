import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useSWRConfig } from 'swr';

import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { API_BASE_URL, _createPost, _editProfile } from '@/libs/client/apis';
import { CreatePostFormValue } from '@/app/write/page';
import { mergeNewlines } from '@/libs/textareaHelper';
import { useCallback, useState } from 'react';
import { useLoadingToast } from './useLoadingToast';

// 게시글을 작성하는 hook
export const useCreatePost = (
  tags: SubTag[],
  imageFile: File | null,
  uploadImage: () => Promise<string>
) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const { showLoadingToast, removeLoadingToast } = useLoadingToast();

  const router = useRouter();

  const refresh = useCallback(async () => {
    mutate(`${API_BASE_URL}/my/posts`);
  }, [mutate]);

  const onSubmit = useCallback(
    async (data: CreatePostFormValue) => {
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
        setIsLoading(true);
        showLoadingToast();

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
        setIsLoading(false);
        removeLoadingToast();
      }
    },
    [
      isLoading,
      showLoadingToast,
      removeLoadingToast,
      imageFile,
      refresh,
      router,
      session,
      tags,
      uploadImage,
    ]
  );

  return { onSubmit, isLoading };
};
