import Image from 'next/image';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import { Post } from '@/libs/server/postUtils/postFetchTypes';
import Skeleton from 'react-loading-skeleton';

interface Props {
  isLoading: false;
  post: Post;
}

export const PostContent = ({ post, isLoading }: Props | IsLoadingProps) => {
  if (isLoading) {
    return (
      <div className="pb-8">
        <div>
          <div>
            <AuthorProfile isLoading={isLoading} size={'md'} />
          </div>
          <Skeleton
            width="60%"
            height={32}
            style={{ marginTop: 32, marginBottom: 32 }}
          />
        </div>

        <Skeleton height={400} />
      </div>
    );
  }
  return (
    <div className="pb-8">
      <div>
        <div>
          <AuthorProfile
            isLoading={isLoading}
            profile={post.user ? post.user.profile : null}
            createAt={post.createAt}
            size={'md'}
          />
        </div>

        <h1 className="py-8 text-3xl font-bold">{post.title}</h1>
      </div>

      <div className="mb-5">{post.content}</div>

      {post.imageUrl && (
        <Image src={post.imageUrl} width={800} height={800} alt="image" />
      )}
    </div>
  );
};
