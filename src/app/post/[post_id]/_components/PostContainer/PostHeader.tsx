import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostHeader = ({ post }: Props) => {
  return (
    <div>
      <div>
        <AuthorProfile
          profile={post.user ? post.user.profile : null}
          createAt={post.createAt}
          size={'md'}
        />
      </div>

      <h1 className="py-8 text-3xl font-bold break-all">{post.title}</h1>
    </div>
  );
};
