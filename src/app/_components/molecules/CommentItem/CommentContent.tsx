import { Comment } from '@/interfaces/comment';
import Link from 'next/link';

interface Props {
  comment: Comment;
  isLink?: boolean;
}

export const CommentContent = ({ comment, isLink }: Props) => {
  const content = (
    <div className="px-10 pt-2 pb-3 whitespace-pre-line">{comment.content}</div>
  );

  return isLink ? (
    <Link href={`/post/${comment.postId}`}>{content}</Link>
  ) : (
    content
  );
};
