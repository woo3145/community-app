import Badge from '@/app/_components/atoms/Badge';
import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostTags = ({ post }: Props) => {
  return (
    <div className="flex gap-3 mb-10">
      {post.tags?.map((tag, idx) => {
        return (
          <Badge
            isLoading={false}
            key={idx}
            href={`/post/${tag.id}`}
            text={tag.title}
          />
        );
      })}
    </div>
  );
};
