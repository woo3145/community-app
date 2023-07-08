import Skeleton from 'react-loading-skeleton';
import { AuthorProfile } from '../profile/AuthorProfile';
import Badge from '../../atoms/Badge';

const LoadingSkeleton = () => {
  return (
    <div className="py-5 border-b border-gray-200 border-solid px-7">
      <div className="mb-3">
        <AuthorProfile size={'sm'} isLoading />
      </div>
      <div>
        <Skeleton width="60%" height={20} style={{ marginBottom: 8 }} />
        <Skeleton width="100%" count={2} />
        <ul className="flex gap-2">
          {['1', '2'].map((dumy, idx) => {
            return <Badge isLoading key={idx} text={dumy} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
