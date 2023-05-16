import { SelectButton } from '@/app/_components/atoms/SelectButton';

interface Props {
  tags: ParentTag[];
  pickedTags: SubTag[];
  onClickPickTag: (tag: SubTag) => void;
}

export const TagList = ({ tags, pickedTags, onClickPickTag }: Props) => {
  return (
    <ul>
      {tags.map((tag, idx) => {
        return (
          <li key={idx}>
            <div className="flex items-center mb-3 font-bold">
              <span className="text-sm mr-2">{tag.icon}</span> {tag.title}
            </div>
            <ul
              className="flex flex-wrap gap-2 mb-4"
              data-cy={'subTags-container'}
            >
              {tag.subTags.map((subTag, idx) => {
                return (
                  <SelectButton
                    key={idx}
                    text={subTag.title}
                    onClick={() => onClickPickTag(subTag)}
                    dataCy={`tagList-tag_${subTag.id}`}
                    selected={
                      pickedTags.find((t) => t.id === subTag.id) !== undefined
                    }
                  />
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
