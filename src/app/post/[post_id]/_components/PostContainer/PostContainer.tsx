import { PostWithIsLikedAndIsCommented } from '@/libs/prisma/dataTypes';
import { PostHeader } from './PostHeader';
import { PostBody } from './PostBody';
import { PostActionContainer } from './PostActionContainer';
import { PostTags } from './PostTags';

interface Props {
  post: PostWithIsLikedAndIsCommented;
}

export const PostContainer = ({ post }: Props) => {
  return (
    <article className="px-10 py-12 border-b border-gray-200 border-solid">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostTags post={post} />
      <PostActionContainer post={post} />
    </article>
  );
};
