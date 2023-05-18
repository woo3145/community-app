import Image from 'next/image';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostContent = ({ post }: Props) => {
  return (
    <div className="pb-8">
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

      <div className="mb-5">{post.content}</div>

      {post.imageUrl && (
        <Image src={post.imageUrl} width={800} height={800} alt="image" />
      )}
    </div>
  );
};
