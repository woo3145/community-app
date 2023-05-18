import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import Image from 'next/image';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}
export const PostBody = ({ post }: Props) => {
  return (
    <div className="pb-8 space-y-5">
      <div className="mb-5">{post.content}</div>

      {post.imageUrl && (
        <Image src={post.imageUrl} width={800} height={800} alt="image" />
      )}
    </div>
  );
};
