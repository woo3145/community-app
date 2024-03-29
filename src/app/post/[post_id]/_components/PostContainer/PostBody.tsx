import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import Image from 'next/image';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}
export const PostBody = ({ post }: Props) => {
  return (
    <div className="pb-8 space-y-5">
      <div className="mb-5 whitespace-pre-line">{post.content}</div>

      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          width={640}
          height={400}
          placeholder="blur"
          blurDataURL={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8Uw8AAh0BTZud3BwAAAAASUVORK5CYII='
          }
          loading="lazy"
          alt="image"
        />
      )}
    </div>
  );
};
