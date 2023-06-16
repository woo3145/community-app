import { CategoryContainer } from './_components/CategoryContainer';
import { MyCommunityCard } from './_components/MyCommunityCard';
import { WriteButtonContainer } from './_components/WriteButtonContainer';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-fll">
      <aside className="hidden w-64 mt-12 mr-5 xl:block shrink-0">
        <div className="fixed w-64">
          <MyCommunityCard />
        </div>
      </aside>

      <main className="flex flex-col flex-1">
        <div className="fixed top-0 left-0 z-10 w-full bg-gray-100 xl:left-auto xl:top-auto">
          <CategoryContainer />
        </div>
        <div className="mt-20 xl:mt-32">
          <section className="w-full">
            <WriteButtonContainer />
          </section>
          <section className="w-full">{children}</section>
        </div>
      </main>
    </div>
  );
}
