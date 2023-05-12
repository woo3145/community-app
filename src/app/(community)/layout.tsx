import { CategorySlider } from '../_components/molecules/CategorySlider';
import { UserProfile } from './UserProfile';

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
          <CategorySlider />
        </div>
        <div className="mt-32">{children}</div>
      </main>
    </div>
  );
}
