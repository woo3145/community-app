import { getPost } from '@/libs/client/getPost';

export default async function Head({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const post = await getPost(post_id);

  return (
    <>
      <title>{post.title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={post.content} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
