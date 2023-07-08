interface Props {
  content: string;
}

const PostContent = ({ content }: Props) => {
  return <p className="text-gray-500">{content}</p>;
};

export default PostContent;
