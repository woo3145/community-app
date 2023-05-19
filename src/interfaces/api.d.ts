import { CreateCommentFormValue } from '@/app/_components/forms/CreateCommentForm';
import { EditProfileFormValue } from '@/app/_components/modals/MyProfileModifyModal';
import { CreatePostFormValue } from '@/app/write/page';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { Post } from '@/libs/server/postUtils/postFetchTypes';
import { User } from 'next-auth';

interface ApiResponse {
  message: string;
}

// 회원가입
interface SignupBody {
  email: string;
  password: string;
  name: string;
}
interface SignupResponse extends ApiResponse {
  user: User;
}

// 게시물 하나 불러오기
interface GetPostResponse extends ApiResponse {
  data: Post;
}

// 게시물에서 내가 좋아요를 눌렀는지 확인
interface GetPostIsLikedResponse extends ApiResponse {
  data: boolean;
}

// 유저가 쓴 댓글목록 불러오기
interface GetUserCommentsResponse extends ApiResponse {
  data: Comment[];
}

// 프로필 수정 Body
interface EditProfileBody extends EditProfileFormValue {
  avatar: string;
  nameType: boolean;
}

// 이미지 업로드 Response
interface UploadImageResponse extends ApiResponse {
  data: string; // imagePath
}

// 게시글 작성 Body
interface CreatePostBody extends CreatePostFormValue {
  imageUrl: string;
  published: boolean;
  tags: number[];
}
// 게시글 작성 Response
interface CreatePostResponse extends ApiResponse {
  data: number; // postId
}

// 댓글 작성 Body
interface CreateCommentBody extends CreateCommentFormValue {}
// 댓글 작성 Response
interface CreateCommentResponse extends ApiResponse {
  data: Comment;
}

// 게시글 좋아요 Body
interface LikePostBody {
  isLiked: boolean;
}
