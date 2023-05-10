import styles from './styles.module.scss';

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
            <div className={styles.tagTitle}>
              <span>{tag.icon}</span> {tag.title}
            </div>
            <ul className={styles.subTagList} data-cy={'subTags-container'}>
              {tag.subTags.map((subTag, idx) => {
                return (
                  <li
                    className={
                      pickedTags.find((t) => t.id === subTag.id)
                        ? styles.selected
                        : ''
                    }
                    key={idx}
                    onClick={() => onClickPickTag(subTag)}
                    data-cy={`tagList-tag_${subTag.id}`}
                  >
                    {subTag.title}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
