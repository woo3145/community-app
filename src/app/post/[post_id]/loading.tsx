import Badge from '@/app/_components/atoms/Badge';
import { AuthorProfile } from '@/app/_components/molecules/profile/AuthorProfile';
import Skeleton from 'react-loading-skeleton';

export default async function Loading() {
  return (
    <main className="container flex max-w-screen-lg py-20">
      <aside className="shrink-0 w-[258px] relative">
        <div className="fixed w-[258px] pr-10">
          <div className="border-b border-gray-200 border-solid pb-7">
            <AuthorProfile isLoading={true} size={'md'} />
          </div>
        </div>
      </aside>
      <section className="relative card">
        <div className="px-10 py-12 border-b border-gray-200 border-solid">
          <div>
            <div>
              <AuthorProfile isLoading={true} size={'md'} />
            </div>
            <Skeleton
              width="60%"
              height={32}
              style={{ marginTop: 32, marginBottom: 32 }}
            />
          </div>

          <Skeleton height={400} />

          <div className="flex gap-3 mt-10">
            {[1, 2].map((dumy, idx) => {
              return <Badge isLoading={true} key={idx} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
