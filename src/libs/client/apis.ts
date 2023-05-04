import {
  ApiResponse,
  CreateCommentResponse,
  CreatePostBody,
  CreatePostResponse,
  EditProfileBody,
  GetPostIsLikedResponse,
  GetPostResponse,
  GetUserCommentsResponse,
  UploadImageResponse,
} from '@/interfaces/api';
import { fetchApi } from './fetchHelper';

export const API_BASE_URL = 'http://127.0.0.1:3000/api';

// @@@@@@@@ 프로필 @@@@@@@@
// 이미지 업로드 함수
export const _uploadImage = async (
  imageFile: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const data = await fetchApi<UploadImageResponse>(
    `${API_BASE_URL}/upload/image`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return data;
};

// 프로필 수정
export const _editProfile = async ({
  nickname,
  description,
  avatar,
  nameType,
}: EditProfileBody): Promise<ApiResponse> => {
  const data = await fetchApi<ApiResponse>(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameType,
      nickname,
      description,
      avatar,
    }),
  });
  return data;
};

// @@@@@@@@ 게시글 @@@@@@@@
// 게시물 하나 가져오기
export const _getPost = async (postId: number): Promise<GetPostResponse> => {
  const data = await fetchApi<GetPostResponse>(
    `${API_BASE_URL}/posts/${postId}`
  );
  return data;
};

// 게시글 좋아요/취소
export const _toggleLike = async (
  postId: number,
  isLiked: boolean
): Promise<ApiResponse> => {
  const data = await fetchApi<ApiResponse>(
    `${API_BASE_URL}/posts/${postId}/like`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isLiked: isLiked,
      }),
    }
  );
  return data;
};

// 유저가 게시글에 좋아요를 눌렀는지
export const _getPostIsLiked = async (
  userId: string,
  postId: number
): Promise<GetPostIsLikedResponse> => {
  const data = await fetchApi<GetPostIsLikedResponse>(
    `${API_BASE_URL}/user/${userId}/likes/${postId}`
  );
  return data;
};

// 최근본글 저장
export const _saveRecentPost = async (
  userId: string,
  postId: number
): Promise<ApiResponse> => {
  const data = await fetchApi<ApiResponse>(
    `${API_BASE_URL}/user/${userId}/recent/${postId}`,
    {
      method: 'PUT',
    }
  );
  return data;
};

// 게시글 작성
export const _createPost = async ({
  title,
  content,
  published,
  imageUrl,
  tags,
}: CreatePostBody): Promise<CreatePostResponse> => {
  const data = await fetchApi<CreatePostResponse>(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
      published,
      imageUrl,
      tags,
    }),
  });
  return data;
};

// @@@@@@@@ 댓글 @@@@@@@@
// 댓글 삭제
export const _deleteComment = async (
  commentId: number
): Promise<ApiResponse> => {
  const data = await fetchApi<ApiResponse>(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
    }
  );
  return data;
};

// 댓글 작성
export const _createComment = async (
  postId: number,
  content: string
): Promise<CreateCommentResponse> => {
  const data = await fetchApi<CreateCommentResponse>(
    `${API_BASE_URL}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        postId: postId,
      }),
    }
  );
  return data;
};

// 유저가 작성한 모든 댓글 가져오기
export const _getUserComments = async (
  userId: string
): Promise<GetUserCommentsResponse> => {
  const data = await fetchApi<GetUserCommentsResponse>(
    `${API_BASE_URL}/user/${userId}/comments`
  );
  return data;
};
