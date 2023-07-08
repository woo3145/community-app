interface Props {
  title: string;
}

const PostTitle = ({ title }: Props) => {
  return <h3 className="text-xl font-bold break-all line-clamp-2">{title}</h3>;
};

export default PostTitle;
