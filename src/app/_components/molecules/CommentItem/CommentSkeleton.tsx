import Skeleton from 'react-loading-skeleton';
import { AuthorProfile } from '../profile/AuthorProfile';

export const CommentSkeleton = () => (
  <div className="px-10 pt-5">
    <div className="border-b border-gray-200 border-solid">
      <div className="flex justify-between">
        <AuthorProfile isLoading={true} />
      </div>

      <Skeleton width="40%" style={{ marginBottom: 12, marginTop: 12 }} />
    </div>
  </div>
);
