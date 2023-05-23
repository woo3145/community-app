import { errorHandlerWithToast } from '@/libs/client/clientErrorHandler';
import { API_BASE_URL, _createPost, _editProfile } from '@/libs/client/apis';
import { Id, toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CreatePostFormValue } from '@/app/write/page';
import { useRouter } from 'next/navigation';
import { mergeNewlines } from '@/libs/textareaHelper';

// 프로필 수정
export const useCreatePost = (
  tags: SubTag[],
  imageFile: File | null,
  uploadImage: () => Promise<string>
) => {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const router = useRouter();

  const refresh = async () => {
    mutate(`${API_BASE_URL}/my/posts`);
  };

  const handleApiLoading = (isLoading: boolean, toastId?: Id | null) => {
    setIsApiLoading(isLoading);
    if (toastId) {
      toast.dismiss(toastId);
    }
  };

  const onSubmit = async (data: CreatePostFormValue) => {
    let toastId: Id | null = null;
    try {
      if (isApiLoading) return;
      if (!session) {
        throw new Error('로그인이 필요합니다.');
      }
      const { title, content } = data;
      if (!title) throw new Error('제목을 입력해 주세요.');
      if (!content) throw new Error('내용을 입력해 주세요.');
      if (tags.length === 0 || 3 < tags.length) {
        throw new Error('태그의 수가 잘못되었습니다.');
      }

      toastId = toast.loading('처리중 입니다.');
      handleApiLoading(true);

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
      handleApiLoading(false, toastId);
      refresh();
      router.push(`/post/${postId}`);
      // window.location.href = `/post/${postId}`;
    } catch (e) {
      errorHandlerWithToast(e);
      handleApiLoading(false, toastId);
    }
  };

  return { onSubmit, isApiLoading };
};
