import { AiOutlineLike } from 'react-icons/ai';

const PostLikeCount = ({
  isLiked,
  count,
}: {
  isLiked: boolean;
  count: number;
}) => {
  return (
    <div className={`flex items-center ${isLiked ? 'text-primary' : ''}`}>
      <AiOutlineLike className="text-lg" />
      <span className="pt-1 pl-1 text-sm">{count}</span>
    </div>
  );
};

export default PostLikeCount;
