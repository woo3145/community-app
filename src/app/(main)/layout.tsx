import { Metadata } from 'next';
import { CategoryContainer } from '../_components/molecules/CategoryContainer';
import { UserProfile } from './UserProfile';
import { WriteButton } from '../_components/molecules/WriteButton';

export const metadata: Metadata = {
  title: 'Woo3145 - Community',
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-screen-lg relative">
      <aside className="flex-none w-64 shrink-0 mt-12 mr-5">
        <div className="fixed w-64">
          <UserProfile />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="fixed z-10 bg-gray-100">
          <CategoryContainer />
        </div>
        <div className="mt-32">
          <section className="w-full">
            <WriteButton />
          </section>
          <section className="w-full">{children}</section>
        </div>
      </main>
    </div>
  );
}
