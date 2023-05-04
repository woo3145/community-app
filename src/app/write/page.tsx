import { redirect } from 'next/navigation';
import styles from './page.module.scss';
import { _uploadImage } from '@/libs/client/apis';
import { CreatePostForm } from '../_components/forms/CreatePostForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

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
    <main className={styles.wrapper}>
      <CreatePostForm />
    </main>
  );
}
