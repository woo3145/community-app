import Badge from '../../atoms/Badge';

interface Props {
  tags: Tag[];
}

const PostTags = ({ tags }: Props) => {
  return (
    <ul className="flex gap-2 py-2">
      {tags.map((tag, idx) => {
        return <Badge key={idx} text={tag.title} />;
      })}
    </ul>
  );
};

export default PostTags;
