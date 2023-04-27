import { EditProfileFormValue } from '@/app/_modals/MyProfileModifyModal';
import { Comment } from '@/libs/server/commentUtils/commentFetchTypes';
import { Post } from '@/libs/server/postUtils/postFetchTypes';

interface ApiResponse {
  message: string;
}

interface GetPostResponse extends ApiResponse {
  data: Post;
}

interface GetPostIsLikedResponse extends ApiResponse {
  data: boolean;
}

interface GetUserCommentsResponse extends ApiResponse {
  data: Comment[];
}

interface EditProfileBody extends EditProfileFormValue {
  imagePath: string | null;
  nameType: boolean;
}

interface UploadImageResponse extends ApiResponse {
  data: string;
}
