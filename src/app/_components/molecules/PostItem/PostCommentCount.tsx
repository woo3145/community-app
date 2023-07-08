import { IoChatbubbleOutline } from 'react-icons/io5';

const PostCommentCount = ({
  isCommented,
  count,
}: {
  isCommented: boolean;
  count: number;
}) => {
  return (
    <div className={`flex items-center ${isCommented ? 'text-primary' : ''}`}>
      <IoChatbubbleOutline className="text-lg" />
      <span className="pt-1 pl-1 text-sm">{count}</span>
    </div>
  );
};

export default PostCommentCount;
