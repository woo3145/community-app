import { WriteButton } from '../_components/molecules/WriteButton';
import PostList from '../_components/organisms/PostList';

export default function Community() {
  return (
    <div className="w-full">
      <section className="w-full">
        <WriteButton />
      </section>
      <section className="w-full">
        <PostList category="" />
      </section>
    </div>
  );
}
