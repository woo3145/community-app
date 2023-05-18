import { Metadata } from 'next';
import { CategoryContainer } from './_components/CategoryContainer';
import { MyCommunityCard } from './_components/MyCommunityCard';
import { WriteButtonContainer } from './_components/WriteButtonContainer';

export const metadata: Metadata = {
  title: 'Woo3145 - Community',
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative flex max-w-screen-lg">
      <aside className="hidden w-64 mt-12 mr-5 2xl:block shrink-0">
        <div className="fixed w-64">
          <MyCommunityCard />
        </div>
      </aside>

      <main className="flex flex-col flex-1">
        <div className="fixed z-10 bg-gray-100">
          <CategoryContainer />
        </div>
        <div className="mt-32">
          <section className="w-full">
            <WriteButtonContainer />
          </section>
          <section className="w-full">{children}</section>
        </div>
      </main>
    </div>
  );
}
