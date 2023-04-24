import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
import { ApiResponse } from '@/interfaces/api';

export const API_BASE_URL = '/api';

// 이미지 업로드 함수
interface UploadImageResponse extends ApiResponse {
  data: string;
}
export const _uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const imageResponse: UploadImageResponse = await (
      await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      })
    ).json();

    if (imageResponse.data) {
      return imageResponse.data;
    }
  } catch (e) {
    throw new Error('이미지 업로드 중 문제가 발생했습니다.');
  }

  return '';
};

interface EditProfileBody extends EditProfileFormValue {
  imagePath: string | null;
  nameType: boolean;
}
export const _editProfile = async ({
  nickname,
  description,
  imagePath,
  nameType,
}: EditProfileBody): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/profile`, {
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
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const _toggleLike = async (
  postId: number,
  isLiked: boolean
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isLiked: isLiked,
    }),
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const _deleteComment = async (
  commentId: number
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
  const data: ApiResponse = await response.json();
  return data;
};

export const _createComment = async (
  postId: number,
  content: string
): Promise<ApiResponse> => {
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
      postId: postId,
    }),
  });
  const data = await response.json();
  return data;
};
