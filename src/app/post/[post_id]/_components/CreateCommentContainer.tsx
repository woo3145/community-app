import { CreateCommentForm } from '@/app/_components/forms/CreateCommentForm';
import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';

interface Props {
  postId: number;
}
export const CreateCommentContainer = ({ postId }: Props) => {
  return (
    <div className="w-full px-10 py-2 mt-3">
      <div className="mb-3">
        <MyProfile />
      </div>
      <div className="relative">
        <CreateCommentForm postId={postId} />
      </div>
    </div>
  );
};
