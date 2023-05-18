import PostList from '../_components/PostListContainer';

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  return <PostList category={params.slug} />;
}
