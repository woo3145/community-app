import { TagSelectorModal } from '@/app/_modals/tag_selector_modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';

import styles from './styles.module.scss';

interface Props {
  selectedTags: SubTag[];
  setSelectedTags: Dispatch<SetStateAction<SubTag[]>>;
}

export const TagPicker = ({ selectedTags, setSelectedTags }: Props) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const onClickExcludeTag = (tagId: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>태그 선택</span>
        <span>(1~3개)</span>
        <span>*</span>
      </div>
      <div className={styles.body}>
        <button className={styles.addButton} onClick={openModal}>
          <IoAdd />
        </button>

        {selectedTags.length === 0 && (
          <button className={styles.placeholder} onClick={openModal}></button>
        )}

        {modalIsOpen && (
          <TagSelectorModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}

        <div className={styles.selectedTagList}>
          {selectedTags.map((tag, idx) => {
            return (
              <div key={idx} className={styles.selectedTag}>
                <span>{tag.title}</span>
                <button onClick={() => onClickExcludeTag(tag.id)}>
                  <IoCloseOutline />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
