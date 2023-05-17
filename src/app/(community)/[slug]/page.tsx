import { WriteButton } from '@/app/_components/molecules/WriteButton';
import PostList from '@/app/_components/organisms/PostList';

interface Props {
  params: {
    slug: string;
  };
}

export default function CommunitySlug({ params }: Props) {
  return (
    <div className="w-full">
      <section className="w-full">
        <WriteButton />
      </section>
      <section className="w-full">
        <PostList category={params.slug} />
      </section>
    </div>
  );
}
