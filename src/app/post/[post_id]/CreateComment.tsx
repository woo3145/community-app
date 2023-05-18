import { CreateCommentForm } from '@/app/_components/forms/CreateCommentForm';
import { MyProfile } from '@/app/_components/molecules/profile/MyProfile';

interface Props {
  postId: number;
}
export const CreateComment = ({ postId }: Props) => {
  return (
    <div className="w-full mt-3 py-2 px-10">
      <div className="mb-3">
        <MyProfile />
      </div>
      <div className="relative">
        <CreateCommentForm postId={postId} />
      </div>
    </div>
  );
};
