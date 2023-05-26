import { redirect } from 'next/navigation';
import { _uploadImage } from '@/libs/client/apis';
import { CreatePostForm } from '../_components/forms/CreatePostForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/server/auth';

export interface CreatePostFormValue {
  title: string;
  content: string;
}
export const metadata = {
  title: 'Woo3145 - Write',
};
export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="pt-20">
      <CreatePostForm />
    </main>
  );
}
